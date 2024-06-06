"use client"

import { createInvoice } from "@/app/actions"
import { CUSTOMER_ID, INVOICE_STATUS } from "@/app/constants"
import { useMemo, useState } from "react"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"
import { StatusSelect } from "./StatusField"
import { SubscriptionItemField } from "./SubscripitionItemField"

interface InvoiceFormInterface {
    update?: boolean
}

export interface SubscriptionInterface {
    id: number,
    amountTotal: number
}

const INITIAL_SUBSCRIPTION: SubscriptionInterface[] = [{
    id: 1, amountTotal: 0
}]

export const InvoiceForm = ({ update = false }: InvoiceFormInterface): React.ReactElement => {
    const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTION)
    const [dueDate, setDueDate] = useState<DateValueType>({ startDate: new Date(), endDate: null })

    const updateTotal = (subscriptionId: number, total: number) => {
        setSubscriptions((prev) =>
            prev.map((sub) =>
                sub.id === subscriptionId ?
                    { ...sub, amountTotal: total } :
                    sub))
    }

    const onDueDateChange = (newDate: DateValueType) =>
        setDueDate({ startDate: newDate && newDate.startDate, endDate: newDate && newDate.endDate })

    const invoiceTotal = useMemo(() => subscriptions.reduce((acc, cur) => acc + cur.amountTotal, 0), [subscriptions])

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
                {update ? 'Update' : "Create"} Invoice
            </h2>

            <form action={createInvoice}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 flex justify-center items-center">
                        <label
                            htmlFor="interestRate"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Due Date
                        </label>
                    </div>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <Datepicker useRange={false} asSingle={true} value={dueDate} onChange={onDueDateChange} />
                        </div>
                    </div>
                    {update ? <StatusSelect /> : (
                        <>
                            <input type="text" name="customerId" id="customerId" className="hidden" value={CUSTOMER_ID} readOnly />
                            <input type="text" name="status" id="status" className="hidden" value={INVOICE_STATUS.pending} readOnly />
                            <input type="text" name="subscriptionsLength" id="subscriptionsLength" className="hidden" value={subscriptions.length} readOnly />
                            <input type="text" name="dueDate" id="dueDate" className="hidden" value={dueDate?.startDate?.toString()} readOnly />
                        </>
                    )}

                    {subscriptions.map(sub =>
                        (<SubscriptionItemField key={sub.id} {...sub} updateTotal={updateTotal} setSubscriptions={setSubscriptions} />)
                    )}

                    <div className="sm:col-span-6 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setSubscriptions(prev => [...prev, { id: prev.length + 1, amountTotal: 0 }])}
                            className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mx-2">Add subscriptions</button>
                    </div>
                    <div className="sm:col-span-3 flex justify-center items-center">
                        <label
                            htmlFor="interestRate"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Interest Rate
                        </label>
                    </div>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <input
                                type="text"
                                name="interestRate"
                                id="last-name"
                                defaultValue={0.3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 text-right shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="sm:col-span-6">
                        <div className="mt-2 flex justify-end items-center">
                            <input type="text" name="totalAmount" id="totalAmount" value={invoiceTotal} className="hidden" readOnly />
                            <span>Total Invoice: {invoiceTotal}</span>
                        </div>
                    </div>

                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mx-2" type="submit">Create</button>
            </form>
        </div>

    )
}