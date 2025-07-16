"use client";

import { gql } from "@apollo/client";
import client from "@/utils/graphQLclient";
import { useEffect, useState } from "react";
import FullPageLoading from "./FullPageLoading";

const MY_CAMPAIGNS_QUERY = gql`
  query MyCampaigns {
    myCampaigns {
      owned {
        id
        name
        description
        status
        startDate
        endDate
      }
      in {
        id
        name
        description
        status
        startDate
        endDate
      }
    }
  }
`;

type Campaign = {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate?: string | null;
};

type MyCampaignsResult = {
  myCampaigns: {
    owned: Campaign[];
    in: Campaign[];
  };
};

const MyCampaigns = () => {
  const [data, setData] = useState<MyCampaignsResult | undefined>(undefined);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({ query: MY_CAMPAIGNS_QUERY });
        setData(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    console.error(error);
    return <div>Error loading campaigns.</div>;
  }
  if (!data) {
    return <FullPageLoading />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Campaigns</h2>
      <div>
        <h3 className="text-xl font-semibold mt-4 mb-2">Owned Campaigns</h3>
        {data.myCampaigns.owned.length === 0 && <p>No owned campaigns.</p>}
        <ul>
          {data.myCampaigns.owned.map((campaign) => (
            <li key={campaign.id} className="mb-2">
              <strong>{campaign.name}</strong> ({campaign.status})<br />
              {campaign.description}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2">
          Participating Campaigns
        </h3>
        {data.myCampaigns.in.length === 0 && (
          <p>Not participating in any campaigns.</p>
        )}
        <ul>
          {data.myCampaigns.in.map((campaign) => (
            <li key={campaign.id} className="mb-2">
              <strong>{campaign.name}</strong> ({campaign.status})<br />
              {campaign.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyCampaigns;
