"use client"

import { useInvoices } from "@/hooks/useInvoices"

export default function ListInvoices() {
    const { data, error, loading } = useInvoices()

    if (error) return <>{error.message}</>

    if (loading) return <>Loading...</>

    return (
        <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-bold text-4xl mb-4">Current invoices</h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Invoice Id</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Total Amount</th>
                        <th className="px-6 py-3">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ id, status, invoice_item: items, total_amount: totalAmount, due_date: dueDate }) => {
                        const description = items.reduce((acc, cur) => `${cur.description}, ${acc}`, '')

                        return (
                            <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{id}</td>
                                <td className="px-6 py-4">{status}</td>
                                <td className="px-6 py-4">{description}</td>
                                <td className="px-6 py-4">{`$ ${totalAmount.toFixed(2)}`}</td>
                                <td className="px-6 py-4">{dueDate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}