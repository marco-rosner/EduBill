import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 60

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    const supabase = createClient()
    const res = await supabase.from('invoice').select().eq('id', id)

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