import { PaymentForm } from "@/components/PaymentForm/PaymentForm";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";

const PaymentMethod = () => (
    <WrapperContent>
        <Title title="Payment Method" />
        <PaymentForm />
    </WrapperContent>
);

export default PaymentMethod
