import { InvoiceForm } from "@/components/InvoiceForm/InvoiceForm"
import { Title } from "@/components/Title/Title"
import { WrapperContent } from "@/components/WrapperContent/WrapperContent"

const InvoicePage = () => {
    return (
        <WrapperContent>
            <Title title="Invoice" />
            <InvoiceForm />
        </WrapperContent>
    )
}

export default InvoicePage