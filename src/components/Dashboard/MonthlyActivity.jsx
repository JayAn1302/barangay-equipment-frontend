import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { BarChart3 } from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

export default function MonthlyActivity({ data }) {

    const rows =
        data && data.length
            ? data
            : [
                  { month: "Feb", borrowed: 42, returned: 38 },
                  { month: "Mar", borrowed: 55, returned: 49 },
                  { month: "Apr", borrowed: 61, returned: 58 },
                  { month: "May", borrowed: 48, returned: 52 },
                  { month: "Jun", borrowed: 73, returned: 66 },
                  { month: "Jul", borrowed: 88, returned: 71 },
              ];

    const chartData = {
        labels: rows.map((r) => r.month),

        datasets: [
            {
                label: "Borrowed",
                data: rows.map((r) => r.borrowed),
                backgroundColor: "#1e3a8a",
                borderRadius: 8,
                borderSkipped: false,
                maxBarThickness: 28,
            },
            {
                label: "Returned",
                data: rows.map((r) => r.returned),
                backgroundColor: "#60a5fa",
                borderRadius: 8,
                borderSkipped: false,
                maxBarThickness: 28,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
            mode: "index",
            intersect: false,
        },

        plugins: {

            legend: {

                position: "top",
                align: "end",

                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    color: "#6b6a63",
                    padding: 18,
                    boxWidth: 8,
                    font: {
                        size: 12,
                        weight: "600",
                    },
                },
            },

            tooltip: {
                backgroundColor: "#14213d",
                titleColor: "#fff",
                bodyColor: "#fff",
                padding: 12,
                cornerRadius: 10,
            },
        },

        scales: {

            x: {

                grid: {
                    display: false,
                },

                border: {
                    display: false,
                },

                ticks: {
                    color: "#6b6a63",
                    font: {
                        size: 12,
                    },
                },
            },

            y: {

                beginAtZero: true,

                ticks: {
                    color: "#6b6a63",
                    stepSize: 20,
                },

                border: {
                    display: false,
                },

                grid: {
                    color: "#e7e2d7",
                },
            },
        },
    };

    return (
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm h-full">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal/10">

                        <BarChart3
                            size={20}
                            className="text-royal"
                        />

                    </div>

                    <div>

                        <h2 className="font-serif text-lg font-semibold text-navy">
                            Monthly Borrowing Activity
                        </h2>

                        <p className="text-sm text-muted">
                            Borrowed vs Returned Equipment
                        </p>

                    </div>

                </div>

            </div>

            {/* Chart */}

            <div className="h-[285px]">

                <Bar
                    data={chartData}
                    options={options}
                />

            </div>

        </div>
    );
}