'use server'

import { redirect } from "next/navigation"
import { DEFAULT_URL } from "./constants"

export async function createInvoice(formData: FormData) {
    const { error } = await fetch(
        `${DEFAULT_URL}/invoices/api`,
        { method: "POST", body: formData }
    ).then(data => data.json())

    if (error) return { error }

    redirect('/')
}

export async function updateInvoice(formData: FormData) {
    const { error } = await fetch(
        `${DEFAULT_URL}/invoices/api`,
        { method: "PUT", body: formData }
    ).then(data => data.json())

    if (error) return { error }

    redirect('/')
}

export async function applyInterest() {
    const { error } = await fetch(
        `${DEFAULT_URL}/invoices/api/applyInterest`
    ).then(data => data.json())

    if (error) return { error }

    redirect('/')
}

export async function createPayment(formData: FormData) {
    const { error } = await fetch(
        `${DEFAULT_URL}/payments/api`,
        { method: "POST", body: formData }
    ).then(data => data.json())

    if (error) return { error }

    redirect('/payments/list')
}

export async function createRefund(formData: FormData) {
    const { error } = await fetch(
        `${DEFAULT_URL}/refunds/api`,
        { method: "POST", body: formData }
    ).then(data => data.json())

    if (error) return { error }

    redirect('/refunds/list')
}