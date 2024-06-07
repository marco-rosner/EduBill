import { InvoiceStatus } from "@/app/types"
import { validateSingleValue } from "@/app/validation"
import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { getRefund, getUpdatePayload } from "./helpers"
import { z } from "zod"
import { validateRefund } from "./validation"

export const revalidate = 60

export async function POST(request: NextRequest) {
    const supabase = createClient()
    const formData = await request.formData()

    const invoiceId = formData.get('invoiceId')
    const invoiceStatus = formData.get('invoiceStatus')
    const refundAmount = Number(formData.get('amount'))

    validateSingleValue(invoiceId, z.number())
    validateSingleValue(invoiceStatus, z.nativeEnum(InvoiceStatus))
    validateSingleValue(refundAmount, z.number())

    const isPartiallyRefunded = invoiceStatus === InvoiceStatus.PARTIALLY_REFUNDED

    const res = await supabase.from('invoice').select("total_amount, credit").eq('id', invoiceId)
    if (res.error) return NextResponse.json({ error: res.error }, { status: res.status, statusText: res.statusText })

    const credit = res.data && res.data[0].credit
    let query

    if (isPartiallyRefunded) {
        const updatePayload = getUpdatePayload(credit, refundAmount)

        query = supabase.from('invoice')
            .update(updatePayload)
    } else {
        query = supabase.from('invoice')
            .update({ status: InvoiceStatus.REFUNDED, credit: 0 })
    }

    const resInvoice = await query.eq('id', invoiceId)
    if (resInvoice.error)
        return NextResponse.json({ error: resInvoice.error }, { status: resInvoice.status, statusText: resInvoice.statusText })

    const refund = getRefund(invoiceId, isPartiallyRefunded, refundAmount, credit, formData)

    validateRefund(refund)

    const resRefund = await supabase.from('refund').insert(refund)
    if (resRefund.error)
        return NextResponse.json({ error: resRefund.error }, { status: resRefund.status, statusText: resRefund.statusText })


    return NextResponse.json(resRefund)
}