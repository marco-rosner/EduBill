import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

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

    return NextResponse.json({ ...res })
}

export async function PUT(request: NextRequest) {
    const supabase = createClient()
    const formData = await request.formData()

    const invoiceId = formData.get('invoiceId')
    const invoice = {
        status: formData.get('status')?.toString().toLowerCase(),
        total_amount: Number(formData.get('totalAmount')),
        credit: Number(formData.get('credit')),
        due_date: formData.get('dueDate'),
        interest_rate: Number(formData.get('interestRate')),
        interest_amount: Number(formData.get('interestAmount'))
    }

    const res = await supabase.from('invoice').update(invoice).eq('id', invoiceId)

    if (res.status != 204) return NextResponse.json({ ...res })

    const subLength = Number(formData.get('subscriptionsLength'))

    for (let i = 0; i <= subLength - 1; i++) {
        const subId = formData.get(`id-${i}`)
        const subscription = {
            description: formData.get(`description-${i}`),
            quantity: Number(formData.get(`quantity-${i}`)),
            unit_price: Number(formData.get(`unitPrice-${i}`)),
            total_amount: Number(formData.get(`totalAmount-${i}`))
        }

        const resSub = await supabase.from('invoice_item').update(subscription).eq('id', subId)

        if (resSub.status != 204) return NextResponse.json({ ...resSub })
    }

    return NextResponse.json({ ...res })
}

export async function POST(request: NextRequest) {
    const supabase = createClient()
    const formData = await request.formData()

    const invoice = {
        customer_id: formData.get('customerId'),
        status: formData.get('status')?.toString().toLowerCase(),
        total_amount: Number(formData.get('totalAmount')),
        due_date: formData.get('dueDate'),
        interest_rate: Number(formData.get('interestRate'))
    }
    const resInvoice = await supabase.from('invoice').insert(invoice).select('id')
    if (resInvoice.status != 201) return NextResponse.json({ ...resInvoice })

    const subLength = Number(formData.get('subscriptionsLength'))

    for (let i = 1; i <= subLength; i++) {
        const subscription = {
            description: formData.get(`description-${i}`),
            quantity: Number(formData.get(`quantity-${i}`)),
            unit_price: Number(formData.get(`unitPrice-${i}`)),
            total_amount: Number(formData.get(`totalAmount-${i}`))
        }

        const resSub = await supabase.from('invoice_item').insert(subscription).select('id')
        if (resSub.status != 201) return NextResponse.json({ ...resSub })

        const resNMRelationship = await supabase
            .from('invoice_invoice_item')
            .insert({
                id_invoice: Number(resInvoice.data && resInvoice.data[0].id),
                id_invoice_item: Number(resSub.data && resSub.data[0].id)
            })
        if (resNMRelationship.status != 201) return NextResponse.json({ ...resNMRelationship })
    }

    return NextResponse.json({ ...resInvoice })
}