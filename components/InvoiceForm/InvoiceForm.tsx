"use client"

import { createInvoice, updateInvoice } from "@/app/actions"
import { CUSTOMER_ID, INVOICE_STATUS } from "@/app/constants"
import { Invoice, Invoice_DB } from "@/app/types"
import { useEffect, useMemo, useState } from "react"
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker"
import { StatusSelect } from "./StatusField"
import { SubscriptionItemField } from "./SubscripitionItemField"

interface InvoiceFormInterface {
    invoiceDB?: Invoice_DB[];
}

const INITIAL_SUBSCRIPTION: Invoice["invoiceItem"] = [{
    id: 1, description: '', quantity: 0, totalAmount: 0, unitPrice: 0
}]

export const InvoiceForm = ({ invoiceDB }: InvoiceFormInterface): React.ReactElement => {
    const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTION)
    const [invoice, _] = useState<Invoice_DB[]>(invoiceDB ? invoiceDB : [])
    const [dueDate, setDueDate] = useState<DateValueType>({ startDate: new Date(), endDate: new Date() })
    const updateMode = invoice.length === 1

    useEffect(() => {
        if (updateMode) {
            const invoiceItems = invoice[0].invoice_item.map(item => ({
                ...item,
                totalAmount: item.total_amount,
                unitPrice: item.unit_price
            }))
            setDueDate({ startDate: invoice[0].due_date, endDate: invoice[0].due_date })
            setSubscriptions(invoiceItems)
        }
    }, [])

    const onClickSubscription = () =>
        setSubscriptions(prev => [...prev, { ...INITIAL_SUBSCRIPTION[0], id: prev.length + 1 }])

    const updateTotal = (subscriptionId: number, total: number) => {
        setSubscriptions((prev) =>
            prev.map((sub) => sub.id === subscriptionId ?
                { ...sub, totalAmount: total } :
                sub
            )
        )
    }

    const onDueDateChange = (newDate: DateValueType) =>
        setDueDate({ startDate: newDate && newDate.startDate, endDate: newDate && newDate.endDate })

    const invoiceTotal = useMemo(() => subscriptions.reduce((acc, cur) => acc + cur.totalAmount, 0), [subscriptions])

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
                {updateMode ? 'Update' : "Create"} Invoice
            </h2>

            <form action={updateMode ? updateInvoice : createInvoice}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 flex justify-center items-center">
                        <label
                            htmlFor="DueDate"
                            className="block text-sm font-medium leading-6 text-gray-900">
                            Due Date
                        </label>
                    </div>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <Datepicker useRange={false} asSingle={true} value={dueDate} onChange={onDueDateChange} />
                        </div>
                    </div>

                    {updateMode && <StatusSelect statusSelected={invoice[0].status} />}

                    <input type="text" name="subscriptionsLength" id="subscriptionsLength" className="hidden" value={subscriptions.length} readOnly />
                    <input type="text" name="dueDate" id="dueDate" className="hidden" value={dueDate?.startDate?.toString()} readOnly />

                    {updateMode ? (
                        <input type="text" name="invoiceId" id="invoiceId" className="hidden" value={invoice[0].id} readOnly />
                    ) : (
                        <>
                            <input type="text" name="customerId" id="customerId" className="hidden" value={CUSTOMER_ID} readOnly />
                            <input type="text" name="status" id="status" className="hidden" value={INVOICE_STATUS.pending} readOnly />
                        </>
                    )}

                    {subscriptions.map((sub, i) =>
                        (<SubscriptionItemField key={sub.id} index={i} {...sub} updateTotal={updateTotal} setSubscriptions={setSubscriptions} />)
                    )}

                    <div className="sm:col-span-6 flex justify-end">
                        <button
                            type="button"
                            onClick={onClickSubscription}
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
                                id="interestRate"
                                defaultValue={updateMode ? invoice[0].interest_rate : 0.3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 text-right shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    {updateMode && (
                        <>
                            <div className="sm:col-span-3 flex justify-center items-center">
                                <label
                                    htmlFor="credit"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Credit
                                </label>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="credit"
                                        id="credit"
                                        defaultValue={invoice[0].credit}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 text-right shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-3 flex justify-center items-center">
                                <label
                                    htmlFor="interestAmount"
                                    className="block text-sm font-medium leading-6 text-gray-900">
                                    Interest Amount
                                </label>
                            </div>
                            <div className="sm:col-span-3">
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="interestAmount"
                                        id="interestAmount"
                                        defaultValue={invoice[0].interest_amount}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 text-right shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="sm:col-span-6">
                        <div className="mt-2 flex justify-end items-center">
                            <input type="text" name="totalAmount" id="totalAmount" value={invoiceTotal} className="hidden" readOnly />
                            <span>Total Invoice: {invoiceTotal}</span>
                        </div>
                    </div>

                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 rounded mx-2" type="submit">{updateMode ? 'Update' : 'Create'}</button>
            </form>
        </div>

    )
}