import ListPayments from "@/components/ListPayments/ListPayments";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";

const ListPayment = () => (
    <WrapperContent>
        <Title title="Payments" />
        <ListPayments />
    </WrapperContent>
);

export default ListPayment
