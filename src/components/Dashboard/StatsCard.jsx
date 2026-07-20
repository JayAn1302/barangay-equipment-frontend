export default function StatsCard({

    title,
    value,
    subtitle,
    icon,
    color

}) {

    return (

        <div className="bg-white rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 h-[180px] px-5 py-6 flex">

            <div className="flex justify-between items-start w-full h-full">

                {/* LEFT */}

                <div className="flex flex-col h-full">

                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>

                        {icon}

                    </div>

                    <h1
                        style={{
                            fontSize: "40px",
                            fontWeight: "bold",
                            color: "red"
                        }}
                    >
                        {value}
                    </h1>

                    <p className="text-slate-600 dark:text-slate-300 mt-1 font-medium text-[14px]">

                        {title}

                    </p>

                    <p className="text-green-600 dark:text-green-400 text-[11px] mt-1 whitespace-nowrap overflow-hidden text-ellipsis">

                        {subtitle}

                    </p>

                </div>

                {/* RIGHT MINI GRAPH */}

                <div className="flex items-end gap-1 pb-1">

                    <div className="w-[6px] h-4 rounded-full bg-blue-200"></div>
                    <div className="w-[6px] h-6 rounded-full bg-blue-300"></div>
                    <div className="w-[6px] h-8 rounded-full bg-blue-300"></div>
                    <div className="w-[6px] h-10 rounded-full bg-blue-400"></div>
                    <div className="w-[6px] h-13 rounded-full bg-blue-400"></div>
                    <div className="w-[6px] h-16 rounded-full bg-blue-500"></div>
                    <div className="w-[6px] h-19 rounded-full bg-blue-600"></div>

                </div>

            </div>

        </div>

    );

}