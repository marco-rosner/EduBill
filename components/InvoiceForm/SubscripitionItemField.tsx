"use client"

import { Invoice } from "@/app/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface SubscriptionItemInterface {
    index: number,
    id: number,
    totalAmount: number,
    description: string;
    quantity: number;
    unitPrice: number;
    updateTotal: (subscriptionId: number, total: number) => void,
    setSubscriptions: Dispatch<SetStateAction<Invoice["invoiceItem"]>>
}

export const SubscriptionItemField = ({
    id,
    index,
    totalAmount,
    description,
    quantity: quantityDB,
    unitPrice: unitPriceDB,
    updateTotal,
    setSubscriptions }: SubscriptionItemInterface): React.ReactElement => {
    const [quantity, setQuantity] = useState(quantityDB)
    const [unitPrice, setUnitPrice] = useState(unitPriceDB)

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

            <input type="text" name={`id-${index}`} id={`id-${index}`} className="hidden" value={id} readOnly />

            <div className="sm:col-span-6">
                <label
                    htmlFor={`description-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Subscription description
                </label>
                <div className="mt-2">
                    <input
                        type="textarea"
                        name={`description-${index}`}
                        id={`description-${index}`}
                        defaultValue={description}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div className="sm:col-span-3">
                <label
                    htmlFor={`quantity-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Quantity
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name={`quantity-${index}`}
                        id={`quantity-${index}`}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div className="sm:col-span-3">
                <label
                    htmlFor={`unitPrice-${index}`}
                    className="block text-sm font-medium leading-6 text-gray-900">
                    Unit Price
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name={`unitPrice-${index}`}
                        id={`unitPrice-${index}`}
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div className="sm:col-span-6">
                <div className="mt-2 flex justify-end items-center">
                    <input type="text" name={`totalAmount-${index}`} id={`totalAmount-${index}`} value={totalAmount} className="hidden" readOnly />
                    <span>Total: {totalAmount}</span>
                </div>
            </div>
        </>
    )
}