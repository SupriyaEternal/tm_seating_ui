import { Image } from "antd";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import image1 from "../../assets/images/image1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.jpg";
import image4 from "../../assets/images/image4.jpg";
import image5 from "../../assets/images/image5.jpg";
import image6 from "../../assets/images/image6.jpg";

const InspectionDetailsScreen = () => {
    const navigate = useNavigate();
    const { inspectionId } = useParams();

    const cameras = ["CAM-01", "CAM-02", "CAM-03", "CAM-04", "CAM-05"];
    const sampleImages = useMemo(
        () => [image1, image2, image3, image4, image5, image6],
        []
    );
    const images = useMemo(
        () => Array.from({ length: 14 }, (_, idx) => sampleImages[idx % sampleImages.length]),
        [sampleImages]
    );

    const checkPoints = [
        { id: 1, label: "Wrinkle", status: "No Wrinkle detected" },
        { id: 2, label: "Waviness", status: "No Waviness detected" },
        { id: 3, label: "Notch", status: "No Notch detected" },
        { id: 4, label: "Stitch Jump", status: "No Stitch Jump detected" },
    ];

    const dimensionalData = [
        { id: 1, label: "Diameter parameter - OD ROD", status: "14 mm" },
        { id: 2, label: "Diameter parameter - CD ROD", status: "14 mm" },
        { id: 3, label: "Distance between 2 rods", status: "15 cm" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="mx-auto max-w-[1400px] px-3 py-4 pb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <button
                            onClick={() => navigate(-1)}
                            className="rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                            ←
                        </button>
                        <span>Inspection Details</span>
                    </div>
                    <div className="text-xs text-gray-500">06-02-2026 13:23:23</div>
                </div>

                <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="grid grid-cols-5 gap-4 text-[11px] text-gray-700">
                        <div>
                            <p className="text-[10px] uppercase text-gray-400">Inspection ID</p>
                            <p className="font-semibold text-gray-800">{inspectionId}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase text-gray-400">FG Part Number</p>
                            <p className="font-semibold text-gray-800">V1243</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase text-gray-400">Status</p>
                            <p className="font-semibold text-green-700">OK</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase text-gray-400">Inspection Date & Time</p>
                            <p className="font-semibold text-gray-800">2025-12-09 19:35:45</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase text-gray-400">Shift</p>
                            <p className="font-semibold text-gray-800">A</p>
                        </div>
                    </div>
                </div>

                {cameras.map((cam, index) => (
                    <div key={cam} className="mt-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                            <span className="h-2 w-2 rounded-full bg-gray-700" />
                            <span>{cam}</span>
                        </div>

                        <div className="mt-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <Image.PreviewGroup>
                                <div className="grid grid-cols-12 gap-2">
                                    {images.map((src, idx) => (
                                        <Image
                                            key={`${cam}-${idx}`}
                                            src={src}
                                            preview={{ src }}
                                            className="rounded-md"
                                            width="100%"
                                            height={64}
                                            style={{ objectFit: "cover" }}
                                        />
                                    ))}
                                </div>
                            </Image.PreviewGroup>
                        </div>

                        {index === 0 && (
                            <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                                <h2 className="text-xs font-semibold text-gray-700">Dimensional Data</h2>
                                <table className="mt-2 w-full text-[11px]">
                                    <thead className="bg-gray-50 text-gray-600">
                                        <tr>
                                            <th className="p-2 text-left">S NO</th>
                                            <th className="p-2 text-left">CHECK POINT</th>
                                            <th className="p-2 text-left">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dimensionalData.map((row) => (
                                            <tr key={`${cam}-dim-${row.id}`} className="border-t">
                                                <td className="p-2">{row.id}</td>
                                                <td className="p-2">{row.label}</td>
                                                <td className="p-2">{row.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                            <h2 className="text-xs font-semibold text-gray-700">Check Points</h2>
                            <table className="mt-2 w-full text-[11px]">
                                <thead className="bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="p-2 text-left">S NO</th>
                                        <th className="p-2 text-left">CHECK POINT</th>
                                        <th className="p-2 text-left">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {checkPoints.map((row) => (
                                        <tr key={`${cam}-check-${row.id}`} className="border-t">
                                            <td className="p-2">{row.id}</td>
                                            <td className="p-2">{row.label}</td>
                                            <td className="p-2">{row.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InspectionDetailsScreen;
