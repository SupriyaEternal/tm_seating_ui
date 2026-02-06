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

const AutoInspectionCameraDetailScreen = () => {
    const navigate = useNavigate();
    const { cameraId } = useParams();

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
        { id: 4, label: "Stitch Jump", status: "Stitch Jump detected" },
        { id: 5, label: "Stitch Loose", status: "No Stitch Loose detected" },
        { id: 6, label: "Loose Thread", status: "No Loose Thread detected" },
        { id: 7, label: "Thread Missing", status: "Thread missing detected" },
        { id: 8, label: "J Retainer Issue", status: "No J Retainer Issue detected" },
        { id: 9, label: "Pinch Mark", status: "Pinch Marks detected" },
        { id: 10, label: "Impression Marks", status: "Impression Marks detected" },
        { id: 11, label: "Stains", status: "Stain Marks detected" },
    ];

    const dimensionalData = [
        { id: 1, label: "Diameter parameter - OD ROD", status: "14 mm" },
        { id: 2, label: "Diameter parameter - ID ROD", status: "14 mm" },
        { id: 3, label: "Distance between 2 rods", status: "15 cm" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="mx-auto max-w-[1400px] px-3 py-4 pb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
                            Auto Mode
                        </p>
                        <h1 className="mt-1 text-lg font-extrabold text-gray-900">
                            CAM - {cameraId?.toUpperCase()}
                        </h1>
                    </div>
                    <button
                        onClick={() => navigate("/inspection/auto")}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        ← Back
                    </button>
                </div>

                <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                    <Image.PreviewGroup>
                        <div className="grid grid-cols-12 gap-2">
                            {images.map((src, idx) => (
                                <Image
                                    key={`detail-${idx}`}
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

                <div className="mt-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
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
                                <tr key={row.id} className="border-t">
                                    <td className="p-2">{row.id}</td>
                                    <td className="p-2">{row.label}</td>
                                    <td className="p-2">{row.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
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
                                <tr key={row.id} className="border-t">
                                    <td className="p-2">{row.id}</td>
                                    <td className="p-2">{row.label}</td>
                                    <td className="p-2">{row.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AutoInspectionCameraDetailScreen;
