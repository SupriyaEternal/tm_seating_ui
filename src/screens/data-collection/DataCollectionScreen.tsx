import { Image } from "antd";
import { useNATS } from "../../contexts/NatsContext";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpg";
import image6 from "../../assets/images/image6.jpg";
import Navbar from "../../components/layout/Navbar";
import { useEffect, useMemo, useState } from "react";
import FgPartModal from "../../components/forms/FgPartModal";

const DataCollectionScreen = () => {
    useNATS();
    const [fgPartNumber, setFgPartNumber] = useState<string>("");
    const [showFgModal, setShowFgModal] = useState(false);
    const [step, setStep] = useState<"health" | "orientation" | "multicamera">("health");
    const [pendingOrientation, setPendingOrientation] = useState(false);
    const [devicesConnected, setDevicesConnected] = useState(false);

    const sampleImages = useMemo(() => [image1, image2, image3, image4, image5, image6], []);
    const totalInspections = "10";
    const machineState = "Grabbing Image";
    const power = "ON";
    const partPosition = "Tilted";

    const cameraStatusEntries = useMemo(
        () => [
            { name: "CAM-1", connected: devicesConnected },
            { name: "CAM-2", connected: devicesConnected },
            { name: "CAM-3", connected: devicesConnected },
            { name: "CAM-4", connected: devicesConnected },
            { name: "CAM-5", connected: devicesConnected },
        ],
        [devicesConnected]
    );

    const plcConnected = devicesConnected;
    const allConnected = devicesConnected;

    useEffect(() => {
        if (step !== "health") {
            return;
        }
        setDevicesConnected(false);
        const connectTimer = setTimeout(() => setDevicesConnected(true), 3000);
        const timer = setTimeout(() => {
            setShowFgModal(true);
            setPendingOrientation(true);
        }, 10000);
        return () => {
            clearTimeout(timer);
            clearTimeout(connectTimer);
        };
    }, [step]);

    useEffect(() => {
        if (step !== "orientation") {
            return;
        }
        const timer = setTimeout(() => setStep("multicamera"), 10000);
        return () => clearTimeout(timer);
    }, [step]);

    const orientationImage = useMemo(() => sampleImages[0], [sampleImages]);

    return (

        <>

            <div className="flex flex-col h-screen overflow-hidden bg-gray-100 gap-10">

                <Navbar />

                <div className="flex w-full h-[80vh] flex-row ">

                    <div
                        className={`${
                            step === "multicamera" ? "w-3/4" : "w-full"
                        } mr-5 ml-5 overflow-hidden`}
                    >
                        {step === "health" && (
                            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
                                            Camera Status
                                        </p>
                                        <h2 className="mt-2 text-lg font-semibold text-gray-900">
                                            Device Connectivity
                                        </h2>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Verify cameras before loading the recipe.
                                        </p>
                                    </div>
                                    <div
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${allConnected
                                                ? "bg-green-50 text-green-700"
                                                : "bg-red-50 text-red-600"
                                            }`}
                                    >
                                        {allConnected ? "All Connected" : "Waiting"}
                                    </div>
                                </div>
                                <div className="mt-5 grid grid-cols-3 gap-4">
                                    {[
                                        ...cameraStatusEntries,
                                        { name: "PLC", connected: plcConnected },
                                    ].map((cam) => (
                                        <div
                                            key={cam.name}
                                            className={`rounded-lg border p-4 ${cam.connected
                                                    ? "border-green-200 bg-green-50"
                                                    : "border-red-200 bg-red-50"
                                                }`}
                                        >
                                            <p className="text-sm font-semibold text-gray-800">{cam.name}</p>
                                            <p
                                                className={`mt-1 text-xs font-semibold ${cam.connected ? "text-green-700" : "text-red-600"
                                                    }`}
                                            >
                                                {cam.connected ? "Connected" : "Disconnected"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === "orientation" && (
                            <div className="grid grid-cols-[2.2fr_1fr] gap-4">
                                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-gray-800">Orientation Check</h3>
                                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                            OK
                                        </span>
                                    </div>
                                    <div className="mt-3 overflow-hidden rounded-lg border border-gray-100">
                                        <Image
                                            src={orientationImage}
                                            preview={{ src: orientationImage }}
                                            className="w-full"
                                            height={340}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                </div>
                                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                    <div className="rounded-lg border border-gray-200 bg-white p-2">
                                        <div className="flex items-center justify-between text-xs text-gray-600">
                                            <span>FG Part Number</span>
                                            <span className="font-semibold text-gray-900">
                                                {fgPartNumber || "--"}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center justify-between text-xs text-gray-600">
                                            <span>Machine State</span>
                                            <span className="font-semibold text-gray-800">{machineState || "--"}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2 text-xs text-gray-600">
                                        <div className="flex items-center justify-between">
                                            <span>Orientation</span>
                                            <span className="font-semibold text-green-600">Correct</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>PLC</span>
                                            <span className="font-semibold text-green-600">
                                                {plcConnected ? "Connected" : "Disconnected"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Camera</span>
                                            <span className="font-semibold text-green-600">
                                                {allConnected ? "All Connected" : "Waiting"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Power</span>
                                            <span className="font-semibold text-gray-800">{power || "--"}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Next Step</span>
                                            <span className="font-semibold text-blue-600">Multi-Camera</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-[11px] text-blue-700">
                                        Orientation verified. Proceeding to multi-camera view.
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === "multicamera" && (
                            <Image.PreviewGroup>
                                <div className="grid grid-cols-3 grid-rows-2 gap-1.5 h-full">
                                    {[
                                        { id: 1, key: "camera1" },
                                        { id: 2, key: "camera2" },
                                        { id: 3, key: "camera3" },
                                        { id: 4, key: "camera4" },
                                        { id: 5, key: "camera5" },
                                    ].map((cam) => {
                                        const result = cam.id % 2 === 0 ? false : true;

                                        const blockStyle =
                                            result === true
                                                ? "border-green-200 bg-green-50"
                                                : result === false
                                                    ? "border-red-200 bg-red-50"
                                                    : "border-gray-200 bg-white";

                                        const displayImages = sampleImages;

                                        return (
                                            <div
                                                key={cam.id}
                                                className={`h-full flex flex-col rounded-lg border px-2 py-1.5 ${blockStyle}`}
                                            >
                                                <div className="mb-1 flex items-center justify-between">
                                                    <p className="text-[11px] font-semibold text-gray-700">
                                                        CAM-{cam.id}
                                                    </p>
                                                </div>

                                                <div className="flex-1 mt-3">
                                                    <div className="grid grid-cols-4 gap-2">
                                                        {displayImages.map((_img: string, idx: number) => {
                                                            const src = sampleImages[idx % sampleImages.length];
                                                            return (
                                                                <Image
                                                                    key={`${cam.id}-${idx}`}
                                                                    src={src}
                                                                    preview={{ src }}
                                                                    className="rounded-sm"
                                                                    width="100%"
                                                                    height={32}
                                                                    style={{ objectFit: "cover" }}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div className="h-full rounded-lg border border-gray-200 bg-white shadow flex flex-col items-center justify-center gap-1">
                                        <p className="text-xs uppercase tracking-wide text-gray-400">
                                            Total Inspections
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-700">
                                            {totalInspections}
                                        </p>
                                    </div>
                                </div>
                            </Image.PreviewGroup>
                        )}
                    </div>

                    {step === "multicamera" && (
                        <div
                            className="flex-1 mr-5 bg-white backdrop-blur
                        border-l border-gray-200 
                        flex flex-col overflow-hidden rounded-l-2xl"
                        >
                            <div className="overflow-y-auto p-6 space-y-5">


                                <div className="bg-gray-100 rounded-xl p-4 border border-gray-100 space-y-3">

                                    <div className="flex justify-between items-center">

                                        <span className="text-md uppercase tracking-wide text-gray-400">
                                            FG Part Number
                                        </span>

                                        <span className="text-sm font-semibold text-gray-800">
                                            {fgPartNumber || "--"}
                                        </span>

                                    </div>

                                    <button
                                        onClick={() => setShowFgModal(true)}
                                        className="
                                w-full py-2 rounded-md
                                bg-[#1E2D5B] text-white
                                text-sm font-medium
                                hover:bg-[#162146]
                                transition cursor-pointer
                                "
                                    >
                                        Load Recipe
                                    </button>

                                </div>

                                {/* 
                        <div
                        className={`
                            rounded-xl p-4 border 
                            ${
                            inspectionResult?.overall_result === true
                                ? "bg-green-50/70 border-green-300"
                                : inspectionResult?.overall_result === false
                                ? "bg-red-50/70 border-red-300"
                                : "bg-gray-50/70 border-gray-200"
                            }
                        `}
                        >

                        <div className="flex justify-between items-center">

                            <span className="text-lg  tracking-wide text-gray-400">
                            Inspection Result
                            </span>

                            <span
                            className={`
                                text-lg font-semibold
                                ${
                                inspectionResult?.overall_result === true
                                    ? "text-green-600"
                                    : inspectionResult?.overall_result === false
                                    ? "text-red-600"
                                    : "text-gray-500"
                                }
                            `}
                            >
                            {inspectionResult?.overall_result === true
                                ? "OK"
                                : inspectionResult?.overall_result === false
                                ? "NG"
                                : "--"}
                            </span>

                        </div>

                        </div> */}

                                <div className="bg-gray-100 rounded-xl p-4  border border-gray-100">

                                    <div className="flex justify-between items-center">

                                        <span className="text-lg  tracking-wide text-gray-400">
                                            Machine State
                                        </span>

                                        <span className="text-sm font-medium text-gray-800">
                                            {machineState}
                                        </span>

                                    </div>

                                </div>

                                <div className="bg-gray-100 rounded-xl p-4  border border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg  tracking-wide text-gray-400">
                                            Part Position
                                        </span>
                                        <span className="text-sm font-medium text-gray-800">
                                            {partPosition}
                                        </span>
                                    </div>
                                </div>


                                <div className="bg-gray-100 rounded-xl p-4  border border-gray-100 space-y-3">

                                    <p className="text-lg tracking-wide text-gray-400">
                                        Status
                                    </p>


                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">PLC</span>
                                        <span className="text-green-600 font-medium">
                                            {plcConnected ? "Connected" : "Disconnected"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Camera</span>
                                        <span className="text-green-600 font-medium">
                                            {allConnected ? "All Connected" : "Waiting"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Power</span>
                                        <span className="font-medium text-gray-700">{power}</span>
                                    </div>

                                </div>


                                {/* <div className="bg-gray-100 rounded-xl p-4 border border-gray-100">
                            <p className="text-xs uppercase tracking-wide text-gray-400 mb-3">
                                Cameras
                            </p>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                {cameraStatusEntries.map((cam) => (
                                    <div
                                        key={cam.name}
                                        className="bg-gray-50 rounded-lg border border-gray-100 p-3 space-y-2"
                                    >
                                        <p className="font-semibold text-gray-700 text-sm">{cam.name}</p>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Status</span>
                                            <span>{cam.connected ? "Connected" : "Disconnected"}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}


                            </div>
                        </div>
                    )}


                </div>

            </div>

            <FgPartModal
                open={showFgModal}
                initialValue={fgPartNumber}
                onConfirm={(value) => {
                    setFgPartNumber(value);
                    setShowFgModal(false);
                    if (pendingOrientation || step === "health") {
                        setPendingOrientation(false);
                        setStep("orientation");
                    }
                }}
                onClose={() => setShowFgModal(false)}
            />


        </>

    );
};

export default DataCollectionScreen;
