import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


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
    }
    catch (err) {
        setError("Invalid username or password.");
    }
    finally {
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-blue-600 flex items-center justify-center">

            <div className="bg-white w-96 rounded-xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center text-blue-600">
                    Barangay Equipment
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">
                    Borrowing Management System
                </p>

                <div className="space-y-5">

                    <div>
                        <label className="font-medium">
                            Username
                        </label>

                        <input
                            type="text"
                            className="border w-full rounded-lg p-3 mt-2"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            className="border w-full rounded-lg p-3 mt-2"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {
                        error &&
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    }

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="bg-blue-600 text-white w-full p-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </div>

            </div>

        </div>
    );
}