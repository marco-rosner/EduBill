import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 60

export async function POST(request: NextRequest) {
    const supabase = createClient()
    const formData = await request.formData()

    const invoiceId = formData.get('invoiceId')
    const refundAmount = Number(formData.get('amount'))

    // const res = await supabase.from('invoice').select("total_amount").eq('id', invoiceId)

    // const isPartiallyPaid = invoiceStatus === InvoiceStatus.PARTIALLY_PAID
    // let resInvoice
    // let newTotalAmount

    // if (isPartiallyPaid) {


    //     newTotalAmount = res.data && res.data[0].total_amount - paymentAmount
    //     const isPaid = Number(newTotalAmount) <= 0
    //     const updatePayload = isPaid ?
    //         { status: InvoiceStatus.PAID, total_amount: 0 } :
    //         { status: invoiceStatus, total_amount: newTotalAmount }

    //     resInvoice = await supabase.from('invoice')
    //         .update(updatePayload)
    //         .eq('id', invoiceId)
    //         .select("status, total_amount")
    // } else {
    //     resInvoice = await supabase.from('invoice')
    //         .update({ status: invoiceStatus, total_amount: 0 })
    //         .eq('id', invoiceId)
    //         .select("status, total_amount")
    // }

    // if (resInvoice.status != 200) return NextResponse.json({ ...resInvoice })

    const refund = {
        invoice_id: invoiceId,
        amount: refundAmount,
        refund_date: formData.get('refundDate'),
        reason: formData.get('reason')
    }

    const resRefund = await supabase.from('refund').insert(refund)

    if (resRefund.status != 201) return NextResponse.json({ ...resRefund })

    return NextResponse.json({ ...resRefund })
}