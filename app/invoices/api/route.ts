import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { getInvoicePOST, getInvoicePUT, getSubscription } from "./helpers"
import { z } from "zod"
import { validatePost, validatePut, validateSubscription } from "./validation"
import { validateSingleValue } from "@/app/validation"

export const revalidate = 60

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = Number(searchParams.get('id'))

    validateSingleValue(id, z.number())

    const supabase = createClient()
    const res = await supabase.from('invoice').select(`
        id,
        status,
        credit,
        total_amount,
        due_date,
        interest_amount,
        interest_rate,
        invoice_item(
            id,
            description,
            quantity,
            total_amount,
            unit_price
        )
        `).eq('id', id)

    if (res.error) return NextResponse.json({ error: res.error }, { status: res.status, statusText: res.statusText })

    return NextResponse.json(res)
}

export async function PUT(request: NextRequest) {
    const supabase = createClient()
    const formData = await request.formData()

    const invoiceId = formData.get('invoiceId')
    const invoice = getInvoicePUT(formData)

    validatePut(invoice)

    const res = await supabase.from('invoice').update(invoice).eq('id', invoiceId)
    if (res.error) return NextResponse.json({ error: res.error }, { status: res.status, statusText: res.statusText })

    const subLength = Number(formData.get('subscriptionsLength'))

    for (let i = 0; i <= subLength - 1; i++) {
        const subId = formData.get(`id-${i}`)
        const subscription = getSubscription(formData, i)

        validateSubscription(subscription)

        const resSub = await supabase.from('invoice_item').update(subscription).eq('id', subId)
        if (resSub.error) return NextResponse.json({ error: resSub.error }, { status: resSub.status, statusText: resSub.statusText })
    }

    return NextResponse.json(res)
}

export async function POST(request: NextRequest) {
    const supabase = createClient()
    const formData = await request.formData()

    const invoice = getInvoicePOST(formData)

    validatePost(invoice)

    const res = await supabase.from('invoice').insert(invoice).select('id')
    if (res.error) return NextResponse.json({ error: res.error }, { status: res.status, statusText: res.statusText })

    const subLength = Number(formData.get('subscriptionsLength'))

    for (let i = 0; i <= subLength - 1; i++) {
        const subscription = getSubscription(formData, i)

        validateSubscription(subscription)

        const resSub = await supabase.from('invoice_item').insert(subscription).select('id')
        if (resSub.error) return NextResponse.json({ error: resSub.error }, { status: resSub.status, statusText: resSub.statusText })

        const resNMRelationship = await supabase
            .from('invoice_invoice_item')
            .insert({
                id_invoice: Number(res.data && res.data[0].id),
                id_invoice_item: Number(resSub.data && resSub.data[0].id)
            })
        if (resNMRelationship.error) return NextResponse.json({ error: resNMRelationship.error }, { status: resNMRelationship.status, statusText: resNMRelationship.statusText })
    }

    return NextResponse.json(res)
}