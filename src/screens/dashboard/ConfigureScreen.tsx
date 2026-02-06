const ConfigureScreen = () => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">Configure</h1>
                </div>
            </div>

            <div className="mt-6 space-y-5">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <span className="h-2 w-2 rounded-full bg-gray-800" />
                            <span>Current Shift Details</span>
                        </div>
                        <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                            Edit
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-6 text-xs text-gray-600">
                        <div>
                            <p className="text-[10px] uppercase text-gray-400">Shift A Timings</p>
                            <p className="mt-1 text-sm font-semibold text-gray-900">08:00 - 20:00</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase text-gray-400">Shift B Timings</p>
                            <p className="mt-1 text-sm font-semibold text-gray-900">20:00 - 08:00</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                            <span className="h-2 w-2 rounded-full bg-gray-800" />
                            <span>Camera Serial Number</span>
                        </div>
                        <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                            Edit
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-5 gap-4 text-xs text-gray-500">
                        {["CAMERA - 1", "CAMERA - 2", "CAMERA - 3", "CAMERA - 4", "CAMERA - 5"].map((label) => (
                            <div key={label} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                                <p className="text-[10px] uppercase text-gray-400">{label}</p>
                                <p className="mt-2 text-sm font-semibold text-gray-800">-</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <span className="h-2 w-2 rounded-full bg-gray-800" />
                        <span>Change Inspection Modes</span>
                    </div>
                    <div className="mt-4 flex items-center gap-10 text-sm text-gray-700">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-gray-600">Maintenance Mode:</span>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" defaultChecked className="peer sr-only" />
                                <div className="peer h-5 w-10 rounded-full bg-gray-200 after:absolute after:left-1 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:bg-blue-600 peer-checked:after:translate-x-5" />
                            </label>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-gray-600">Bypass Mode:</span>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" defaultChecked className="peer sr-only" />
                                <div className="peer h-5 w-10 rounded-full bg-gray-200 after:absolute after:left-1 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:bg-blue-600 peer-checked:after:translate-x-5" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigureScreen;
