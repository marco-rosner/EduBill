import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export const revalidate = 60

export async function GET() {
    const supabase = createClient()

    const res = await supabase.from('invoice').select('id, status, total_amount, due_date')

    return NextResponse.json({ ...res })
}