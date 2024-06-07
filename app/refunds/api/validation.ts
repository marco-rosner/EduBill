import { NextResponse } from "next/server"
import { z } from "zod"

interface validateRefund {
    invoice_id: FormDataEntryValue | null,
    amount: number,
    refund_date: FormDataEntryValue | null,
    reason: FormDataEntryValue | null
}

const refundSchema = z.object({
    invoice_id: z.number(),
    amount: z.number(),
    refund_date: z.string(),
    reason: z.string()
})

export const validateRefund = (refund: validateRefund) => {
    const { error, success } = refundSchema.safeParse(refund)

    if (!success)
        return NextResponse.json({ error: { message: error.format()._errors.toString() } }, { status: 400 })
}