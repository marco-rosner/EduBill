import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 60

export async function GET(req: NextRequest) {
    const supabase = createClient()
    const url = new URL(req.url)
    const status = url.searchParams.get('status')?.split(',')
    const credit = url.searchParams.get('creditGt')

    let query = supabase
        .from('invoice')
        .select('id, status, invoice_item( id, description ), total_amount, due_date, credit')

    if (credit) query = query.gt('credit', credit)

    if (status) query = query.in('status', status)

    const res = await query

    return NextResponse.json({ ...res })
}