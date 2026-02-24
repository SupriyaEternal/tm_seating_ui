import { CheckCircleOutlined, CloseCircleOutlined, PieChartOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import dayjs from "dayjs";

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

// Mock confusion matrix: rows = Actual (Ground Truth), cols = Predicted
// [Actual OK, Pred OK], [Actual OK, Pred NG], [Actual NG, Pred OK], [Actual NG, Pred NG]
// → True Negative, False Positive, False Negative, True Positive (treating NG as positive)
const defaultConfusionMatrix = {
    tn: 6, // Actual OK, Predicted OK
    fp: 2, // Actual OK, Predicted NG (false alarm)
    fn: 1, // Actual NG, Predicted OK (missed defect)
    tp: 1, // Actual NG, Predicted NG
};

const AnalyticsScreen = () => {
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
        dayjs().subtract(7, "day"),
        dayjs(),
    ]);
    const [confusionMatrix] = useState(defaultConfusionMatrix);

    const accuracy =
        confusionMatrix.tn + confusionMatrix.fp + confusionMatrix.fn + confusionMatrix.tp > 0
            ? (
                  (100 *
                      (confusionMatrix.tp + confusionMatrix.tn)) /
                  (confusionMatrix.tp + confusionMatrix.tn + confusionMatrix.fp + confusionMatrix.fn)
              ).toFixed(1)
            : "—";
    const precision =
        confusionMatrix.tp + confusionMatrix.fp > 0
            ? (100 * (confusionMatrix.tp / (confusionMatrix.tp + confusionMatrix.fp))).toFixed(1)
            : "—";
    const recall =
        confusionMatrix.tp + confusionMatrix.fn > 0
            ? (100 * (confusionMatrix.tp / (confusionMatrix.tp + confusionMatrix.fn))).toFixed(1)
            : "—";

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
                <DatePicker.RangePicker
                    value={dateRange}
                    onChange={(dates) => setDateRange(dates ?? [null, null])}
                    size="small"
                    className="text-xs"
                    format="YYYY-MM-DD"
                />
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

            {/* Confusion Matrix — wireframe: date range filters the data used to compute the matrix */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        <span>Confusion Matrix</span>
                        <span className="text-gray-400">(Date range applied above)</span>
                    </div>
                </div>

                {/* <div className="mt-3 rounded-lg border border-amber-100 bg-amber-50/80 p-3 text-[11px] text-amber-900">
                    <div className="flex items-start gap-2">
                        <InfoCircleOutlined className="mt-0.5 shrink-0 text-amber-600" />
                        <div className="space-y-1">
                            <p className="font-semibold">What is needed to calculate the confusion matrix</p>
                            <ul className="list-inside list-disc space-y-0.5 text-amber-800">
                                <li><strong>Ground truth</strong> — e.g. from the &quot;Ground Truth&quot; column in Inspection Details, or human OK/NG label per inspection.</li>
                                <li><strong>Predicted result</strong> — system/ML output per inspection (OK or NG).</li>
                                <li>One row per inspection with (actual_label, predicted_label), optionally <strong>filtered by date range</strong> (and shift, camera, defect type).</li>
                            </ul>
                            <p className="font-semibold pt-1">What you can do with it</p>
                            <ul className="list-inside list-disc space-y-0.5 text-amber-800">
                                <li><strong>Date range</strong> — Select start/end date to include only inspections in that period.</li>
                                <li><strong>Metrics</strong> — Accuracy, Precision, Recall (and F1) from the matrix counts.</li>
                                <li><strong>Model performance</strong> — Compare predicted vs actual to tune thresholds or retrain.</li>
                            </ul>
                        </div>
                    </div>
                </div> */}

                <div className="mt-4 flex flex-wrap items-start gap-6">
                    <div>
                        <p className="mb-2 text-[11px] font-semibold text-gray-500">Actual (Ground Truth) → Predicted</p>
                        <table className="border-collapse rounded-lg border border-gray-200 text-center text-xs">
                            <thead>
                                <tr className="bg-gray-100 text-gray-600">
                                    <th className="w-16 border border-gray-200 p-2"></th>
                                    <th className="w-20 border border-gray-200 p-2">Pred OK</th>
                                    <th className="w-20 border border-gray-200 p-2">Pred NG</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-200 bg-gray-50 p-1.5 text-left text-[11px] font-medium text-gray-600">Actual OK</td>
                                    <td className="border border-gray-200 p-3 font-semibold text-green-700">{confusionMatrix.tn}</td>
                                    <td className="border border-gray-200 p-3 font-semibold text-orange-600">{confusionMatrix.fp}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-200 bg-gray-50 p-1.5 text-left text-[11px] font-medium text-gray-600">Actual NG</td>
                                    <td className="border border-gray-200 p-3 font-semibold text-orange-600">{confusionMatrix.fn}</td>
                                    <td className="border border-gray-200 p-3 font-semibold text-red-700">{confusionMatrix.tp}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="mt-1.5 text-[10px] text-gray-400">TN · FP · FN · TP</p>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-xs">
                        <p className="mb-2 font-semibold text-gray-700">Derived metrics</p>
                        <div className="space-y-1.5 text-gray-600">
                            <p><span className="font-medium">Accuracy:</span> {accuracy}%</p>
                            <p><span className="font-medium">Precision:</span> {precision}%</p>
                            <p><span className="font-medium">Recall:</span> {recall}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsScreen;
