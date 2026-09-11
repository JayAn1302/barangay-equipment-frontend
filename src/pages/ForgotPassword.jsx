import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../services/authService";
import Seal from "../components/Seal";
import { Lock, ArrowRight, KeyRound } from "lucide-react";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1 = enter username, 2 = enter token + new password
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleRequestReset = async () => {
        try {
            setLoading(true);
            setError("");
            const result = await forgotPassword(username);
            setMessage(result.message);
            // NOTE: token is only returned because there's no email service yet.
            // Once email sending is added, remove this and step 2 becomes its own page
            // reached via the emailed link instead.
            if (result.resetToken) {
                setToken(result.resetToken);
            }
            setStep(2);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        try {
            setLoading(true);
            setError("");
            await resetPassword(username, token, newPassword);
            navigate("/login");
        } catch {
            setError("Invalid or expired reset token.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid min-h-screen place-items-center bg-[#0c1730] px-6 text-white">
            <div className="w-full max-w-[380px]">
                <div className="flex items-center gap-4">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white/[0.06] ring-1 ring-[#b0892d]/40">
                        <Seal size={52} tone="gold" />
                    </div>
                    <div className="leading-tight">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b0892d]">
                            Barangay EBMS
                        </p>
                        <h1 className="mt-1 font-serif text-xl font-semibold tracking-tight">
                            Reset Password
                        </h1>
                    </div>
                </div>

                {step === 1 && (
                    <div className="mt-8 space-y-4">
                        <p className="text-sm text-white/55">
                            Enter your username and we'll generate a reset code.
                        </p>
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-white/60">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="w-full rounded-[10px] border border-white/15 bg-white/[0.04] px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-[#b0892d]/60"
                            />
                        </div>

                        {error && (
                            <p className="rounded-lg border border-[#b3341f]/30 bg-[#b3341f]/10 px-3 py-2 text-sm text-[#f6a99b]">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={handleRequestReset}
                            disabled={loading || !username}
                            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#b0892d] py-3 text-sm font-semibold text-[#14213d] transition-all hover:brightness-110 disabled:opacity-60"
                        >
                            {loading ? "Sending…" : <>Send reset code <ArrowRight size={18} /></>}
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="mt-8 space-y-4">
                        {message && (
                            <p className="rounded-lg border border-[#b0892d]/30 bg-[#b0892d]/10 px-3 py-2 text-sm text-white/70">
                                {message}
                            </p>
                        )}

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-white/60">
                                Reset code
                            </label>
                            <div className="flex items-center overflow-hidden rounded-[10px] border border-white/15 bg-white/[0.04]">
                                <div className="px-4 text-[#b0892d]"><KeyRound size={18} /></div>
                                <input
                                    type="text"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    placeholder="Paste your reset code"
                                    className="flex-1 bg-transparent py-3 pr-4 text-sm outline-none placeholder:text-white/35"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-white/60">
                                New password
                            </label>
                            <div className="flex items-center overflow-hidden rounded-[10px] border border-white/15 bg-white/[0.04]">
                                <div className="px-4 text-[#b0892d]"><Lock size={18} /></div>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter a new password"
                                    className="flex-1 bg-transparent py-3 pr-4 text-sm outline-none placeholder:text-white/35"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="rounded-lg border border-[#b3341f]/30 bg-[#b3341f]/10 px-3 py-2 text-sm text-[#f6a99b]">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={handleResetPassword}
                            disabled={loading || !token || !newPassword}
                            className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#b0892d] py-3 text-sm font-semibold text-[#14213d] transition-all hover:brightness-110 disabled:opacity-60"
                        >
                            {loading ? "Resetting…" : "Reset password"}
                        </button>
                    </div>
                )}

                <button
                    onClick={() => navigate("/login")}
                    className="mt-6 w-full text-center text-sm text-white/40 hover:text-white/60"
                >
                    Back to login
                </button>
            </div>
        </div>
    );
}