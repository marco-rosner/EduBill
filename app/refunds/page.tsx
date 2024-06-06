import ListInvoices from "@/components/ListInvoices/ListInvoices";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";
import { InvoiceStatus } from "../types";

const Refunds = () => (
    <WrapperContent>
        <Title title="Refunds" />
        <ListInvoices
            title="Choose the invoice to refund"
            nextStep="/refunds/refund-reason"
            filters={{
                status: [InvoiceStatus.PAID, InvoiceStatus.PARTIALLY_REFUNDED],
                creditGt: 0
            }}
        />
    </WrapperContent>
);

export default Refunds
