"use client";

import { gql, useQuery, useMutation } from "@apollo/client";
import { use, useState } from "react";

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

const CampaignInvitePage = ({ params }: { params: { id: string } }) => {
  const campaignId = use(params.id);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null,
  );
  const [confirmed, setConfirmed] = useState(false);

  const { loading, error, data } = useQuery(GET_CAMPAIGN_AND_CHARACTERS, {
    variables: { campaignId },
  });

  const [
    addCharacterToCampaign,
    { loading: adding, error: addError, data: addData },
  ] = useMutation(ADD_CHARACTER_TO_CAMPAIGN);

  const handleConfirm = async () => {
    if (!selectedCharacter) return;
    await addCharacterToCampaign({
      variables: { campaignId, characterId: selectedCharacter },
    });
    setConfirmed(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading campaign or characters.</div>;

  const campaign = data.campaign;
  const characters = data.me?.characters ?? [];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">
        Invite to Campaign: {campaign.name}
      </h1>
      <p className="mb-4">{campaign.description}</p>
      <div className="mb-4">
        <label className="block font-semibold mb-2">
          Select a character to join:
        </label>
        <select
          className="w-full p-2 border rounded"
          value={selectedCharacter ?? ""}
          onChange={(e) => setSelectedCharacter(e.target.value)}
        >
          <option value="" disabled>
            -- Select Character --
          </option>
          {characters.map((char: { id: string; name: string }) => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      </div>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        disabled={!selectedCharacter || adding || confirmed}
        onClick={handleConfirm}
      >
        {adding ? "Joining..." : confirmed ? "Joined!" : "Join Campaign"}
      </button>
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
