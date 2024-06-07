import { InvoiceStatus } from "@/app/types"

export const getUpdatePayload = (credit: number, refundAmount: number) => {
    const newCredit = credit - refundAmount

    const isRefunded = Number(newCredit) <= 0
    return isRefunded ?
        { status: InvoiceStatus.REFUNDED, credit: 0 } :
        { status: InvoiceStatus.PARTIALLY_REFUNDED, credit: newCredit }
}

export const getRefund = (
    invoiceId: FormDataEntryValue | null,
    isPartiallyRefunded: boolean,
    refundAmount: number,
    credit: number,
    formData: FormData
) => ({
    invoice_id: invoiceId,
    amount: isPartiallyRefunded ? refundAmount : credit,
    refund_date: formData.get('refundDate'),
    reason: formData.get('reason')
})