import ListRefunds from "@/components/ListRefunds/ListRefunds";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";

const ListPayment = () => (
    <WrapperContent>
        <Title title="Refunds" />
        <ListRefunds />
    </WrapperContent>
);

export default ListPayment
