import ForgotPassword from "@/components/ForgotPassword";

const ForgotPasswordPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const params = await props.params;
  const forgotPasswordId = params.id;
  return <ForgotPassword forgotPasswordId={forgotPasswordId} />;
};

export default ForgotPasswordPage;
