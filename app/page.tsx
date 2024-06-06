import ListInvoices from "@/components/ListInvoices/ListInvoices";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";

const Index = () => (
  <WrapperContent>
    <Title title="EduBill" />
    <ListInvoices title="Current invoices" nextStep="/invoice" />
  </WrapperContent>
);

export default Index
