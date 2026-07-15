export default function WelcomeBanner({
    greeting,
    currentTime,
    overdueBorrowings
}) {

    const fullName =
        localStorage.getItem("fullName") || "Administrator";

    return (

        <div className="h-[88px] rounded-3xl px-8 flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-600 shadow-lg">

            <div>

                <h1 className="text-[28px] font-bold text-white leading-none">
                    {greeting}, {fullName}! 👋
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

                    <div
                className={`h-12 px-6 rounded-2xl flex items-center ${
                    overdueBorrowings > 0
                        ? "bg-pink-500/30"
                        : "bg-green-500/30"
                }`}
            >
                <p className="font-semibold text-sm text-white whitespace-nowrap">

                    {overdueBorrowings > 0
                        ? `⚠ ${overdueBorrowings} overdue item${overdueBorrowings !== 1 ? "s" : ""} need${overdueBorrowings === 1 ? "s" : ""} attention`
                        : "✅ No overdue borrowings today"}

                </p>
            </div>

        </div>

    );

}