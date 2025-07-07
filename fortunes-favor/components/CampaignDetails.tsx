"use client";

import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import client from "@/utils/graphQLclient";
import FullPageLoading from "@/components/FullPageLoading";
import Markdown from "react-markdown";
import Button, { ButtonType } from "./blocks/Inputs/Button";
import DropdownField from "./blocks/Inputs/DropdownField";
import Link from "next/link";
import useAlert from "@/hooks/useAlert";

const GET_CAMPAIGN = gql`
  query GetCampaign($id: ID!) {
    campaign(id: $id) {
      id
      name
      description
      status
      startDate
      endDate
      owner {
        id
      }
      shops {
        id
        name
        description
      }
      characters {
        id
        name
      }
    }
    me {
      id
    }
  }
`;

const GET_MY_SHOPS = gql`
  query GetMyShops {
    me {
      id
      createdShops {
        id
        name
      }
    }
  }
`;

const ADD_SHOP_TO_CAMPAIGN = gql`
  mutation AddShopToCampaign($campaignId: ID!, $shopId: ID!) {
    addShopToCampaign(campaignId: $campaignId, shopId: $shopId) {
      id
      shops {
        id
        name
        description
      }
    }
  }
`;

const CampaignDetails = ({ campaignID }: { campaignID: string }) => {
  const [campaign, setCampaign] = useState<any>(null);
  const [me, setMe] = useState<any>(null);
  const [loadingError, setLoadingError] = useState<any>(null);
  const [showAddShop, setShowAddShop] = useState(false);
  const [myShops, setMyShops] = useState<any[]>([]);
  const [selectedShop, setSelectedShop] = useState<string>("");
  const [addShopError, setAddShopError] = useState<string | null>(null);
  const [addingShop, setAddingShop] = useState(false);

  const { setAlert } = useAlert();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data } = await client.query({
          query: GET_CAMPAIGN,
          variables: { id: campaignID },
          fetchPolicy: "no-cache",
        });
        setCampaign(data.campaign);
        setMe(data.me);
      } catch (error) {
        setLoadingError(error);
      }
    };
    fetchCampaign();
  }, [campaignID]);

  const handleShowAddShop = async () => {
    setShowAddShop(true);
    setAddShopError(null);
    try {
      const { data } = await client.query({
        query: GET_MY_SHOPS,
        fetchPolicy: "no-cache",
      });
      setMyShops(data.me?.createdShops || []);
    } catch (error) {
      console.error(error);
      setAddShopError("Failed to load your shops.");
    }
  };

  const handleAddShop = async () => {
    console.log(campaignID, selectedShop);
    if (!selectedShop) return;
    setAddingShop(true);
    setAddShopError(null);
    try {
      const { data } = await client.mutate({
        mutation: ADD_SHOP_TO_CAMPAIGN,
        variables: { campaignId: campaignID, shopId: selectedShop },
      });
      setCampaign((prev: any) => ({
        ...prev,
        shops: data.addShopToCampaign.shops,
      }));
      setShowAddShop(false);
      setSelectedShop("");
    } catch (error: any) {
      console.error(error);
      setAddShopError("Failed to add shop to campaign.");
    } finally {
      setAddingShop(false);
    }
  };

  if (loadingError)
    return <div>Error loading campaign. {String(loadingError)}</div>;
  if (!campaign) return <FullPageLoading />;

  const isOwner = me && campaign.owner && me.id === campaign.owner.id;

  return (
    <div className="pb-20">
      <h2 className="font-thin text-xl mx-auto text-center p-4 dark:bg-teal-900 bg-teal-100 rounded-t-lg">
        {campaign.name}
      </h2>
      <div className="bg-slate-200 dark:bg-slate-950 rounded-lg shadow-md flex flex-col md:grid md:grid-cols-2 md:gap-2">
        <div className="bg-slate-50 dark:bg-slate-900 p-4 order-2 md:order-1">
          <div className="mb-4">
            <span className="font-semibold">Status:</span> {campaign.status}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Start Date:</span>{" "}
            {campaign.startDate}
            {campaign.endDate && (
              <>
                {" | "}
                <span className="font-semibold">End Date:</span>{" "}
                {campaign.endDate}
              </>
            )}
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2">Shops in Campaign</h2>
              {isOwner && (
                <Button
                  buttonType={ButtonType.default}
                  color="blue"
                  className="ml-2 text-sm"
                  onClick={handleShowAddShop}
                  disabled={showAddShop}
                >
                  Add Shop
                </Button>
              )}
            </div>
            {campaign.shops.length === 0 ? (
              <p>No shops in this campaign.</p>
            ) : (
              <ul className="list-disc ml-6">
                {campaign.shops.map((shop: any) => (
                  <Link
                    key={shop.id}
                    href={`/shop/${shop.id}`}
                    className="p-4 max-w-md border-2 border-teal-500 block"
                  >
                    <h1 className="text-xl font-bold text-center">
                      {shop.name}
                    </h1>
                    <p>{shop.description}</p>
                  </Link>
                ))}
              </ul>
            )}
            {showAddShop && (
              <div className="mt-4 p-2 border rounded bg-slate-100 dark:bg-slate-800">
                <label className="block mb-2 font-semibold">
                  Select one of your shops to add:
                </label>
                <DropdownField
                  name="Select Shop"
                  options={myShops.map((shop) => ({
                    title: shop.name,
                    slug: shop.id,
                  }))}
                  defaultValue={selectedShop}
                  onChange={(e) => setSelectedShop(e.target.value)}
                  unselectedOption={true}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    buttonType={ButtonType.default}
                    color="green"
                    onClick={handleAddShop}
                    disabled={!selectedShop || addingShop}
                  >
                    {addingShop ? "Adding..." : "Add"}
                  </Button>
                  <Button
                    buttonType={ButtonType.default}
                    color="gray"
                    onClick={() => setShowAddShop(false)}
                    disabled={addingShop}
                  >
                    Cancel
                  </Button>
                </div>
                {addShopError && (
                  <div className="text-red-600 mt-2">{addShopError}</div>
                )}
              </div>
            )}
            {isOwner && (
              <Link href="/shop/builder" className="flex justify-center my-2">
                <Button
                  buttonType={ButtonType.default}
                  color="green"
                  className="text-sm"
                >
                  Create Shop
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900 p-4 order-1 md:order-2">
          <div className="mb-2">
            <Markdown>{campaign.description}</Markdown>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Characters in Campaign
            </h2>
            {campaign.characters.length === 0 ? (
              <p>No characters in this campaign.</p>
            ) : (
              <ul className="list-disc ml-6">
                {campaign.characters.map((char: any) => (
                  <li key={char.id}>{char.name}</li>
                ))}
              </ul>
            )}
            {isOwner && (
              <Button
                buttonType={ButtonType.default}
                color="green"
                className="text-sm"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/campaign/${campaignID}/invite`,
                  );
                  setAlert("Link copied", "none");
                }}
              >
                Copy Invite Link
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
