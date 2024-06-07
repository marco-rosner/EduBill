"use client"

import { DEFAULT_URL } from "@/app/constants"
import { Invoice_DB } from "@/app/types"
import { PostgrestError } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

interface useInvoicesResponse {
    data: Invoice_DB[],
    error?: PostgrestError,
    loading: Boolean
}

export const useInvoice = (id: string): useInvoicesResponse => {
    const [data, setData] = useState<Invoice_DB[]>([])
    const [error, setError] = useState<PostgrestError>()
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        setLoading(true)

        const fetchInvoice = async () => await fetch(`${DEFAULT_URL}/invoices/api?id=${id}`)
            .then(data => data.json())
            .then(({ error, data }) => {
                setData(data)
                setError(error)
            })
            .finally(() => setLoading(false))

        fetchInvoice()
    }, [])

    return { data, error, loading }
}