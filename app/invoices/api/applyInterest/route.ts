import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 60

export async function GET(req: NextRequest) {
    const supabase = createClient()

    const res = await supabase.rpc("applyInterest")

    if (res.error) return NextResponse.json({ error: res.error }, { status: res.status, statusText: res.statusText })

    return NextResponse.json(res)
}