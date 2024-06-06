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

    const res = await supabase.from('invoice').select("total_amount, credit").eq('id', invoiceId)
    const totalAmount = res.data && res.data[0].total_amount
    let query

    if (isPartiallyPaid) {
        const newTotalAmount = totalAmount - paymentAmount
        const credit = res.data && res.data[0].credit + Math.abs(Number(newTotalAmount))

        const isPaid = Number(newTotalAmount) <= 0
        const updatePayload = isPaid ?
            { status: InvoiceStatus.PAID, total_amount: 0, credit } :
            { status: InvoiceStatus.PARTIALLY_PAID, total_amount: newTotalAmount }

        query = supabase.from('invoice')
            .update(updatePayload)
    } else {
        query = supabase.from('invoice')
            .update({ status: InvoiceStatus.PAID, total_amount: 0 })
    }

    const resInvoice = await query.eq('id', invoiceId)

    if (resInvoice.status != 204) return NextResponse.json({ ...resInvoice })

    const payment = {
        invoice_id: invoiceId,
        amount: isPartiallyPaid ? paymentAmount : totalAmount,
        payment_date: formData.get('paymentDate'),
        payment_method: formData.get('paymentMethod')
    }

    const resPayment = await supabase.from('payment').insert(payment)

    if (resPayment.status != 201) return NextResponse.json({ ...resPayment })

    return NextResponse.json({ ...resPayment })
}