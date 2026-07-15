import { useEffect, useState, useContext } from "react";

import {
    getBorrowingReport,
    getEquipmentReport,
    getOverdueReport
} from "../services/reportService";

import ReportHeader from "../components/Reports/ReportHeader";
import ReportTabs from "../components/Reports/ReportTabs";
import ReportTable from "../components/Reports/ReportTable";
import { generatePdf } from "../utils/pdfGenerator";
import { FileDown, Printer } from "lucide-react";
import { SearchContext } from "../context/SearchContext";

export default function Reports() {

    const [activeTab, setActiveTab] = useState("borrowings");

    const [reports, setReports] = useState([]);

    const { search } = useContext(SearchContext);

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

            <ReportTabs

                activeTab={activeTab}

                onChange={setActiveTab}

            />

            <div className="flex justify-end">
                

                <div className="flex justify-end gap-3">

                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
                >
                    <FileDown size={18} />
                    Export PDF
                </button>

                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
                >
                    <Printer size={18} />
                    Print
                </button>

            </div>

            </div>

            <ReportTable

                activeTab={activeTab}

                reports={reports}

            />

        </div>

    );

}