"use client"

import { DEFAULT_URL } from "@/app/constants"
import { Invoice_DB } from "@/app/types"
import { PostgrestError } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export const useInvoices = () => {
    const [data, setData] = useState<Invoice_DB[]>([])
    const [error, setError] = useState<PostgrestError>()
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        setLoading(true)

        const fetchInvoices = async () => await fetch(`${DEFAULT_URL}/invoices/api/all`)
            .then(data => data.json())
            .then(({ error, data }) => {
                setData(data)
                setError(error)
            })
            .finally(() => setLoading(false))

        fetchInvoices()
    }, [])

    return { data, error, loading }
}