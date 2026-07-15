import { Search } from "lucide-react";

export default function BorrowingSearch({

    value,
    onChange

}) {

    return (

        <div className="bg-white rounded-2xl shadow p-4">

            <div className="relative">

                <Search
                    className="absolute left-4 top-3 text-slate-400"
                    size={20}
                />

                <input

                    value={value}

                    onChange={onChange}

                    placeholder="Search Borrower or Equipment..."

                    className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none"

                />

            </div>

        </div>

    );

}