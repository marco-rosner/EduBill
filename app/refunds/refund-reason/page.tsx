import { RefundForm } from "@/components/RefundForm/RefundForm";
import { Title } from "@/components/Title/Title";
import { WrapperContent } from "@/components/WrapperContent/WrapperContent";

const RefundReason = () => (
    <WrapperContent>
        <Title title="Refund Reason" />
        <RefundForm />
    </WrapperContent>
);

export default RefundReason
