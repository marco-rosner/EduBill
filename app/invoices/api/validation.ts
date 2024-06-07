import { InvoiceStatus } from "@/app/types"
import { NextResponse } from "next/server"
import { z } from "zod"

interface validatePutInterface {
    status: string | undefined,
    total_amount: number,
    credit: number,
    due_date: FormDataEntryValue | null,
    interest_rate: number,
    interest_amount: number
}

interface validateSubscription {
    description: FormDataEntryValue | null,
    quantity: number,
    unit_price: number,
    total_amount: number
}

interface validatePostInterface {
    customer_id: FormDataEntryValue | null,
    status: string | undefined,
    total_amount: number,
    due_date: FormDataEntryValue | null,
    interest_rate: number
}

const postSchema = z.object({
    customer_id: z.number(),
    status: z.nativeEnum(InvoiceStatus),
    total_amount: z.number(),
    due_date: z.string(),
    interest_rate: z.number()
})

const putSchema = z.object({
    status: z.nativeEnum(InvoiceStatus),
    total_amount: z.number(),
    credit: z.number(),
    due_date: z.string(),
    interest_rate: z.number(),
    interest_amount: z.number()
})

const subSchema = z.object({
    description: z.string(),
    quantity: z.number(),
    unit_price: z.number(),
    total_amount: z.number()
})

export const validatePost = (invoice: validatePostInterface) => {
    const { error, success } = postSchema.safeParse(invoice)

    if (!success)
        return NextResponse.json({ error: { message: error.format()._errors.toString() } }, { status: 400 })
}

export const validatePut = (invoice: validatePutInterface) => {
    const { error, success } = putSchema.safeParse(invoice)

    if (!success)
        return NextResponse.json({ error: { message: error.format()._errors.toString() } }, { status: 400 })
}

export const validateSubscription = (subscription: validateSubscription) => {
    const { error, success } = subSchema.safeParse(subscription)

    if (!success)
        return NextResponse.json({ error: { message: error.format()._errors.toString() } }, { status: 400 })
}

