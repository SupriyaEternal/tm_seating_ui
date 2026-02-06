import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

import { connect, StringCodec, JSONCodec } from "nats.ws";
import type { LiveImages, NATSContextType } from "../types/context";



/* ================= CONTEXT ================= */

const NATSContext = createContext<NATSContextType| null>(null);

/* ================= PROVIDER ================= */

type Props = {
  children: ReactNode;
};

export const NATSProvider = ({ children }: Props) => {
  /* ---------- Config ---------- */

  const url = "ws://localhost:9222";
  const useMock = true;
  const maxRetries = 5;
  const baseRetryDelay = 3000;

  /* ---------- Refs ---------- */

  const ncRef = useRef<any>(null);
  const retryCount = useRef(0);
  const reconnectTimeout = useRef<any>(null);
  const subsRef = useRef<any[]>([]);
  const subscribedRef = useRef(false);
  const mountedRef = useRef(false);

  /* ---------- Codecs ---------- */

  const sc = StringCodec();
  const jc = JSONCodec();

  /* ---------- State ---------- */

  const [isConnected, setIsConnected] = useState(false);

  const [images, setImages] = useState<LiveImages>({
    camera1: [],
    camera2: [],
    camera3: [],
    camera4: [],
    camera5: [],
  });

  const [cameraDetails, setCameraDetails] = useState<any>(null);

  const [inspectionResult, setInspectionResult] =
    useState<any>(null);

  const [machineState, setMachineState] = useState("--");
  const [plc, setPlc] = useState("--");

  const [cameraStatus1, setCameraStatus1] = useState<any>({});
  const [cameraStatus2, setCameraStatus2] = useState<any>({});
  const [cameraStatus3, setCameraStatus3] = useState<any>({});
  const [cameraStatus4, setCameraStatus4] = useState<any>({});
  const [cameraStatus5, setCameraStatus5] = useState<any>({});

  const [power, setPower] = useState("--");
  const [popupData, setPopupData] = useState<any>(null);

  /* ================= HELPERS ================= */


  const publish = (subject: string, payload: any) => {
    if (!ncRef.current) return;

    const data =
      typeof payload === "object"
        ? jc.encode(payload)
        : sc.encode(String(payload));

    ncRef.current.publish(subject, data);
  };

  /* ================= CONNECT ================= */

  const connectToNATS = async () => {
    if (retryCount.current >= maxRetries) return;

    try {
      const nc = await connect({
        servers: url,
        reconnect: true,
        maxReconnectAttempts: maxRetries,
      });

      ncRef.current = nc;
      retryCount.current = 0;
      setIsConnected(true);

      publish("/gui/request_status", "true");

      nc.closed().finally(() => {
        setIsConnected(false);
        subscribedRef.current = false;
      });

      if (!subscribedRef.current) {
        subscribeAll(nc);
        subscribedRef.current = true;
      }
    } catch {
      retryCount.current += 1;

      const delay = Math.min(
        baseRetryDelay * 2 ** (retryCount.current - 1),
        30000
      );

      reconnectTimeout.current = setTimeout(
        connectToNATS,
        delay
      );
    }
  };

  /* ================= SUBSCRIBE ================= */

  const subscribe = (
    nc: any,
    subject: string,
    handler: (d: any) => void,
    decoder = sc
  ) => {
    const sub = nc.subscribe(subject);

    subsRef.current.push(sub);

    (async () => {
      for await (const msg of sub) {
        handler(decoder.decode(msg.data));
      }
    })();
  };

  const subscribeAll = (nc: any) => {
    /* Cameras */

    ["camera1", "camera2", "camera3", "camera4", "camera5"].forEach(
      (cam) => {
        subscribe(
          nc,
          `/gui/inference/${cam}/annotated_image`,
          (data) => {
            console.log("hello", data)
          }
        );
      }
    );

    /* Inspection */

    subscribe(nc, "/gui/inspection_result", (d) =>
      setInspectionResult(JSON.parse(d))
    );

    subscribe(nc, "/gui/camera_detatils", (d) => {
      try {
        setCameraDetails(JSON.parse(d));
      } catch {}
    });

    /* Machine */

    subscribe(nc, "/machine_state", setMachineState);
    subscribe(nc, "/gui/plc_state", setPlc);
    subscribe(nc, "/power_state", setPower);

    /* Camera Status */

    subscribe(nc, "/gui/camera/status/1", (d) =>
      setCameraStatus1(JSON.parse(d))
    );
    subscribe(nc, "/gui/camera/status/2", (d) =>
      setCameraStatus2(JSON.parse(d))
    );
    subscribe(nc, "/gui/camera/status/3", (d) =>
      setCameraStatus3(JSON.parse(d))
    );
    subscribe(nc, "/gui/camera/status/4", (d) =>
      setCameraStatus4(JSON.parse(d))
    );
    subscribe(nc, "/gui/camera/status/5", (d) =>
      setCameraStatus5(JSON.parse(d))
    );


    subscribe(nc, "/warning", (d) =>
      setPopupData({ title: "Warning", data: d })
    );

    subscribe(nc, "/error", (d) =>
      setPopupData({
        title: "Error",
        data: JSON.parse(d),
      })
    );
  };

  /* ================= LIFECYCLE ================= */

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    if (useMock) {
      setIsConnected(true);
      setMachineState("Grabbing Image");
      setPlc("Connected");
      setPower("ON");
      setInspectionResult({
        overall_result: true,
        camera_1: { final_result: true },
        camera_2: { final_result: false },
        camera_3: { final_result: true },
        camera_4: { final_result: true },
        camera_5: { final_result: false },
      });
      setCameraDetails({
        camera1: { cameraSerialNumber: "SN-23491", temp: "42", cameraView: "Front" },
        camera2: { cameraSerialNumber: "SN-23910", temp: "41", cameraView: "Left" },
        camera3: { cameraSerialNumber: "SN-11873", temp: "44", cameraView: "Right" },
        camera4: { cameraSerialNumber: "SN-55220", temp: "43", cameraView: "Rear" },
        camera5: { cameraSerialNumber: "SN-99102", temp: "41", cameraView: "Top" },
      });
      return;
    }

    connectToNATS();

    return () => {
      subsRef.current.forEach((s) => s.unsubscribe());
      subsRef.current = [];

      ncRef.current?.close();
      clearTimeout(reconnectTimeout.current);
    };
  }, []);

  /* ================= PROVIDER VALUE ================= */

  const value: NATSContextType = {
    isConnected,

    images,
    setImages,

    inspectionResult,
    setInspectionResult,

    cameraDetails,
    setCameraDetails,

    machineState,
    plc,

    cameraStatus1,
    cameraStatus2,
    cameraStatus3,
    cameraStatus4,
    cameraStatus5,

    power,
    popupData,

    publishStartStop: (v) =>
      publish("/inspection_command", v),

    publishDataCollection: (v) =>
      publish("/data_collection", v),

    publishMasterData: (v) =>
      publish("/master_data", v),

    publishDataCollectionData: (v) =>
      publish("/gui/data_collection_data", v),

    publishShutdown: (v) =>
      publish("/system_shutdown", v),

    publishFGPartNumber: (v) =>
      publish("/gui/fg_part_number", v),
  };

  return (
    <NATSContext.Provider value={value}>
      {children}
    </NATSContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useNATS = (): NATSContextType => {
  const ctx = useContext(NATSContext);

  if (!ctx) {
    throw new Error(
      "useNATS must be used inside NATSProvider"
    );
  }

  return ctx;
};
