import { useState } from "react";
import Button, { ButtonType } from "./Inputs/Button";
import DropdownField from "./Inputs/DropdownField";
import { gql, useMutation } from "@apollo/client";
import { Maybe } from "graphql/jsutils/Maybe";
import { ShopItem } from "@/utils/ItemShop";
import FullPageLoading from "../FullPageLoading";
import SmallLoading from "./SmallLoading";

const SELL_ITEM_MUTATION = gql`
  mutation SellItem($shopId: ID!, $itemId: ID!, $characterId: ID!) {
    sellItem(shopId: $shopId, itemId: $itemId, characterId: $characterId) {
      id
      itemsInStock {
        id
        title
      }
    }
  }
`;

type Character = { name: string; id: string; coin: number };
type BuyItemButtonProps = {
  charactersInCampaign: Character[];
  item: ShopItem;
  shopId: string;
};

const BuyItemButton: React.FC<BuyItemButtonProps> = ({
  charactersInCampaign,
  item,
  shopId,
}) => {
  const [selectedCharacter, setSelectedCharacter] =
    useState<Maybe<Character>>(null);
  const [showSelectCharacter, setShowSelectCharacter] = useState(false);
  const [sellError, setSellError] = useState<string | null>(null);
  const [sellItem, { loading: selling }] = useMutation(SELL_ITEM_MUTATION);
  const [loading, setLoading] = useState(false);
  const handleSell = async () => {
    if (!selectedCharacter) {
      console.warn("No character selected, cannot buy item.");
      return;
    }
    setSellError(null);
    try {
      setLoading(true);
      await sellItem({
        variables: {
          shopId,
          itemId: item.id,
          characterId: selectedCharacter.id,
        },
      });
      setShowSelectCharacter(false);
      setSelectedCharacter(undefined);
      window.location.reload();
      setLoading(false);
    } catch (e) {
      console.log("error handling sell", e);
      setLoading(false);
      setSellError("Failed to buy item.");
    }
  };
  if (!item.id) {
    console.warn("Cannot show buy button for item without id", item);
    return;
  }
  if (item.count < 1) {
    console.error("Trying to sell item with count of 0", item);
  }
  if (loading) return <SmallLoading />;
  return (
    <div className="px-2 pb-2 -mt-4">
      {showSelectCharacter ? (
        <>
          <div className="flex flex-row">
            {charactersInCampaign ? (
              <div>
                {charactersInCampaign.length > 1 && (
                  <DropdownField
                    name="character"
                    options={charactersInCampaign.map((char) => ({
                      title: `${char.name} - ${char.coin} coin`,
                      slug: char.id,
                    }))}
                    onChange={(e) =>
                      setSelectedCharacter(
                        charactersInCampaign.find(
                          (character) => character.id === e.target.value,
                        ),
                      )
                    }
                    unselectedOption={true}
                  />
                )}
                {charactersInCampaign.length === 1 && (
                  <>
                    <p className="font-light text-center w-full">Character</p>
                    <span className="font-bold">
                      {charactersInCampaign[0].name}
                    </span>
                    <span> {charactersInCampaign[0].coin} coin</span>
                  </>
                )}
              </div>
            ) : (
              <p>No characters in this campaign!</p>
            )}
            <div className="flex flex-row gap-1">
              {selectedCharacter && selectedCharacter.coin >= item.price ? (
                <Button
                  buttonType={ButtonType.default}
                  color={
                    selectedCharacter && selectedCharacter.coin >= item.price
                      ? "green"
                      : "red"
                  }
                  type="button"
                  disabled={
                    !selectedCharacter || selectedCharacter.coin < item.price
                  }
                  onClick={handleSell}
                >
                  Add to Character
                </Button>
              ) : (
                selectedCharacter &&
                selectedCharacter?.coin < item.price && (
                  <div className="text-red-600 my-auto">Not enough Coin</div>
                )
              )}
              <Button
                buttonType={ButtonType.default}
                color="gray"
                type="button"
                onClick={() => {
                  setSelectedCharacter(undefined);
                  setShowSelectCharacter(false);
                  setSellError(null);
                }}
                disabled={selling}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-between items-center gap-4">
          {item.count < 10 ? (
            <span>In Stock: {item.count}</span>
          ) : (
            <span>plenty</span>
          )}
          <Button
            buttonType={ButtonType.default}
            color="green"
            type="button"
            onClick={() => setShowSelectCharacter(true)}
          >
            Buy
          </Button>
        </div>
      )}
      {sellError && (
        <div className="text-red-600 text-sm mt-1">{sellError}</div>
      )}
    </div>
  );
};

export default BuyItemButton;
