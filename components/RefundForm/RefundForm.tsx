"use client"

import { createRefund } from "@/app/actions"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"

export const RefundForm = (): React.ReactElement => {
    const [refundDate, setRefundDate] = useState<DateValueType>({ startDate: new Date(), endDate: null })
    const searchParams = useSearchParams()
    const invoiceId = searchParams.get('id')

    const onRefundDateChange = (newDate: DateValueType) =>
        setRefundDate({ startDate: newDate && newDate.startDate, endDate: newDate && newDate.endDate })

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
                Fill the informations below
            </h2>

            <form action={createRefund}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 flex justify-center items-center">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Refund Date
                        </label>
                    </div>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <Datepicker useRange={false} asSingle={true} value={refundDate} onChange={onRefundDateChange} />
                        </div>
                    </div>

                    <input type="text" name="refundDate" id="refundDate" className="hidden" value={refundDate?.startDate?.toString()} readOnly />
                    <input type="text" name="invoiceId" id="invoiceId" className="hidden" value={invoiceId || ''} readOnly />

                    <div className="sm:col-span-3 flex justify-center items-center">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Amount
                        </label>
                    </div>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <input
                                type="text"
                                name="amount"
                                id="amount"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 text-right shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="sm:col-span-3 flex justify-center items-center">
                        <label
                            htmlFor="reason"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Reason
                        </label>
                    </div>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <input
                                type="text"
                                name="reason"
                                id="reason"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 text-right shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mx-2" type="submit">Refund</button>
                </div>
            </form>
        </div>

    )
}