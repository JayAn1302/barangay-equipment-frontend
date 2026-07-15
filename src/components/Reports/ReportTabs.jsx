export default function ReportTabs({

    activeTab,

    onChange

}) {

    return (

        <div className="flex gap-4">

            <button

                onClick={() => onChange("borrowings")}

                className={`px-5 py-2 rounded-xl font-medium
                ${
                    activeTab === "borrowings"

                    ? "bg-blue-600 text-white"

                    : "bg-white border"
                }`}
            >

                Borrowings

            </button>

            <button

                onClick={() => onChange("equipment")}

                className={`px-5 py-2 rounded-xl font-medium
                ${
                    activeTab === "equipment"

                    ? "bg-blue-600 text-white"

                    : "bg-white border"
                }`}
            >

                Equipment

            </button>

            <button

                onClick={() => onChange("overdue")}

                className={`px-5 py-2 rounded-xl font-medium
                ${
                    activeTab === "overdue"

                    ? "bg-blue-600 text-white"

                    : "bg-white border"
                }`}
            >

                Overdue

            </button>

        </div>

    );

}