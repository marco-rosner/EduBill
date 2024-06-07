"use client"

import { InvoiceForm } from "@/components/InvoiceForm/InvoiceForm"
import { Title } from "@/components/Title/Title"
import { WrapperContent } from "@/components/WrapperContent/WrapperContent"
import { useInvoice } from "@/hooks/useInvoice"
import { useParams } from "next/navigation"

const InvoicePage = () => {
    const params = useParams<{ invoiceId: string }>()
    const { data, loading, error } = useInvoice(params.invoiceId)

    if (error) return <>Error: {error.message}</>

    if (loading) return <>Loading...</>

    return (
        <WrapperContent>
            <Title title="Invoice" />
            <InvoiceForm invoiceDB={data} />
        </WrapperContent>
    )
}

export default InvoicePage