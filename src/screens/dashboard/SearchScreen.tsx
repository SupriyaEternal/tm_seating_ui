const searchResults = [
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

const SearchScreen = () => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-gray-800">Search</h1>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="grid grid-cols-4 gap-4 text-xs text-gray-600">
                    <div>
                        <p className="text-[10px] uppercase text-gray-400">Inspection ID:</p>
                        <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                            Enter Inspection ID
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase text-gray-400">FG PART NUMBER:</p>
                        <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                            Enter FG PART NUMBER
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase text-gray-400">Shift:</p>
                        <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                            Search by Shift
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase text-gray-400">Status:</p>
                        <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                            Search by Status
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase text-gray-400">Date Range:</p>
                        <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                            Start date — End date
                        </div>
                    </div>
                    <div className="col-span-3 flex items-end justify-end gap-3">
                        <button className="rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600">
                            Reset
                        </button>
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white">
                            Filter results
                        </button>
                    </div>
                </div>

                <table className="mt-6 w-full text-[11px]">
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
                        {searchResults.map((row) => (
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

export default SearchScreen;
