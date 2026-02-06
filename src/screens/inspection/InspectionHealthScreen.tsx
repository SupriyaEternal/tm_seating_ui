import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { useApp } from "../../contexts/AppContext";

const cameraDetails = [
    { name: "CAM-1", status: "Connected", serial: "SN-23491", temp: "42°C" },
    { name: "CAM-2", status: "Disconnected", serial: "SN-23910", temp: "--" },
    { name: "CAM-3", status: "Connected", serial: "SN-11873", temp: "44°C" },
    { name: "CAM-4", status: "Disconnected", serial: "SN-55220", temp: "--" },
    { name: "CAM-5", status: "Connected", serial: "SN-99102", temp: "41°C" },
];

const plcStatus = {
    name: "PLC",
    status: "Connected",
};

const InspectionHealthScreen = () => {
    const { backendURL } = useApp();
    const useMock = true;
    const navigate = useNavigate();
    const [logData, setLogData] = useState<{
        plc: { status: string; path: string; lines: string[] };
        cameras: { name: string; status: string; path: string; lines: string[] }[];
    } | null>(null);
    const [logError, setLogError] = useState<string | null>(null);
    const [loadingLogs, setLoadingLogs] = useState(true);
    const [selectedCamera, setSelectedCamera] = useState<string>("");

    useEffect(() => {
        if (useMock) {
            setLogData({
                plc: {
                    status: "ok",
                    path: "PLC",
                    lines: [
                        "[PLC] Connected",
                        "[PLC] Cycle start",
                        "[PLC] Clamp engaged",
                        "[PLC] Image trigger sent",
                    ],
                },
                cameras: [
                    { name: "CAM-1", status: "ok", path: "CAM-1", lines: ["[CAM-1] Connected", "[CAM-1] Image captured"] },
                    { name: "CAM-2", status: "ok", path: "CAM-2", lines: ["[CAM-2] Connected", "[CAM-2] Image captured"] },
                    { name: "CAM-3", status: "ok", path: "CAM-3", lines: ["[CAM-3] Connected", "[CAM-3] Image captured"] },
                    { name: "CAM-4", status: "ok", path: "CAM-4", lines: ["[CAM-4] Connected", "[CAM-4] Image captured"] },
                    { name: "CAM-5", status: "ok", path: "CAM-5", lines: ["[CAM-5] Connected", "[CAM-5] Image captured"] },
                ],
            });
            setSelectedCamera("CAM-1");
            setLoadingLogs(false);
            return;
        }

        const controller = new AbortController();

        const loadLogs = async () => {
            try {
                setLoadingLogs(true);
                setLogError(null);
                const res = await fetch(`${backendURL}/api/logs?lines=200`, {
                    signal: controller.signal,
                });
                if (!res.ok) {
                    throw new Error("Unable to load logs");
                }
                const data = await res.json();
                setLogData(data);
                if (!selectedCamera && data?.cameras?.length) {
                    setSelectedCamera(data.cameras[0].name);
                }
            } catch (error: any) {
                if (error?.name !== "AbortError") {
                    setLogError("Log files not available.");
                }
            } finally {
                setLoadingLogs(false);
            }
        };

        loadLogs();
        return () => controller.abort();
    }, [backendURL]);

    const selectedCameraLog = useMemo(() => {
        if (!logData?.cameras?.length) {
            return null;
        }
        return logData.cameras.find((cam) => cam.name === selectedCamera) ?? logData.cameras[0];
    }, [logData, selectedCamera]);

    const plcLogText = logData?.plc?.lines?.length
        ? logData.plc.lines.join("\n")
        : "No PLC logs available.";
    const cameraLogText = selectedCameraLog?.lines?.length
        ? selectedCameraLog.lines.join("\n")
        : "No camera logs available.";

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="flex items-start justify-between">
                    <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
                        Diagnostic Mode
                    </p>
                    <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
                        Health Monitoring
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        View camera connectivity, temperatures, and device identifiers.
                    </p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                    >
                        ← Back
                    </button>
                </div>

                <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-gray-800">{plcStatus.name}</h3>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            {plcStatus.status}
                        </span>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">PLC status indicates controller connectivity.</p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-5">
                    {cameraDetails.map((cam) => (
                        <div
                            key={cam.name}
                            className={`rounded-2xl border p-5 shadow-sm ${
                                cam.status === "Connected"
                                    ? "border-green-200 bg-green-50"
                                    : "border-red-200 bg-red-50"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-semibold text-gray-800">{cam.name}</h3>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        cam.status === "Connected"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {cam.status}
                                </span>
                            </div>
                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                <div className="flex items-center justify-between">
                                    <span>Serial</span>
                                    <span className="font-semibold text-gray-800">{cam.serial}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Temperature</span>
                                    <span className="font-semibold text-gray-800">{cam.temp}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-5">
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-800">PLC Logs</h3>
                            <span className="text-[11px] text-gray-500">
                                {logData?.plc?.status === "ok" ? "Live" : "Missing"}
                            </span>
                        </div>
                        <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-gray-900 p-3 text-[10px] text-gray-100">
                            {loadingLogs ? "Loading logs..." : logError ?? plcLogText}
                        </pre>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-800">Camera Logs</h3>
                            <div className="flex flex-wrap gap-2">
                                {logData?.cameras?.map((cam) => (
                                    <button
                                        key={cam.name}
                                        onClick={() => setSelectedCamera(cam.name)}
                                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                                            cam.name === selectedCamera
                                                ? "border-blue-200 bg-blue-50 text-blue-700"
                                                : "border-gray-200 text-gray-600"
                                        }`}
                                    >
                                        {cam.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-gray-900 p-3 text-[10px] text-gray-100">
                            {loadingLogs ? "Loading logs..." : logError ?? cameraLogText}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InspectionHealthScreen;
