import EncounterRunner from "@/components/pages/EncounterRunner";
import VerifyLogin from "@/components/VerifyLogin";

const EncounterPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <VerifyLogin>
      <EncounterRunner id={params.id} />
    </VerifyLogin>
  );
};

export default EncounterPage;
