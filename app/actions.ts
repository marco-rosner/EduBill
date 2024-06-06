'use server'

import { redirect } from "next/navigation"
import { DEFAULT_URL } from "./constants"

export async function createInvoice(formData: FormData) {
    const res = await fetch(
        `${DEFAULT_URL}/invoices/api`,
        { method: "POST", body: formData }
    ).then(data => data.json())

    redirect('/')
}

export async function createPayment(formData: FormData) {
    const res = await fetch(
        `${DEFAULT_URL}/payments/api`,
        { method: "POST", body: formData }
    ).then(data => data.json())

    redirect('/payments/list')
}

export async function createRefund(formData: FormData) {
    const res = await fetch(
        `${DEFAULT_URL}/refunds/api`,
        { method: "POST", body: formData }
    ).then(data => data.json())

    redirect('/refunds/list')
}