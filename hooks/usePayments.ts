"use client"

import { DEFAULT_URL } from "@/app/constants"
import { Payment_DB } from "@/app/types"
import { PostgrestError } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export const usePayments = () => {
    const [data, setData] = useState<Payment_DB[]>([])
    const [error, setError] = useState<PostgrestError>()
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        setLoading(true)

        const fetchPayments = async () => await fetch(`${DEFAULT_URL}/payments/api/all`)
            .then(data => data.json())
            .then(({ error, data }) => {
                setData(data)
                setError(error)
            })
            .finally(() => setLoading(false))

        fetchPayments()
    }, [])

    return { data, error, loading }
}