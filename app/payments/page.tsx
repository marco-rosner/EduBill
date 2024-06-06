import ListInvoices from "@/components/ListInvoices/ListInvoices";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";
import { InvoiceStatus } from "../types";

const Payments = () => (
  <WrapperContent>
    <Title title="Payments" />
    <ListInvoices
      title="Choose the invoice to pay"
      nextStep="/payments/payment-method"
      filters={{
        status: [InvoiceStatus.PENDING, InvoiceStatus.PARTIALLY_PAID]
      }}
    />
  </WrapperContent>
);

export default Payments
