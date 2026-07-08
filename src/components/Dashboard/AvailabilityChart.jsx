import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function AvailabilityChart({ dashboard }) {

    const data = {

        labels: [
            "Available",
            "Borrowed",
            "Maintenance"
        ],

        datasets: [

            {

                data: [

                    dashboard.availableEquipment,

                    dashboard.borrowedEquipment,

                    dashboard.maintenanceEquipment

                ],

                backgroundColor: [

                    "#2563eb",

                    "#22c55e",

                    "#ef4444"

                ],

                borderWidth: 0

            }

        ]

    };

   return (

    <div className="bg-white rounded-3xl shadow h-[310px] p-6">

        <h2 className="text-2xl font-bold mb-5">

            Equipment Availability

        </h2>

        <div className="flex justify-between items-center h-[220px]">

            {/* LEFT SIDE */}

            <div className="flex flex-col justify-between h-full w-[45%]">

                <div className="space-y-4">

                    <LegendItem
                        color="bg-blue-600"
                        title="Available"
                        value={dashboard.availableEquipment}
                    />

                    <LegendItem
                        color="bg-green-500"
                        title="Borrowed"
                        value={dashboard.borrowedEquipment}
                    />

                    <LegendItem
                        color="bg-red-500"
                        title="Maintenance"
                        value={dashboard.maintenanceEquipment}
                    />

                </div>

                <div className="pt-4 border-t">

                    <p className="text-gray-500 uppercase text-sm">

                        Total Equipment

                    </p>

                    <h1 className="text-4xl font-bold">

                        {dashboard.totalEquipment}

                    </h1>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="w-[50%] flex justify-center">

                <div className="w-52">

                    <Doughnut
                        data={data}
                        options={{
                            cutout: "70%",
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />

                </div>

            </div>

        </div>

    </div>

);

}
function LegendItem({
    color,
    title,
    value
}) {

    return (

        <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">

                <div className={`w-3 h-3 rounded-full ${color}`}></div>

                <span className="text-[16px] text-slate-600">

                    {title}

                </span>

            </div>

            <span className="font-semibold text-slate-700">

                {value}

            </span>

        </div>

    );



}