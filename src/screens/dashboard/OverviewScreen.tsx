import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, PieChartOutlined } from "@ant-design/icons";

const summaryCards = [
    {
        label: "Last Inspection Time",
        value: "10:24:36",
        accent: "bg-amber-50 text-amber-600",
        icon: <ClockCircleOutlined className="text-amber-600" />,
    },
    {
        label: "Total Parts Inspected",
        value: "10",
        accent: "bg-blue-50 text-blue-700",
        icon: <PieChartOutlined className="text-blue-700" />,
    },
    {
        label: "OK Inspections",
        value: "8",
        accent: "bg-green-50 text-green-700",
        icon: <CheckCircleOutlined className="text-green-700" />,
    },
    {
        label: "NG Inspections",
        value: "2",
        accent: "bg-red-50 text-red-600",
        icon: <CloseCircleOutlined className="text-red-600" />,
    },
];

const recentInspections = [
    {
        id: "202512091000001236",
        part: "V1243",
        time: "2025-12-10 10:00:00",
        shift: "A",
        status: "OK",
    },
    {
        id: "202512091006005636",
        part: "V124",
        time: "2025-12-10 10:06:00",
        shift: "A",
        status: "NG",
    },
    {
        id: "202512091020002369",
        part: "V1243",
        time: "2025-12-10 10:20:00",
        shift: "A",
        status: "OK",
    },
    {
        id: "202512091026006365",
        part: "V124",
        time: "2025-12-10 10:26:00",
        shift: "A",
        status: "NG",
    },
    {
        id: "202512091030005639",
        part: "V1243",
        time: "2025-12-10 10:30:00",
        shift: "A",
        status: "OK",
    },
];

const OverviewScreen = () => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">Overview</h1>
                    <div className="mt-2 flex gap-4 text-xs text-gray-500">
                        <button className="font-semibold text-blue-700">All Shifts</button>
                        <button>Shift A</button>
                        <button>Shift B</button>
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
                    <span>06-02-2026</span>
                    <span className="text-gray-400">—</span>
                    <span>06-02-2026</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-5">
                {summaryCards.map((card) => (
                    <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                        <div className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${card.accent}`}>
                            {card.icon}
                        </div>
                        <p className="mt-3 text-xs text-gray-500">{card.label}</p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <span className="h-2 w-2 rounded-full bg-gray-800" />
                    <span>Recent Inspections (5)</span>
                </div>
                <table className="mt-4 w-full text-[11px]">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-2 text-left">INSPECTION ID</th>
                            <th className="p-2 text-left">FG PART NUMBER</th>
                            <th className="p-2 text-left">DATE & TIME</th>
                            <th className="p-2 text-left">SHIFT</th>
                            <th className="p-2 text-left">STATUS</th>
                            <th className="p-2 text-left">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentInspections.map((row) => (
                            <tr key={row.id} className="border-t">
                                <td className="p-2">{row.id}</td>
                                <td className="p-2">{row.part}</td>
                                <td className="p-2">{row.time}</td>
                                <td className="p-2">{row.shift}</td>
                                <td className="p-2">
                                    <span
                                        className={`inline-flex min-w-[44px] justify-center rounded-md px-2 py-1 text-[10px] font-semibold ${
                                            row.status === "OK"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-red-50 text-red-600"
                                        }`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                                <td className="p-2 text-blue-600 underline">View Details</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OverviewScreen;
