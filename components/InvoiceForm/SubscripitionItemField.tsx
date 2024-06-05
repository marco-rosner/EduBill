"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SubscriptionInterface } from "./InvoiceForm"

interface SubscriptionItemInterface {
    id: number,
    amountTotal: number,
    updateTotal: (subscriptionId: number, total: number) => void,
    setSubscriptions: Dispatch<SetStateAction<SubscriptionInterface[]>>
}

export const SubscriptionItemField = ({ id, amountTotal, updateTotal, setSubscriptions }: SubscriptionItemInterface): React.ReactElement => {
    const [quantity, setQuantity] = useState(0)
    const [unitPrice, setUnitPrice] = useState(0)

    useEffect(() => {
        if (quantity !== 0 && unitPrice !== 0) {
            updateTotal(id, quantity * unitPrice)
        }
    }, [quantity, unitPrice])

    return (
        <>
            <div className="sm:col-span-6 flex justify-end">
                <button
                    type="button"
                    onClick={() => setSubscriptions(prev => prev.filter(sub => sub.id !== id))}
                    className="bg-red-500 hover:bg-red-700 text-white px-2 rounded mx-2">X</button>
            </div>
            <div className="sm:col-span-6">
                <label
                    htmlFor={`description-${id}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Subscription description
                </label>
                <div className="mt-2">
                    <input
                        type="textarea"
                        name={`description-${id}`}
                        id={`description-${id}`}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div className="sm:col-span-3">
                <label
                    htmlFor={`quantity-${id}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Quantity
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name={`quantity-${id}`}
                        id={`quantity-${id}`}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div className="sm:col-span-3">
                <label
                    htmlFor={`unitPrice-${id}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Unit Price
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name={`unitPrice-${id}`}
                        id={`unitPrice-${id}`}
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div className="sm:col-span-6">
                <div className="mt-2 flex justify-end items-center">
                    <input type="text" name={`totalAmount-${id}`} id={`totalAmount-${id}`} value={amountTotal} className="hidden" readOnly />
                    <span>Total: {amountTotal}</span>
                </div>
            </div>
        </>
    )
}