import { CheckCircleOutlined, CloseCircleOutlined, PieChartOutlined } from "@ant-design/icons";

const summaryCards = [
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

const inspectionRows = [
    { label: "OK", value: "80%", color: "bg-blue-600" },
    { label: "NG", value: "20%", color: "bg-gray-300" },
];

const defectRows = [
    { label: "Wrinkle", color: "bg-orange-400", donut: "#f59e0b" },
    { label: "Waviness", color: "bg-blue-500", donut: "#3b82f6" },
    { label: "Notch", color: "bg-gray-500", donut: "#6b7280" },
    { label: "Stitch Jump", color: "bg-slate-700", donut: "#334155" },
    { label: "Stitch Loose", color: "bg-orange-400", donut: "#f59e0b" },
    { label: "Loose Thread", color: "bg-blue-500", donut: "#3b82f6" },
    { label: "J Retainer Issue", color: "bg-gray-500", donut: "#6b7280" },
    { label: "Pinch Mark", color: "bg-orange-400", donut: "#f59e0b" },
    { label: "Impression Marks", color: "bg-blue-500", donut: "#3b82f6" },
    { label: "Stains", color: "bg-slate-700", donut: "#334155" },
];

const dailyInspections = {
    date: "2026-02-06",
    ok: 8,
    ng: 2,
};

const AnalyticsScreen = () => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">Analytics</h1>
                    <div className="mt-2 flex gap-4 text-xs text-gray-500">
                        <button className="font-semibold text-blue-700">All Shifts</button>
                        <button>Shift A</button>
                        <button>Shift B</button>
                    </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
                    <span>2026-02-06</span>
                    <span className="text-gray-400">—</span>
                    <span>2026-02-06</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-5">
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

            <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <span className="h-2 w-2 rounded-full bg-blue-600" />
                        <span>Inspection Summary</span>
                    </div>
                    <div className="mt-6 grid grid-cols-[1.2fr_1fr] items-center gap-6">
                        <div className="flex flex-col gap-2 text-xs text-gray-600">
                            {inspectionRows.map((row) => (
                                <div key={row.label} className="flex items-center gap-2">
                                    <span className={`h-2 w-2 rounded-full ${row.color}`} />
                                    <span className="w-10">{row.label}</span>
                                    <span>{row.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            <div
                                className="relative h-36 w-36 rounded-full"
                                style={{
                                    background: "conic-gradient(#1d4ed8 0% 80%, #e5e7eb 80% 100%)",
                                }}
                            >
                                <div className="absolute inset-5 rounded-full bg-white" />
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-500">
                                    80%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <span className="h-2 w-2 rounded-full bg-orange-400" />
                        <span>Defect Distribution</span>
                    </div>
                    <div className="mt-6 grid grid-cols-[1.2fr_1fr] items-center gap-6">
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                            {defectRows.map((row) => (
                                <div key={row.label} className="flex items-center gap-2">
                                    <span className={`h-2 w-2 rounded-full ${row.color}`} />
                                    <span>{row.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            <div
                                className="relative h-36 w-36 rounded-full"
                                style={{
                                    background: `conic-gradient(${defectRows
                                        .map((row, idx) => `${row.donut} ${idx * 10}% ${(idx + 1) * 10}%`)
                                        .join(", ")})`,
                                }}
                            >
                                <div className="absolute inset-5 rounded-full bg-white" />
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-500">
                                    10%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <span className="h-2 w-2 rounded-full bg-gray-800" />
                    <span>Daily Inspections</span>
                </div>

                <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-6">
                    <div className="flex items-center justify-center gap-8">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[11px] text-blue-700">OK Inspections</span>
                            <div className="h-40 w-36 rounded-md bg-blue-700" />
                            <span className="text-[11px] text-gray-500">{dailyInspections.ok}</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[11px] text-gray-500">NG Inspections</span>
                            <div className="h-40 w-36 rounded-md bg-gray-600" />
                            <span className="text-[11px] text-gray-500">{dailyInspections.ng}</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-[11px] text-gray-400">{dailyInspections.date}</div>
                    <div className="mt-4 h-2 rounded-full bg-blue-100" />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsScreen;
