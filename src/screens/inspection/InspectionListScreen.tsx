import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

type InspectionStatus = "ok" | "ng";

const InspectionListScreen = () => {
    const navigate = useNavigate();
    const { status } = useParams();

    const inspections = useMemo(
        () => [
            { id: "2025120910000001236", fgPart: "V1243", time: "2025-12-10 10:00:00", shift: "A", status: "ok" },
            { id: "202512091006005636", fgPart: "V124", time: "2025-12-10 10:06:00", shift: "A", status: "ng" },
            { id: "202512091020002369", fgPart: "V1243", time: "2025-12-10 10:20:00", shift: "A", status: "ok" },
            { id: "202512091026006365", fgPart: "V124", time: "2025-12-10 10:26:00", shift: "A", status: "ng" },
            { id: "202512091030005639", fgPart: "V1243", time: "2025-12-10 10:30:00", shift: "A", status: "ok" },
        ],
        []
    );

    const normalized = status === "ok" || status === "ng" ? (status as InspectionStatus) : "total";
    const filtered =
        normalized === "total" ? inspections : inspections.filter((row) => row.status === normalized);
    const titleLabel = normalized === "total" ? "Total Inspections" : `${normalized.toUpperCase()} Inspections`;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="mx-auto max-w-[1400px] px-3 py-4 pb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <button
                            onClick={() => navigate("/inspection/auto")}
                            className="rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                            ←
                        </button>
                        <span>{titleLabel} - 06-02-2026 ({filtered.length})</span>
                    </div>
                    <div className="text-xs text-gray-500">06-02-2026 13:22:42</div>
                </div>

                <div className="mt-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="w-full text-[11px]">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="p-3 text-left">INSPECTION ID</th>
                                <th className="p-3 text-left">FG PART NUMBER</th>
                                <th className="p-3 text-left">DATE & TIME</th>
                                <th className="p-3 text-left">SHIFT</th>
                                <th className="p-3 text-left">STATUS</th>
                                <th className="p-3 text-left">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((row) => (
                                <tr key={row.id} className="border-t">
                                    <td className="p-3">{row.id}</td>
                                    <td className="p-3">{row.fgPart}</td>
                                    <td className="p-3">{row.time}</td>
                                    <td className="p-3">{row.shift}</td>
                                    <td className="p-3">
                                        <span
                                            className={`inline-flex min-w-[48px] justify-center rounded-md px-2 py-1 text-[10px] font-semibold ${
                                                row.status === "ok"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-600"
                                            }`}
                                        >
                                            {row.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() =>
                                                window.open(
                                                    `/inspection/auto/inspection/${row.id}`,
                                                    "_blank",
                                                    "noopener,noreferrer"
                                                )
                                            }
                                            className="text-blue-600 underline"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InspectionListScreen;
