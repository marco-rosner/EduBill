"use client"

import { createPayment } from "@/app/actions"
import { InvoiceStatus } from "@/app/types"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"
import { MethodSelect } from "./MethodField"

export const PaymentForm = (): React.ReactElement => {
    const [activeAmount, setActiveAmount] = useState<boolean>(false)
    const [paymentDate, setPaymentDate] = useState<DateValueType>({ startDate: new Date(), endDate: null })
    const searchParams = useSearchParams()
    const invoiceId = searchParams.get('id')

    const onPaymentDateChange = (newDate: DateValueType) =>
        setPaymentDate({ startDate: newDate && newDate.startDate, endDate: newDate && newDate.endDate })

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
                Fill the informations below
            </h2>

            <form action={createPayment}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 flex justify-center items-center">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Payment Date
                        </label>
                    </div>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <Datepicker useRange={false} asSingle={true} value={paymentDate} onChange={onPaymentDateChange} />
                        </div>
                    </div>

                    <MethodSelect />

                    <input type="text" name="paymentDate" id="paymentDate" className="hidden" value={paymentDate?.startDate?.toString()} readOnly />
                    <input type="text" name="invoiceId" id="invoiceId" className="hidden" value={invoiceId || ''} readOnly />

                    <div className="sm:col-span-3 flex justify-center items-center">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Payment mode:
                        </label>
                    </div>
                    <div className="sm:col-span-3">
                        <div className="mt-2 flex flex-direction-row items-center justify-evenly">
                            <div className="mt-2 flex flex-direction-row">
                                <input
                                    id="invoiceStatus"
                                    name="invoiceStatus"
                                    type="radio"
                                    value={InvoiceStatus.PAID}
                                    onClick={() => setActiveAmount(false)}
                                    checked={!activeAmount}
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2" />
                                <label htmlFor="invoiceStatus" className="block text-sm font-medium leading-6 text-gray-900">Total</label>
                            </div>
                            <div className="mt-2 flex flex-direction-row">
                                <input
                                    id="invoiceStatus"
                                    name="invoiceStatus"
                                    type="radio"
                                    value={InvoiceStatus.PARTIALLY_PAID}
                                    onClick={() => setActiveAmount(true)}
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2" />
                                <label htmlFor="invoiceStatus" className="block text-sm font-medium leading-6 text-gray-900">Partial</label>
                            </div>
                        </div>
                    </div>

                    {activeAmount && (
                        <>
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
                        </>
                    )}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mx-2" type="submit">Pay</button>
                </div>
            </form>
        </div>

    )
}