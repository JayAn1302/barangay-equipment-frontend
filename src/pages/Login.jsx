import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

import barangayLogo from "../assets/barangay-logo.png";
import loginImage from "../assets/barangay-login.jpg";

import {
    User,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    ArrowRight
} from "lucide-react";

export default function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);

    const handleLogin = async () => {

        try {

            setLoading(true);
            setError("");

            const result = await login(username, password);

            localStorage.setItem("token", result.token);
            localStorage.setItem("username", result.username);
            localStorage.setItem("role", result.role);
            localStorage.setItem("fullName", result.fullName);

            navigate("/dashboard");

        } catch {

            setError("Invalid username or password.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="h-screen bg-[#071C24] flex items-center justify-center p-4 overflow-hidden">

            <div className="w-full max-w-[1180px] h-[88vh] max-h-[720px] rounded-[28px] overflow-hidden shadow-2xl grid lg:grid-cols-[42%_58%]">

                {/* ================= LEFT ================= */}

                <div className="bg-gradient-to-br from-[#062631] via-[#041d25] to-[#03161d] text-white px-8 py-6 flex items-center">

                    <div className="max-w-[350px] mx-auto w-full flex flex-col justify-center">

                        {/* LOGO */}

                        <div className="flex items-center gap-3">

                            <img
                                src={barangayLogo}
                                alt="Barangay Logo"
                                className="w-16 h-16 object-contain flex-shrink-0"
                            />

                            <div>

                                <h1 className="text-[24px] font-bold leading-tight">
                                    Barangay Equipment
                                </h1>

                                <p className="text-cyan-400 text-[16px] mt-2">
                                    Borrowing Management System
                                </p>

                            </div>

                        </div>

                        {/* TITLE */}

                        <div className="mt-8">

                            <h2 className="text-[38px] font-bold">

                                Welcome Back!

                            </h2>

                            <div className="w-20 h-1 rounded-full bg-cyan-400 mt-6 mb-6"></div>

                            <p className="text-gray-300 text-[16px] leading-8">

                                Manage, borrow, and monitor barangay equipment
                                with security and accountability.

                            </p>

                        </div>

                        {/* FORM */}

                        <div className="mt-8 space-y-5">

                            {/* Username */}

                            <div>

                                <label className="font-semibold">

                                    Username

                                </label>

                                <div className="mt-2 flex items-center border border-cyan-900 rounded-xl overflow-hidden">

                                    <div className="px-5">

                                        <User
                                            size={22}
                                            className="text-cyan-400"
                                        />

                                    </div>

                                    <input

                                        type="text"

                                        value={username}

                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }

                                        placeholder="Enter your username"

                                        className="flex-1 bg-transparent py-3 pr-5 outline-none placeholder:text-gray-500"

                                    />

                                </div>

                            </div>

                            {/* Password */}

                            <div>

                                <label className="font-semibold">

                                    Password

                                </label>

                                <div className="mt-2 flex items-center border border-cyan-900 rounded-xl overflow-hidden">

                                    <div className="px-5">

                                        <Lock
                                            size={22}
                                            className="text-cyan-400"
                                        />

                                    </div>

                                    <input

                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }

                                        value={password}

                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }

                                        placeholder="Enter your password"

                                        className="flex-1 bg-transparent py-3 pr-5 outline-none placeholder:text-gray-500"

                                    />

                                    <button

                                        type="button"

                                        className="px-5"

                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }

                                    >

                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}

                                    </button>

                                </div>

                            </div>

                            {error && (

                                <p className="text-red-400">

                                    {error}

                                </p>

                            )}

                            {/* Remember */}

                            <div className="flex justify-between items-center">

                                <label className="flex items-center gap-2 text-sm">

                                    <input

                                        type="checkbox"

                                        checked={remember}

                                        onChange={() =>
                                            setRemember(!remember)
                                        }

                                    />

                                    Remember me

                                </label>

                                <button className="text-cyan-400 text-sm hover:underline">

                                    Forgot Password?

                                </button>

                            </div>

                            {/* Login */}

                            <button

                                onClick={handleLogin}

                                disabled={loading}

                                className="w-full py-3 rounded-xl font-bold text-xl bg-gradient-to-r from-cyan-700 to-cyan-500 hover:scale-[1.02] transition flex justify-center items-center gap-3"

                            >

                                {loading ? (
                                    "Logging in..."
                                ) : (
                                    <>
                                        Login
                                        <ArrowRight size={22} />
                                    </>
                                )}

                            </button>

                        </div>

                        {/* FOOTER */}

                        <div className="mt-6">

                            <div className="flex justify-center items-center gap-2 text-gray-400">

                                <ShieldCheck size={18} />

                                Barangay Staff Access Only

                            </div>

                            <p className="text-center text-gray-500 text-sm mt-6">

                                © 2026 Barangay Equipment Borrowing Management System

                            </p>

                            <p className="text-center text-gray-600 text-sm">

                                Version 1.0

                            </p>

                        </div>

                    </div>

                </div>

                {/* ================= RIGHT ================= */}

                <div className="relative">

                    <img

                        src={loginImage}

                        alt="Barangay Hall"

                        className="w-full h-full object-cover object-[center_72%]"

                    />

                    <div className="absolute inset-0 bg-black/20"></div>

                </div>

            </div>

        </div>

    );

}