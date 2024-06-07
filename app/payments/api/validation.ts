import { PaymentMethod } from "@/app/types"
import { NextResponse } from "next/server"
import { z } from "zod"

interface validatePayment {
    invoice_id: FormDataEntryValue | null,
    amount: number,
    payment_date: FormDataEntryValue | null,
    payment_method: FormDataEntryValue | null
}

const paymentSchema = z.object({
    invoice_id: z.number(),
    amount: z.number(),
    payment_date: z.string(),
    payment_method: z.nativeEnum(PaymentMethod)
})

export const validatePayment = (payment: validatePayment) => {
    const { error, success } = paymentSchema.safeParse(payment)

    if (!success)
        return NextResponse.json({ error: { message: error.format()._errors.toString() } }, { status: 400 })
}