import { useEffect, useState, useContext } from "react";

import {
    getBorrowingReport,
    getEquipmentReport,
    getOverdueReport
} from "../services/reportService";
import ReportStats from "../components/Reports/ReportStats";
import ReportHeader from "../components/Reports/ReportHeader";
import ReportTabs from "../components/Reports/ReportTabs";
import ReportTable from "../components/Reports/ReportTable";
import { generatePdf } from "../utils/pdfGenerator";
import { FileDown, Printer } from "lucide-react";


export default function Reports() {

    const [activeTab, setActiveTab] = useState("borrowings");

    const [reports, setReports] = useState([]);
    const [search, setSearch] = useState("");
   

    useEffect(() => {

        loadReports(activeTab);

    }, [activeTab]);

    async function loadReports(type) {

        let data = [];

        if (type === "borrowings") {

            data = await getBorrowingReport();

        }

        else if (type === "equipment") {

            data = await getEquipmentReport();

        }

        else {

            data = await getOverdueReport();

        }

        setReports(data);

    }

    function handleExport() {

    if (activeTab === "borrowings") {

        generatePdf(

            "Borrowing Report",

            [
                "Reference",
                "Borrower",
                "Equipment",
                "Quantity",
                "Borrow Date",
                "Expected Return",
                "Status"
            ],

            reports.map(item => [

                item.referenceNo,

                item.borrower,

                item.equipment,

                item.quantity,

                item.borrowDate,

                item.expectedReturnDate,

                item.status

            ])

        );

    }

    else if (activeTab === "equipment") {

        generatePdf(

            "Equipment Report",

            [
                "Equipment",
                "Category",
                "Total",
                "Available",
                "Borrowed",
                "Status"
            ],

            reports.map(item => [

                item.equipment,

                item.category,

                item.totalQuantity,

                item.availableQuantity,

                item.borrowedQuantity,

                item.status

            ])

        );

    }

    else {

        generatePdf(

            "Overdue Report",

            [
                "Reference",
                "Borrower",
                "Equipment",
                "Quantity",
                "Due Date",
                "Days Overdue"
            ],

            reports.map(item => [

                item.referenceNo,

                item.borrower,

                item.equipment,

                item.quantity,

                item.dueDate,

                item.daysOverdue

            ])

        );

    }

}
function handlePrint() {

    if (activeTab === "borrowings") {

        generatePdf(
            "Borrowing Report",
            [
                "Reference",
                "Borrower",
                "Equipment",
                "Quantity",
                "Borrow Date",
                "Expected Return",
                "Status"
            ],
            reports.map(item => [
                item.referenceNo,
                item.borrower,
                item.equipment,
                item.quantity,
                item.borrowDate,
                item.expectedReturnDate,
                item.status
            ]),
            true
        );

    }

    else if (activeTab === "equipment") {

        generatePdf(
            "Equipment Report",
            [
                "Equipment",
                "Category",
                "Total",
                "Available",
                "Borrowed",
                "Status"
            ],
            reports.map(item => [
                item.equipment,
                item.category,
                item.totalQuantity,
                item.availableQuantity,
                item.borrowedQuantity,
                item.status
            ]),
            true
        );

    }

    else {

        generatePdf(
            "Overdue Report",
            [
                "Reference",
                "Borrower",
                "Equipment",
                "Quantity",
                "Due Date",
                "Days Overdue"
            ],
            reports.map(item => [
                item.referenceNo,
                item.borrower,
                item.equipment,
                item.quantity,
                item.dueDate,
                item.daysOverdue
            ]),
            true
        );

    }

}

    return (

        <div className="space-y-6">

            <ReportHeader />

            <ReportStats
    reports={reports}
    activeTab={activeTab}
/>

            <ReportTabs

                activeTab={activeTab}

                onChange={setActiveTab}

            />

            <div className="flex justify-end">
                

                <div className="flex justify-end gap-3">

                <div className="flex items-center gap-3">

    <button
        onClick={handleExport}
        className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink shadow-sm transition-all hover:border-royal hover:bg-ground"
    >
        <FileDown
            size={17}
            className="text-navy"
        />

        Export PDF

    </button>

    <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-royal active:translate-y-px"
    >
        <Printer size={17} />

        Print

    </button>

</div>
            </div>

            </div>

            <ReportTable

                activeTab={activeTab}

                reports={reports}

            />

        </div>

    );

}