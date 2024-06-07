"use client"

import { InvoiceStatus } from "@/app/types"
import { useInvoices } from "@/hooks/useInvoices"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface FilterInvoice {
    status: InvoiceStatus[],
    creditGt?: Number
}

interface ListInvoicesInterface {
    title: string,
    nextStep: string,
    filters: FilterInvoice,
    hasMenu?: boolean
}

export default function ListInvoices({ title, nextStep, filters, hasMenu }: ListInvoicesInterface) {
    const router = useRouter()
    const [status, setStatus] = useState<InvoiceStatus[] | undefined>()
    const [credit, setCredit] = useState<Number | undefined>(undefined)
    const { data, error, loading } = useInvoices(status, credit)

    useEffect(() => {
        const { status, creditGt } = filters

        setStatus(status)

        if (Number(creditGt) >= 0) setCredit(creditGt)
    }, [])

    if (error) return <>{error.message}</>

    if (loading) return <>Loading...</>

    return (
        <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-bold text-4xl mb-4">{title}</h2>
            {hasMenu && (
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-center items-center p-3 text-sm">
                        <button onClick={() => setStatus([InvoiceStatus.PENDING])}>Pending</button>
                        <span className="border-l rotate-180 m-5 h-6" />
                        <button onClick={() => setStatus([InvoiceStatus.PAID])}>Paid</button>
                        <span className="border-l rotate-180 m-5 h-6" />
                        <button onClick={() => setStatus([InvoiceStatus.PARTIALLY_PAID])}>Partially Paid</button>
                        <span className="border-l rotate-180 m-5 h-6" />
                        <button onClick={() => setStatus([InvoiceStatus.REFUNDED])}>Refunded</button>
                        <span className="border-l rotate-180 m-5 h-6" />
                        <button onClick={() => setStatus([InvoiceStatus.PARTIALLY_REFUNDED])}>Partially Refunded</button>
                    </div>
                </nav>
            )}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Invoice Id</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Total Amount</th>
                        <th className="px-6 py-3">Credit</th>
                        <th className="px-6 py-3">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="flex justify-center">No data</td>
                        </tr>
                    ) : data.map((
                        { id, status, invoice_item: items, total_amount: totalAmount, credit, due_date: dueDate }
                    ) => (
                        <tr key={id} onClick={() => router.replace(`${nextStep}/${id}`)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                            <td className="px-6 py-4">{id}</td>
                            <td className="px-6 py-4">{status}</td>
                            <td className="px-6 py-4">{items.map(item => item.description).toString()}</td>
                            <td className="px-6 py-4">{`$ ${totalAmount.toFixed(2)}`}</td>
                            <td className="px-6 py-4">{`$ ${credit.toFixed(2)}`}</td>
                            <td className="px-6 py-4">{dueDate}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}