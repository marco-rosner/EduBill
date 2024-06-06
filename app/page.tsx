import ListInvoices from "@/components/ListInvoices/ListInvoices";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";
import { InvoiceStatus } from "./types";

const Index = () => (
  <WrapperContent>
    <Title title="EduBill" />
    <ListInvoices
      title="Current invoices"
      nextStep="/invoice"
      filters={{ status: [InvoiceStatus.PENDING] }}
      hasMenu />
  </WrapperContent>
);

export default Index
