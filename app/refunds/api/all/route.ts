import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET() {
    const supabase = createClient()

    const res = await supabase.from('refund')
        .select('id, amount, invoice( id, status ), refund_date, reason')
    if (res.error) return NextResponse.json({ error: res.error }, { status: res.status, statusText: res.statusText })

    return NextResponse.json(res)
}