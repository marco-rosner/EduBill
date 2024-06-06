import { InvoiceStatus } from "@/app/types"
import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 60

export async function POST(request: NextRequest) {
    const supabase = createClient()
    const formData = await request.formData()

    const invoiceId = formData.get('invoiceId')
    const invoiceStatus = formData.get('invoiceStatus')
    const refundAmount = Number(formData.get('amount'))
    const isPartiallyRefunded = invoiceStatus === InvoiceStatus.PARTIALLY_REFUNDED

    const res = await supabase.from('invoice').select("total_amount, credit").eq('id', invoiceId)
    const credit = res.data && res.data[0].credit
    let query

    if (isPartiallyRefunded) {
        const newCredit = credit - refundAmount

        const isRefunded = Number(newCredit) <= 0
        const updatePayload = isRefunded ?
            { status: InvoiceStatus.REFUNDED, credit: 0 } :
            { status: InvoiceStatus.PARTIALLY_REFUNDED, credit: newCredit }

        query = supabase.from('invoice')
            .update(updatePayload)
    } else {
        query = supabase.from('invoice')
            .update({ status: InvoiceStatus.REFUNDED, credit: 0 })
    }

    const resInvoice = await query.eq('id', invoiceId)

    if (resInvoice.status != 204) return NextResponse.json({ ...resInvoice })

    const refund = {
        invoice_id: invoiceId,
        amount: isPartiallyRefunded ? refundAmount : credit,
        refund_date: formData.get('refundDate'),
        reason: formData.get('reason')
    }

    const resRefund = await supabase.from('refund').insert(refund)

    if (resRefund.status != 201) return NextResponse.json({ ...resRefund })

    return NextResponse.json({ ...resRefund })
}