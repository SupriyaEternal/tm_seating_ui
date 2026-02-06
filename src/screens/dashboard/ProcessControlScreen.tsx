const controlStats = [
    { label: "USL = 100", color: "text-green-600" },
    { label: "LSL = 99.9767", color: "text-green-600" },
    { label: "Sigma = -", color: "text-gray-500" },
    { label: "UCL = -", color: "text-gray-500" },
    { label: "LCL = -", color: "text-gray-500" },
    { label: "AVG ACC = -", color: "text-red-500" },
    { label: "CP = -", color: "text-green-600" },
    { label: "CPK = -", color: "text-green-600" },
];

const ProcessControlScreen = () => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">Process Control</h1>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
                    <span>2026-02-06</span>
                    <span className="text-gray-400">—</span>
                    <span>2026-02-06</span>
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div>
                    <p className="text-sm font-semibold text-gray-800">Inspection Control Chart</p>
                    <p className="text-xs text-gray-500">Accuracy v/s Time</p>
                </div>

                <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-6">
                    <div className="relative h-52 w-full rounded-md border border-gray-200 bg-white">
                        <div className="absolute left-10 right-10 top-1/2 h-px bg-gray-300" />
                        <div className="absolute left-12 top-[42%] text-[10px] text-green-600">Upper Control Limit - 0</div>
                        <div className="absolute left-12 top-[50%] text-[10px] text-blue-600">Mean - 0</div>
                        <div className="absolute left-12 top-[58%] text-[10px] text-red-600">Lower Control Limit - 0</div>
                    </div>

                    <div className="mt-4 h-8 rounded-md border border-blue-100 bg-blue-50">
                        <div className="h-full w-1/3 rounded-md bg-blue-200" />
                    </div>

                    <div className="mt-6">
                        <p className="text-xs font-semibold text-gray-700">Detailed Info</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                            {controlStats.map((item) => (
                                <span
                                    key={item.label}
                                    className={`rounded-md border border-gray-100 bg-white px-3 py-1 ${item.color}`}
                                >
                                    {item.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProcessControlScreen;
