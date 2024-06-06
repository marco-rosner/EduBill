import ListInvoices from "@/components/ListInvoices/ListInvoices";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";

const Refunds = () => (
    <WrapperContent>
        <Title title="Refunds" />
        <ListInvoices title="Choose the invoice to refund" nextStep="/refunds/refund-reason" />
    </WrapperContent>
);

export default Refunds
