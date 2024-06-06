"use client"

import { DEFAULT_URL } from "@/app/constants"
import { InvoiceStatus, Invoice_DB } from "@/app/types"
import { PostgrestError } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

interface useInvoicesResponse {
    data: Invoice_DB[],
    error?: PostgrestError,
    loading: Boolean
}

export const useInvoices = (status: InvoiceStatus[] | undefined, credit: Number | undefined): useInvoicesResponse => {
    const [data, setData] = useState<Invoice_DB[]>([])
    const [error, setError] = useState<PostgrestError>()
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        setLoading(true)

        let URL = `${DEFAULT_URL}/invoices/api/all`

        if (status) URL = `${URL}?status=${status.toString()}`
        if (Number(credit) >= 0) URL = `${URL}&creditGt=${credit}`

        const fetchInvoices = async () => await fetch(URL)
            .then(data => data.json())
            .then(({ error, data }) => {
                setData(data)
                setError(error)
            })
            .finally(() => setLoading(false))

        if (status) fetchInvoices()
    }, [status, credit])

    return { data, error, loading }
}