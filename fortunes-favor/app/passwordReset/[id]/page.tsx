import { use } from "react";

const ForgotPasswordPage = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
  const campaignId = params.id;
};

export default ForgotPasswordPage;
