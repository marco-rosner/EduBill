"use client"

import { DEFAULT_URL } from "@/app/constants"
import { Refund_DB } from "@/app/types"
import { PostgrestError } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export const useRefunds = () => {
    const [data, setData] = useState<Refund_DB[]>([])
    const [error, setError] = useState<PostgrestError>()
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        setLoading(true)

        const fetchRefunds = async () => await fetch(`${DEFAULT_URL}/refunds/api/all`)
            .then(data => data.json())
            .then(({ error, data }) => {
                setData(data)
                setError(error)
            })
            .finally(() => setLoading(false))

        fetchRefunds()
    }, [])

    return { data, error, loading }
}