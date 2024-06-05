import ListInvoices from "@/components/ListInvoices/ListInvoices";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";

const Index = () => (
  <WrapperContent>
    <Title title="EduBill" />
    <ListInvoices />
  </WrapperContent>
);

export default Index
