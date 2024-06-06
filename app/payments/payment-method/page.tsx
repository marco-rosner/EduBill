import { PaymentForm } from "@/components/PaymentForm/PaymentForm";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";

const Payments = () => (
    <WrapperContent>
        <Title title="Payment Method" />
        <PaymentForm />
    </WrapperContent>
);

export default Payments
