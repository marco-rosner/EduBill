import { INVOICE_STATUS } from "@/app/constants";

export const StatusSelect = () => (
    <div className="sm:col-span-6">
        <label
            htmlFor="status"
            className="block text-sm font-medium leading-6 text-gray-900">
            Status
        </label>
        <div className="mt-2">
            <select
                id="status"
                name="status"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
                {INVOICE_STATUS.map((status, i) => (
                    <option key={i}>{status}</option>
                ))}
            </select>
        </div>
    </div>
)