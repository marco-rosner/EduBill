import { NextResponse } from "next/server"
import { z } from "zod"

export const validateSingleValue = (val: any, schema: z.ZodTypeAny) => {
    const { error, success } = schema.safeParse(val)

    if (!success)
        return NextResponse.json({ error: { message: error.format()._errors.toString() } }, { status: 400 })
}