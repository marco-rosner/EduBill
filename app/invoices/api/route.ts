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
    const formData = await request.formData()

    console.log('formData >>', formData)

    const supabase = createClient()
    const res = await supabase.from('invoice').insert(formData)

    console.log(res)

    return NextResponse.json({ ...res })
}