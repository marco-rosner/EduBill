import { InvoiceStatus } from "@/app/types"
import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 60

export async function POST(request: NextRequest) {
    const supabase = createClient()
    const formData = await request.formData()

    const invoiceId = formData.get('invoiceId')
    const invoiceStatus = formData.get('invoiceStatus')

    const paymentAmount = Number(formData.get('amount'))
    const isPartiallyPaid = invoiceStatus === InvoiceStatus.PARTIALLY_PAID
    let resInvoice
    let newTotalAmount

    if (isPartiallyPaid) {
        const res = await supabase.from('invoice').select("total_amount").eq('id', invoiceId)

        newTotalAmount = res.data && res.data[0].total_amount - paymentAmount
        const isPaid = Number(newTotalAmount) <= 0
        const updatePayload = isPaid ?
            { status: InvoiceStatus.PAID, total_amount: 0 } :
            { status: invoiceStatus, total_amount: newTotalAmount }

        resInvoice = await supabase.from('invoice')
            .update(updatePayload)
            .eq('id', invoiceId)
            .select("status, total_amount")
    } else {
        resInvoice = await supabase.from('invoice')
            .update({ status: invoiceStatus, total_amount: 0 })
            .eq('id', invoiceId)
            .select("status, total_amount")
    }

    if (resInvoice.status != 200) return NextResponse.json({ ...resInvoice })

    const isPartiallyPaidUpdated = resInvoice.data &&
        resInvoice.data[0].status === InvoiceStatus.PARTIALLY_PAID

    const payment = {
        invoice_id: invoiceId,
        amount: isPartiallyPaidUpdated ?
            paymentAmount :
            resInvoice.data && resInvoice.data[0].total_amount,
        payment_date: formData.get('paymentDate'),
        payment_method: formData.get('paymentMethod')
    }

    const resPayment = await supabase.from('payment').insert(payment)

    if (resPayment.status != 201) return NextResponse.json({ ...resPayment })

    return NextResponse.json({ ...resPayment })
}