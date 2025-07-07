import CampaignDetails from "@/components/CampaignDetails";

const CampaignPage = async (props: { params: { id: string } }) => {
  const { id } = await props.params;
  return <CampaignDetails campaignID={id} />;
};

export default CampaignPage;
