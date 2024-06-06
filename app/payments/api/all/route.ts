import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET() {
    const supabase = createClient()

    const res = await supabase.from('payment')
        .select('id, amount, invoice( id, status ), payment_date, payment_method')

    return NextResponse.json({ ...res })
}