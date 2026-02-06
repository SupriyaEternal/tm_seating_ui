const reportRows = [
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

const ReportsScreen = () => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">Reports</h1>
                    <div className="mt-2 flex gap-4 text-xs text-gray-500">
                        <button className="font-semibold text-blue-700">All Shifts</button>
                        <button>Shift A</button>
                        <button>Shift B</button>
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                        <span>Search by INSPECTION ID or PART ID</span>
                    </div>
                    <button className="rounded-md border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-600">
                        Export
                    </button>
                    <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600">
                        <span>Start date</span>
                        <span className="text-gray-400">—</span>
                        <span>End date</span>
                    </div>
                    <button className="rounded-md border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-600">
                        Generate
                    </button>
                    <button className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-500">
                        ↻
                    </button>
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
                        {reportRows.map((row) => (
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

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>Page 1 of 1</span>
                    <div className="flex items-center gap-2">
                        <span className="rounded-md bg-blue-600 px-2 py-1 text-white">1</span>
                        <span>Go to</span>
                        <span className="rounded-md border border-gray-200 bg-white px-2 py-1 text-gray-600">Page</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsScreen;
