import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import hypervise_login from "../../assets/images/hypervise_login.png";
import { useAuth } from "../../contexts/AuthContext";
import type { LoginFormData } from "../../types/user";

const LoginPage = () => {

    const navigate = useNavigate();
    const { Login, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoading(true);
            console.log("The Login Form Data: ", data);
            await Login(data.user_email, data.user_password);
            message.success("Login successful!");
            navigate("/user-selection");
        } 
        catch (error) {
            message.error("Login failed. Please check your credentials.");
            console.error("Login error:", error);
        } 
        finally {
            setLoading(false);
        }
    };

    useEffect(()=>{

        if(isAuthenticated){

            navigate("/user-selection")
        }

    }, [])

    return (
        <>
            <div className="flex h-screen">
                
                <div className="flex-1 hidden md:flex items-center justify-center bg-[#1e2d5b]">
                    <img
                        src={hypervise_login}
                        alt="Hypervise"
                        className="max-w-md object-contain"
                    />
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md p-8 bg-white">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Hi There!
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Welcome back to Hypervise Dashboard
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            
                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-700 text-lg font-medium">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className={`border ${errors.user_email ? 'border-red-500  ' : 'border-gray-300'} rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    {...register("user_email", {
                                        required: "Please enter your email.",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Please enter a valid email address.",
                                        },
                                    })}
                                />
                                {errors.user_email && (
                                    <p className="text-red-500 text-xs font-semibold">
                                        *{errors.user_email.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-700 text-lg font-medium">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className={`w-full border ${errors.user_password ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        {...register("user_password", {
                                            required: "Please enter your password.",
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none text-lg"
                                    >
                                        {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                    </button>
                                </div>
                                {errors.user_password && (
                                    <p className="text-red-500 text-xs font-semibold">
                                        *{errors.user_password.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full cursor-pointer bg-[#2b4d94] text-white py-2 rounded-lg hover:bg-[#1c315e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                            >
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        
        </>
    );
};

export default LoginPage;
