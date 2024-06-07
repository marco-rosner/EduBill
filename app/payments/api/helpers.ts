import { InvoiceStatus } from "@/app/types"
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export const getUpdatePayload = (
    totalAmount: number,
    paymentAmount: number,
    res: PostgrestSingleResponse<{
        total_amount: any;
        credit: any;
    }[]>) => {
    const newTotalAmount = totalAmount - paymentAmount
    const credit = res.data && res.data[0].credit + Math.abs(Number(newTotalAmount))

    const isPaid = Number(newTotalAmount) <= 0

    return isPaid ?
        { status: InvoiceStatus.PAID, total_amount: 0, credit } :
        { status: InvoiceStatus.PARTIALLY_PAID, total_amount: newTotalAmount }
}

export const getPayment = (
    invoiceId: FormDataEntryValue | null,
    isPartiallyPaid: boolean,
    paymentAmount: number,
    totalAmount: number,
    formData: FormData) => ({
        invoice_id: invoiceId,
        amount: isPartiallyPaid ? paymentAmount : totalAmount,
        payment_date: formData.get('paymentDate'),
        payment_method: formData.get('paymentMethod')
    })