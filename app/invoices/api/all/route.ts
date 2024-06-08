import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { InvoiceStatus } from "@/app/types"
import { validateSingleValue } from "@/app/validation"

export const revalidate = 60

export async function GET(req: NextRequest) {
    const supabase = createClient()
    const url = new URL(req.url)
    const status = url.searchParams.get('status')?.split(',')
    const credit = url.searchParams.get('creditGt')
    validateSingleValue(status, z.nativeEnum(InvoiceStatus))
    validateSingleValue(credit, z.number())

    let query = supabase
        .from('invoice')
        .select('id, status, invoice_item( id, description ), total_amount, due_date, credit')

    if (credit) query = query.gt('credit', credit)

    if (status) query = query.in('status', status)

    const res = await query

    if (res.error) return NextResponse.json({ error: res.error }, { status: res.status, statusText: res.statusText })

    return NextResponse.json(res)
}