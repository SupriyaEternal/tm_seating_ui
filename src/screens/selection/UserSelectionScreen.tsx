import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/layout/Navbar";

const UserSelectionPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const canDashboard =
        user?.user_access === "Super Admin" ||
        user?.user_access === "Admin";

    const canMasterCopy = user?.user_access === "Super Admin";

    const canDataCollection =
        user?.user_access === "Super Admin" ||
        user?.user_access === "Admin";

    const buttonClass = `
        w-full
        rounded-xl
        bg-[#2b4d94]
        px-6
        py-3.5
        text-white
        font-semibold
        shadow-sm
        hover:bg-[#243f7a]
        hover:shadow-md
        transition-all
        duration-200
        cursor-pointer
        active:scale-[0.99]
    `;

    return (
        <>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-white to-blue-50">
                <Navbar />
        
                <div className="flex flex-1 items-center justify-center px-4 py-10">
                <div className="w-full max-w-2xl rounded-2xl border border-gray-100 bg-white/90 p-8 shadow-xl backdrop-blur">
                    
                    <div className="mb-8 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                            Quick Start
                        </p>
                        <h1 className="mt-2 text-2xl font-bold text-gray-900">
                            Choose a Workspace
                        </h1>
                        
                        <p className="mt-2 text-sm text-gray-500">
                            Select where you want to go next to continue
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate("/user-inspection-mode-selection")}
                            className={buttonClass}
                        >
                            Inspection
                        </button>

                        {canDashboard && (
                            <button
                                onClick={() => navigate("/dashboard")}
                                className={buttonClass}
                            >
                                Analytics Dashboard
                            </button>
                        )}

                        {canMasterCopy && (
                            <button
                                className={buttonClass}
                            >
                                Master Copy
                            </button>
                        )}

                        {canDataCollection && (
                            <button
                                onClick={() => navigate("/data-collection")}
                                className={buttonClass}
                            >
                                Data Collection
                            </button>
                        )}
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <span className="h-px w-12 bg-gray-200" />
                        <span>Hypervise Dashboard</span>
                        <span className="h-px w-12 bg-gray-200" />
                    </div>
                </div>
                </div>
            </div>
        
        </>
    );
};

export default UserSelectionPage;
