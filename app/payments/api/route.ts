import { InvoiceStatus } from "@/app/types"
import { validateSingleValue } from "@/app/validation"
import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { getPayment, getUpdatePayload } from "./helpers"
import { z } from "zod"
import { validatePayment } from "./validation"

export const revalidate = 60

export async function POST(request: NextRequest) {
    const supabase = createClient()
    const formData = await request.formData()

    const invoiceId = formData.get('invoiceId')
    const invoiceStatus = formData.get('invoiceStatus')
    const paymentAmount = Number(formData.get('amount'))

    validateSingleValue(invoiceId, z.number())
    validateSingleValue(invoiceStatus, z.nativeEnum(InvoiceStatus))
    validateSingleValue(paymentAmount, z.number())

    const isPartiallyPaid = invoiceStatus === InvoiceStatus.PARTIALLY_PAID

    const res = await supabase.from('invoice').select("total_amount, credit").eq('id', invoiceId)
    if (res.error) return NextResponse.json({ error: res.error }, { status: res.status, statusText: res.statusText })

    const totalAmount = res.data && res.data[0].total_amount
    let query

    if (isPartiallyPaid) {
        const updatePayload = getUpdatePayload(totalAmount, paymentAmount, res)

        query = supabase.from('invoice')
            .update(updatePayload)
    } else {
        query = supabase.from('invoice')
            .update({ status: InvoiceStatus.PAID, total_amount: 0 })
    }

    const resInvoice = await query.eq('id', invoiceId)

    if (resInvoice.error)
        return NextResponse.json({ error: resInvoice.error }, { status: resInvoice.status, statusText: resInvoice.statusText })

    const payment = getPayment(invoiceId, isPartiallyPaid, paymentAmount, totalAmount, formData)

    validatePayment(payment)

    const resPayment = await supabase.from('payment').insert(payment)

    if (resPayment.error)
        return NextResponse.json({ error: resPayment.error }, { status: resPayment.status, statusText: resPayment.statusText })

    return NextResponse.json(resPayment)
}