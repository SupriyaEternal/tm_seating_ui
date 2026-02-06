import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

const MODES = [
    { label: "Manual", route: "/inspection/manual" },
    { label: "Auto", route: "/inspection/auto" },
    { label: "Diagnostic", route: "/inspection/diagnostic" },
];

const UserInspectionModeSelectionScreen = () => {
    const navigate = useNavigate();

    const buttonClass = `
        w-full
        min-h-[72px]
        rounded-xl
        bg-[#2b4d94]
        px-4
        py-3.5
        text-base
        font-semibold
        text-white
        shadow-sm
        hover:bg-[#243f7a]
        hover:shadow-md
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-[#2b4d94]/40
        cursor-pointer
        active:scale-[0.99]
    `;

    return (
        <>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-white to-blue-50">
                <Navbar />

                <div className="flex flex-1 items-center justify-center px-4 py-10">
                <div className="w-full max-w-5xl rounded-2xl border border-gray-100 bg-white/90 p-10 shadow-xl backdrop-blur">
                    <div className="mb-6 flex justify-start">
                        <button
                            onClick={() => navigate("/user-selection")}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                            <span className="text-lg leading-none">←</span>
                            Back to User Selection
                        </button>
                    </div>
                    
                    <div className="mb-10 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
                            Inspection
                        </p>
                        <h1 className="mt-3 text-4xl font-extrabold text-gray-900">
                            Select Operating Mode
                        </h1>
                    
                        <p className="mt-2 text-lg text-gray-600">
                            Please select an operating mode to continue
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                    
                        {MODES.map((mode) => (
                            <button
                            key={mode.label}
                            onClick={() => navigate(mode.route)}
                            className={buttonClass}
                            >
                            {mode.label}
                            </button>
                        ))}
                    </div>

                    <p className="mt-12 text-center text-sm text-gray-500">
                        Choose the appropriate mode based on your task or workflow
                    </p>
                </div>
                </div>
            </div>
        
        </>
    );
};

export default UserInspectionModeSelectionScreen;
