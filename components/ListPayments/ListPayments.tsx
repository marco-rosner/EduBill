"use client"

import { usePayments } from "@/hooks/usePayments"

export default function ListPayments() {
    const { data, error, loading } = usePayments()

    if (error) return <>{error.message}</>

    if (loading) return <>Loading...</>

    return (
        <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-bold text-4xl mb-4">List Payments</h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Payment Id</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Invoice Id</th>
                        <th className="px-6 py-3">Invoice Status</th>
                        <th className="px-6 py-3">Payment Method</th>
                        <th className="px-6 py-3">Payment Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((
                        { id, amount, payment_date: paymnetDate, payment_method: paymentMethod, invoice: { id: invoiceId, status: invoiceStatus } }
                    ) => (
                        <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                            <td className="px-6 py-4">{id}</td>
                            <td className="px-6 py-4">{`$ ${amount.toFixed(2)}`}</td>
                            <td className="px-6 py-4">{invoiceId}</td>
                            <td className="px-6 py-4">{invoiceStatus}</td>
                            <td className="px-6 py-4">{paymentMethod}</td>
                            <td className="px-6 py-4">{paymnetDate.toString()}</td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}