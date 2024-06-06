import ListInvoices from "@/components/ListInvoices/ListInvoices";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";

const Payments = () => (
  <WrapperContent>
    <Title title="Payments" />
    <ListInvoices title="Choose the invoice to pay" nextStep="/payments/payment-method" />
  </WrapperContent>
);

export default Payments
