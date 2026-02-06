import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LineChartOutlined, SearchOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/layout/Navbar";
import Home_Blue from "../assets/svgs/home-blue.svg";
import Home_Black from "../assets/svgs/home-black.svg";
import Reports_Blue from "../assets/svgs/reports-blue.svg";
import Reports_Black from "../assets/svgs/reports-black.svg";
import Configure_Dark from "../assets/svgs/Configure_Dark.svg";
import Configure_Light from "../assets/svgs/Configure_Light.svg";
import Analytics_Dark from "../assets/svgs/Analytics_Dark.svg";
import Analytics_Light from "../assets/svgs/Analytics_Light.svg";

interface MenuItem {
    name: string;
    path: string;
    activeIcon?: string;
    icon?: string;
    show: boolean;
    customIcon?: React.ReactNode;
}

const DashboardLayout = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { Logout } = useAuth();

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const isActive = (path: string): boolean => location.pathname === path;

    const handleLogout = async () => {
        try {
            await Logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const menuItems: MenuItem[] = [
        {
            name: "Overview",
            path: "/dashboard",
            activeIcon: Home_Blue,
            icon: Home_Black,
            show: true,
        },
        {
            name: "Analytics",
            path: "/dashboard/analytics",
            activeIcon: Analytics_Dark,
            icon: Analytics_Light,
            show: true,
        },
        {
            name: "Process Control",
            path: "/dashboard/process-control",
            show: true,
            customIcon: (
                <LineChartOutlined
                    className={`text-xl ${
                        isActive("/dashboard/process-control") ? "text-blue-700" : "text-gray-400"
                    }`}
                />
            ),
        },
        {
            name: "Reports",
            path: "/dashboard/reports",
            activeIcon: Reports_Blue,
            icon: Reports_Black,
            show: true,
        },
        {
            name: "Configure",
            path: "/dashboard/configure",
            activeIcon: Configure_Dark,
            icon: Configure_Light,
            show: true, 
        },
        {
            name: "Search",
            path: "/dashboard/search",
            show: true,
            customIcon: (
                <SearchOutlined
                    className={`text-xl ${
                        isActive("/dashboard/search") ? "text-blue-700" : "text-gray-400"
                    }`}
                />
            ),
        },
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
            <Navbar />

            <div className="flex flex-1 overflow-hidden">

                <aside
                    className={`${
                        sidebarOpen ? "w-72" : "w-16"
                    } bg-white shadow-md transition-all duration-300 flex flex-col justify-between`}
                >
                    <div className="mt-8 flex flex-col gap-5 px-3">
                        {menuItems.map(
                            (item, i) =>
                                item.show && (
                                    <div
                                        key={i}
                                        onClick={() => navigate(item.path)}
                                        className={`flex items-center gap-3 cursor-pointer px-3 py-3 rounded-xl transition-all
                                            ${
                                                isActive(item.path)
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "hover:bg-gray-100"
                                            }
                                        `}
                                    >
                                        {item.customIcon ? (
                                            item.customIcon
                                        ) : (
                                            <img
                                                src={
                                                    isActive(item.path)
                                                        ? item.activeIcon
                                                        : item.icon
                                                }
                                                alt={item.name}
                                                className="w-6 h-6"
                                            />
                                        )}

                                        {sidebarOpen && (
                                            <p className="font-medium">{item.name}</p>
                                        )}
                                    </div>
                                )
                        )}
                    </div>

                    <div
                        onClick={handleLogout}
                        className="m-4 p-3 flex items-center gap-3 cursor-pointer rounded-xl text-red-600 hover:bg-red-50"
                    >
                        <LogoutOutlined className="text-xl" />
                        {sidebarOpen && <p className="font-medium">Sign Out</p>}
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;