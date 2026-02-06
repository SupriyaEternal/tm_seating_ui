import { useEffect, useMemo, useState } from "react";
import { Image, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpg";
import image6 from "../../assets/images/image6.jpg";

type Step = "health" | "orientation" | "multicamera";
type CameraKey = "CAM-1" | "CAM-2" | "CAM-3" | "CAM-4" | "CAM-5";

const AutoInspectionScreen = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>("health");
    const [cameraConnected, setCameraConnected] = useState<Record<CameraKey, boolean>>({
        "CAM-1": true,
        "CAM-2": false,
        "CAM-3": true,
        "CAM-4": false,
        "CAM-5": true,
    });
    const [plcConnected, setPlcConnected] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => {
            setCameraConnected({
                "CAM-1": true,
                "CAM-2": true,
                "CAM-3": true,
                "CAM-4": true,
                "CAM-5": true,
            });
            setPlcConnected(true);
        }, 4000);

        const t2 = setTimeout(() => setStep("orientation"), 10000);
        const t3 = setTimeout(() => setStep("multicamera"), 20000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    const sampleImages = useMemo(
        () => [image1, image2, image3, image4, image5, image6],
        []
    );

    const cameraImages = useMemo(
        () => ({
            "CAM-1": sampleImages,
            "CAM-2": sampleImages,
            "CAM-3": sampleImages,
            "CAM-4": sampleImages,
            "CAM-5": sampleImages,
        }),
        [sampleImages]
    );

    const cameraResult = useMemo(
        () => ({
            "CAM-1": "ok",
            "CAM-2": "ng",
            "CAM-3": "ok",
            "CAM-4": "ok",
            "CAM-5": "ng",
        }),
        []
    );

    const defectCounts = useMemo(
        () => ({
            "CAM-1": "W:3, S:2, N:1",
            "CAM-2": "W:1, S:0, N:2",
            "CAM-3": "W:0, S:1, N:0",
            "CAM-4": "W:2, S:1, N:0",
            "CAM-5": "W:4, S:2, N:1",
        }),
        []
    );

    const inspectionSummary = {
        date: "05-02-2026",
        total: 10,
        ok: 8,
        ng: 2,
        percentNg: "20.00%",
    };

    const handleSummaryClick = (status: "total" | "ok" | "ng") => {
        window.open(`/inspection/auto/inspections/${status}`, "_blank", "noopener,noreferrer");
    };

    const handleInspectionDetails = (inspectionId: string) => {
        window.open(`/inspection/auto/inspection/${inspectionId}`, "_blank", "noopener,noreferrer");
    };

    const previousInspections = [
        {
            id: "20250210182234667",
            fgPart: "F-234",
            time: "10:00",
            result: "OK",
        },
    ];

    const fgPartNumber = "FG-4021";
    const customerType = "Toyota";
    const allConnected = Object.values(cameraConnected).every(Boolean) && plcConnected;

    return (
        <div className="min-h-screen bg-[#f5f6f8]">
            <Navbar />

            <div className="mx-auto max-w-[1400px] px-3 py-4">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
                        Auto Mode
                    </p>
                    <div className="flex gap-2">
                        <Tag color={allConnected ? "green" : "red"}>
                            {allConnected ? "All Devices Connected" : "Waiting for Devices"}
                        </Tag>
                        <Tag color={step === "multicamera" ? "blue" : "default"}>
                            {step === "health" ? "Health Check" : step === "orientation" ? "Orientation" : "Multi Camera"}
                        </Tag>
                    </div>
                </div>

                {step === "health" && (
                    <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Camera Health Status</h2>
                                <p className="mt-1 text-xs text-gray-500">
                                    All 5 cameras and PLC must be connected to proceed.
                                </p>
                            </div>
                            {!allConnected && (
                                <button
                                    onClick={() => navigate("/inspection/diagnostic")}
                                    className="rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                                >
                                    Go to Health Monitoring
                                </button>
                            )}
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-3">
                            {Object.entries(cameraConnected).map(([cam, ok]) => (
                                <div
                                    key={cam}
                                    className={`rounded-lg border p-3 ${
                                        ok ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                                    }`}
                                >
                                    <p className="text-xs font-semibold text-gray-800">{cam}</p>
                                    <p
                                        className={`mt-1 text-[11px] font-semibold ${
                                            ok ? "text-green-700" : "text-red-600"
                                        }`}
                                    >
                                        {ok ? "Connected" : "Disconnected"}
                                    </p>
                                </div>
                            ))}
                            <div
                                className={`rounded-lg border p-3 ${
                                    plcConnected ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                                }`}
                            >
                                <p className="text-xs font-semibold text-gray-800">PLC</p>
                                <p
                                    className={`mt-1 text-[11px] font-semibold ${
                                        plcConnected ? "text-green-700" : "text-red-600"
                                    }`}
                                >
                                    {plcConnected ? "Connected" : "Disconnected"}
                                </p>
                            </div>
                        </div>

                        {!allConnected && (
                            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700">
                                Some cameras are disconnected. For detailed information, go to Diagnostic mode.
                            </div>
                        )}
                    </div>
                )}

                {step === "orientation" && (
                    <div className="mt-4 grid grid-cols-[2.3fr_1fr] gap-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-gray-800">Orientation Check</h2>
                                <Tag color="green">Orientation OK</Tag>
                            </div>
                            <div className="mt-3 overflow-hidden rounded-lg border border-gray-100">
                                <Image
                                    src={sampleImages[0]}
                                    alt="Orientation view"
                                    preview={{ src: sampleImages[0] }}
                                    className="w-full"
                                    height={320}
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <div className="rounded-lg border border-gray-200 bg-white p-2">
                                <div className="flex items-center justify-between text-xs text-gray-600">
                                    <span>FG Part Number</span>
                                    <span className="font-semibold text-gray-900">{fgPartNumber}</span>
                                </div>
                                <div className="mt-1 flex items-center justify-between text-xs text-gray-600">
                                    <span>Customer Type</span>
                                    <span className="font-semibold text-gray-900">{customerType}</span>
                                </div>
                            </div>

                            <h3 className="mt-3 text-sm font-semibold text-gray-800">Orientation Status</h3>
                            <div className="mt-3 space-y-2 text-xs text-gray-600">
                                <div className="flex items-center justify-between">
                                    <span>Orientation</span>
                                    <span className="font-semibold text-green-600">Correct</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Next Step</span>
                                    <span className="font-semibold text-blue-600">Multi-Camera Review</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Part Position</span>
                                    <span className="font-semibold text-gray-800">Tilted</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Machine State</span>
                                    <span className="font-semibold text-gray-800">Grabbing Image</span>
                                </div>
                            </div>
                            <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-[11px] text-blue-700">
                                Orientation is correct. Proceeding to multi-camera inspection.
                            </div>

                            <div className="mt-3 rounded-lg border border-gray-200 bg-white p-2">
                                <h4 className="text-xs font-semibold text-gray-700">
                                    Inspections ({inspectionSummary.date})
                                </h4>
                                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                                    <button
                                        onClick={() => handleSummaryClick("total")}
                                        className="rounded-lg border border-blue-200 px-2 py-1.5 text-center text-blue-700 hover:bg-blue-50"
                                    >
                                        Total
                                        <div className="font-semibold">{inspectionSummary.total}</div>
                                    </button>
                                    <button
                                        onClick={() => handleSummaryClick("ok")}
                                        className="rounded-lg border border-green-200 px-2 py-1.5 text-center text-green-700 hover:bg-green-50"
                                    >
                                        OK
                                        <div className="font-semibold">{inspectionSummary.ok}</div>
                                    </button>
                                    <button
                                        onClick={() => handleSummaryClick("ng")}
                                        className="rounded-lg border border-red-200 px-2 py-1.5 text-center text-red-600 hover:bg-red-50"
                                    >
                                        NG
                                        <div className="font-semibold">{inspectionSummary.ng}</div>
                                    </button>
                                    <div className="rounded-lg border border-red-200 px-2 py-1.5 text-center text-red-600">
                                        % NG
                                        <div className="font-semibold">{inspectionSummary.percentNg}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 rounded-lg border border-gray-200 bg-white p-2">
                                <h4 className="text-xs font-semibold text-gray-700">
                                    Previous Inspections (1) - ({inspectionSummary.date})
                                </h4>
                                <table className="mt-2 w-full text-[10px]">
                                    <thead className="bg-gray-50 text-gray-600">
                                        <tr>
                                            <th className="p-1.5 text-left">Inspection ID</th>
                                            <th className="p-1.5 text-left">FG Part</th>
                                            <th className="p-1.5 text-left">Date & Time</th>
                                            <th className="p-1.5 text-left">Result</th>
                                            <th className="p-1.5 text-left">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previousInspections.map((row) => (
                                            <tr key={row.id} className="border-t">
                                                <td className="p-1.5">{row.id}</td>
                                                <td className="p-1.5">{row.fgPart}</td>
                                                <td className="p-1.5">{row.time}</td>
                                                <td className="p-1.5 text-green-600 font-semibold">{row.result}</td>
                                                <td className="p-1.5">
                                                    <button
                                                        onClick={() => handleInspectionDetails(row.id)}
                                                        className="text-blue-600 underline"
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

{step === "multicamera" && (
    <div className="mt-4 grid grid-cols-[3.2fr_1.1fr] gap-3">
        <div className="grid grid-cols-3 grid-rows-2 gap-1.5">
            {Object.keys(cameraImages).map((cam, index) => {
                const status = cameraResult[cam as CameraKey];
                const isLastRow = index >= 3; // CAM-4 and CAM-5 are in the second row
                
                return (
                    <div
                        key={cam}
                        className={`rounded-lg border px-2 py-1.5 ${
                            status === "ok"
                                ? "border-green-200 bg-green-50"
                                : "border-red-200 bg-red-50"
                        } ${isLastRow ? 'row-start-2' : ''}`}
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-[11px] font-semibold text-gray-800">{cam}</h3>
                        </div>
                        <Image.PreviewGroup>
                            <div className="grid grid-cols-4 gap-2">
                                {cameraImages[cam as CameraKey].map((src, idx) => (
                                    <Image
                                        key={`${cam}-${idx}`}
                                        src={src}
                                        preview={{ src }}
                                        className="rounded-sm"
                                        width="100%"
                                        height={32}
                                        style={{ objectFit: "cover" }}
                                    />
                                ))}
                            </div>
                        </Image.PreviewGroup>
                    </div>
                );
            })}
            
            {/* Inspection Summary Section (placed in the grid beside bottom cameras) */}
            <div className="col-span-2 row-start-2 space-y-3">
                <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                    <h4 className="text-xs font-semibold text-gray-700">
                        Inspections ({inspectionSummary.date})
                    </h4>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                        <button
                            onClick={() => handleSummaryClick("total")}
                            className="rounded-lg border border-blue-200 px-2 py-1.5 text-center text-blue-700 hover:bg-blue-50"
                        >
                            Total
                            <div className="font-semibold">{inspectionSummary.total}</div>
                        </button>
                        <button
                            onClick={() => handleSummaryClick("ok")}
                            className="rounded-lg border border-green-200 px-2 py-1.5 text-center text-green-700 hover:bg-green-50"
                        >
                            OK
                            <div className="font-semibold">{inspectionSummary.ok}</div>
                        </button>
                        <button
                            onClick={() => handleSummaryClick("ng")}
                            className="rounded-lg border border-red-200 px-2 py-1.5 text-center text-red-600 hover:bg-red-50"
                        >
                            NG
                            <div className="font-semibold">{inspectionSummary.ng}</div>
                        </button>
                        <div className="rounded-lg border border-red-200 px-2 py-1.5 text-center text-red-600">
                            % NG
                            <div className="font-semibold">{inspectionSummary.percentNg}</div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                    <h4 className="text-xs font-semibold text-gray-700">
                        Previous Inspections (1) - ({inspectionSummary.date})
                    </h4>
                    <table className="mt-2 w-full text-[10px]">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="p-1.5 text-left">Inspection ID</th>
                                <th className="p-1.5 text-left">FG Part</th>
                                <th className="p-1.5 text-left">Date & Time</th>
                                <th className="p-1.5 text-left">Result</th>
                                <th className="p-1.5 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {previousInspections.map((row) => (
                                <tr key={row.id} className="border-t">
                                    <td className="p-1.5">{row.id}</td>
                                    <td className="p-1.5">{row.fgPart}</td>
                                    <td className="p-1.5">{row.time}</td>
                                    <td className="p-1.5 text-green-600 font-semibold">{row.result}</td>
                                    <td className="p-1.5">
                                        <button
                                            onClick={() => handleInspectionDetails(row.id)}
                                            className="text-blue-600 underline"
                                        >
                                        Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="space-y-3">
            <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                <button className="w-full rounded-md border border-green-300 bg-white px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-50">
                    Start Inspection
                </button>
                <div className="mt-3 space-y-2 text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                        <span>FG Part Number</span>
                        <span className="font-semibold text-gray-900">{fgPartNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Customer Type</span>
                        <span className="font-semibold text-gray-900">{customerType}</span>
                    </div>
                    {/* <div className="flex items-center justify-between">
                        <span>QR Code</span>
                        <span className="font-semibold text-gray-900">XXXX-XXXX</span>
                    </div> */}
                </div>
            </div>

            <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-2">
                <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-gray-700">Inspection Result</h4>
                    <span className="text-xs font-semibold text-green-700">OK</span>
                </div>
            </div>

            <div className="mt-3 rounded-lg border border-gray-200 bg-white p-2">
                <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-gray-700">Part Position</h4>
                    <span className="text-xs font-semibold text-gray-800">Tilted</span>
                </div>
            </div>

            <div className="mt-3 rounded-lg border border-gray-200 bg-white p-2">
                <h4 className="text-xs font-semibold text-gray-700">Inspection Details</h4>
                <div className="mt-2 space-y-2">
                    {Object.keys(defectCounts).map((cam) => (
                        <div
                            key={`${cam}-detail`}
                            className={`rounded-lg px-3 py-2 text-[11px] ${
                                cameraResult[cam as CameraKey] === "ok"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">{cam}</span>
                                <span className="font-semibold">
                                    {cameraResult[cam as CameraKey].toUpperCase()}
                                </span>
                            </div>
                            {/* <div className="mt-1 text-[11px] font-semibold text-gray-700">
                                {defectCounts[cam as CameraKey]}
                            </div> */}
                            <button
                                onClick={() =>
                                    navigate(`/inspection/auto/camera/${cam.toLowerCase()}`)
                                }
                                className="mt-1 text-[11px] font-semibold underline"
                            >
                                View Details ↗
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-3 rounded-lg border border-gray-200 bg-white p-2">
                <h4 className="text-xs font-semibold text-gray-700">Machine State</h4>
                <div className="mt-2 space-y-1.5 text-[11px] text-gray-600">
                    <div className="flex items-center justify-between">
                        <span>State</span>
                        <span className="font-semibold text-gray-800">Grabbing Image</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>PLC</span>
                        <span className="font-semibold text-green-600">Connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Camera Status</span>
                        <span className="font-semibold text-green-600">All Connected</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}
            </div>
        </div>
    );
};

export default AutoInspectionScreen;
