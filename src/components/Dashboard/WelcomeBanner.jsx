export default function WelcomeBanner({
    greeting,
    currentTime,
    overdueBorrowings
}) {

   
    return (

        <div className="h-[88px] rounded-3xl px-8 flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-600 shadow-lg">

            <div>

                <h1 className="text-[28px] font-bold text-white leading-none">
                    {greeting}, System Administrator! 👋
                </h1>

                <p className="mt-1 text-blue-100 text-sm">
                    {currentTime.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    })}
                    {" • "}
                    {currentTime.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        second: "2-digit"
                    })}
                </p>

            </div>

            <div className="bg-pink-500/30 h-12 px-6 rounded-2xl flex items-center">

                <p className="font-semibold text-sm text-white whitespace-nowrap">

                    ⚠ 2 overdue items need attention

                </p>

            </div>

        </div>

    );

}