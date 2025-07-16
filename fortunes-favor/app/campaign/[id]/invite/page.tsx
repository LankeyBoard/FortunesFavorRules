"use client";

import { gql, useMutation } from "@apollo/client";
import { use, useEffect, useState } from "react";
import client from "@/utils/graphQLclient";
import DropdownField from "@/components/blocks/Inputs/DropdownField";
import Button, { ButtonType } from "@/components/blocks/Inputs/Button";
import FullPageLoading from "@/components/FullPageLoading";

const GET_CAMPAIGN_AND_CHARACTERS = gql`
  query GetCampaignAndCharacters($campaignId: ID!) {
    campaign(id: $campaignId) {
      id
      name
      description
      status
      startDate
      endDate
    }
    me {
      id
      characters {
        id
        name
      }
    }
  }
`;

const ADD_CHARACTER_TO_CAMPAIGN = gql`
  mutation AddCharacterToCampaign($campaignId: ID!, $characterId: ID!) {
    addCharacterToCampaign(campaignId: $campaignId, characterId: $characterId) {
      id
      characters {
        id
        name
      }
    }
  }
`;

const CampaignInvitePage = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
  const campaignId = params.id;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null,
  );
  const [confirmed, setConfirmed] = useState(false);

  const [
    addCharacterToCampaign,
    { loading: adding, error: addError, data: addData },
  ] = useMutation(ADD_CHARACTER_TO_CAMPAIGN);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await client.query({
          query: GET_CAMPAIGN_AND_CHARACTERS,
          variables: { campaignId },
          fetchPolicy: "no-cache",
        });
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [campaignId]);

  const handleConfirm = async () => {
    if (!selectedCharacter) return;
    await addCharacterToCampaign({
      variables: { campaignId, characterId: selectedCharacter },
    });
    setConfirmed(true);
  };

  if (loading) return <FullPageLoading />;
  if (error) return <div>Error loading campaign or characters.</div>;

  const campaign = data.campaign;
  const characters = data.me?.characters ?? [];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-2">
        Invited to Campaign: {campaign.name}
      </h1>
      <p className="mb-4">{campaign.description}</p>
      <div className="mb-4">
        <label className="block font-semibold mb-2">
          Select a character to add to the campaign:
        </label>
        <DropdownField
          name="character"
          options={characters.map((char: { id: string; name: string }) => ({
            title: char.name,
            slug: char.id,
          }))}
          defaultValue={selectedCharacter ?? ""}
          onChange={(e) => setSelectedCharacter(e.target.value)}
          unselectedOption={true}
        />
      </div>
      <Button
        buttonType={ButtonType.default}
        color="blue"
        disabled={!selectedCharacter || adding || confirmed}
        onClick={handleConfirm}
      >
        {adding ? "Joining..." : confirmed ? "Joined!" : "Join Campaign"}
      </Button>
      {addError && (
        <div className="text-red-600 mt-2">Error joining campaign.</div>
      )}
      {confirmed && (
        <div className="text-green-600 mt-2">Character added to campaign!</div>
      )}
    </div>
  );
};

export default CampaignInvitePage;
