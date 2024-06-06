import { PAYMENT_METHOD } from "@/app/constants";

export const MethodSelect = () => (
    <>
        <div className="sm:col-span-3 flex justify-center items-center">
            <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium leading-6 text-gray-900">
                Payment Method
            </label>
        </div>
        <div className="sm:col-span-3">
            <div className="mt-2">
                <select
                    id="paymentMethod"
                    name="paymentMethod"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    {Object.keys(PAYMENT_METHOD).map((status, i) => (
                        <option key={i} value={status}>
                            {PAYMENT_METHOD[status as keyof typeof PAYMENT_METHOD]}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </>
)