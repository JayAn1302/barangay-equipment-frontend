import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import Seal from "../components/Seal";
import loginImage from "../assets/barangay-login.jpg";

import { User, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";

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
        <div className="grid min-h-screen bg-[#0c1730] lg:grid-cols-[52%_48%]">

            {/* ================= LEFT — form ================= */}
            <div className="relative flex items-center justify-center overflow-hidden px-6 py-10 text-white">

                {/* Seal watermark */}
                <div className="pointer-events-none absolute -left-16 -top-16 opacity-[0.05]">
                    <Seal size={420} tone="mono" className="text-white" />
                </div>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b0892d]/60 to-transparent" />

                <div className="fade-up relative w-full max-w-[380px]">

                    {/* Masthead */}
                    <div className="flex items-center gap-4">
                        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white/[0.06] ring-1 ring-[#b0892d]/40">
                            <Seal size={52} tone="gold" />
                        </div>
                        <div className="leading-tight">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b0892d]">
                                Barangay EBMS
                            </p>
                            <h1 className="mt-1 font-serif text-xl font-semibold tracking-tight">
                                Sta. Filomena
                            </h1>
                            <p className="text-sm text-white/50">Dipolog City</p>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="mt-9">
                        <h2 className="font-serif text-4xl font-semibold tracking-tight">
                            Welcome back
                        </h2>
                        <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#b0892d] to-transparent" />
                        <p className="mt-4 text-sm leading-relaxed text-white/55">
                            Manage, borrow, and monitor barangay equipment with
                            security and accountability.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="mt-8 space-y-4">
                        {/* Username */}
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-white/60">
                                Username
                            </label>
                            <div className="flex items-center overflow-hidden rounded-[10px] border border-white/15 bg-white/[0.04] transition focus-within:border-[#b0892d]/60 focus-within:ring-2 focus-within:ring-[#b0892d]/20">
                                <div className="px-4 text-[#b0892d]">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    className="flex-1 bg-transparent py-3 pr-4 text-sm outline-none placeholder:text-white/35"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-white/60">
                                Password
                            </label>
                            <div className="flex items-center overflow-hidden rounded-[10px] border border-white/15 bg-white/[0.04] transition focus-within:border-[#b0892d]/60 focus-within:ring-2 focus-within:ring-[#b0892d]/20">
                                <div className="px-4 text-[#b0892d]">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-white/35"
                                />
                                <button
                                    type="button"
                                    className="px-4 text-white/50 transition hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="rounded-lg border border-[#b3341f]/30 bg-[#b3341f]/10 px-3 py-2 text-sm text-[#f6a99b]">
                                {error}
                            </p>
                        )}

                        {/* Remember */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-white/60">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={() => setRemember(!remember)}
                                    className="accent-[#b0892d]"
                                />
                                Remember me
                            </label>
                            <button className="text-sm text-[#b0892d] transition hover:underline">
                                Forgot password?
                            </button>
                        </div>

                        {/* Login */}
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#b0892d] py-3 text-sm font-semibold text-[#14213d] shadow-sm transition-all hover:brightness-110 active:translate-y-px disabled:opacity-60"
                        >
                            {loading ? (
                                "Logging in…"
                            ) : (
                                <>
                                    Login
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8">
                        <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                            <ShieldCheck size={15} />
                            Barangay Staff Access Only
                        </div>
                        <p className="mt-4 text-center text-xs text-white/30">
                            © 2026 Barangay Equipment Borrowing &amp; Monitoring System
                        </p>
                        <p className="text-center text-xs text-white/25">Version 12.0</p>
                    </div>
                </div>
            </div>

            {/* ================= RIGHT — image ================= */}
            <div className="relative hidden lg:block">
                <img
                    src={loginImage}
                    alt="Barangay Hall"
                    className="h-full w-full object-cover object-[center_72%]"
                />
                {/* navy wash so the photo sits inside the palette */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#14213d]/20 to-[#0c1730]/60" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
        </div>
    );
}