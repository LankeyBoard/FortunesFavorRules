import { useState } from "react";
import Button, { ButtonType } from "./Inputs/Button";
import DropdownField from "./Inputs/DropdownField";
import { gql, useMutation } from "@apollo/client";

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
type BuyItemButtonProps = {
  charactersInCampaign: { name: string; id: string; coin: number }[];
  item: { price: number; id?: string };
  shopId: string;
};

const BuyItemButton: React.FC<BuyItemButtonProps> = ({
  charactersInCampaign,
  item,
  shopId,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState(
    charactersInCampaign.at(0),
  );
  const [showSelectCharacter, setShowSelectCharacter] = useState(false);
  const [sellError, setSellError] = useState<string | null>(null);
  const [sellItem, { loading: selling }] = useMutation(SELL_ITEM_MUTATION);
  const handleSell = async () => {
    if (!selectedCharacter) {
      console.warn("No character selected, cannot buy item.");
      return;
    }
    setSellError(null);
    try {
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
    } catch (e) {
      console.log("error handling sell", e);
      setSellError("Failed to buy item.");
    }
  };
  if (!item.id) {
    console.warn("Cannot show buy button for item without id", item);
    return;
  }
  return (
    <div className="p-2">
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
                <div className="text-red-600  my-auto">Not enough Coin</div>
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
        </>
      ) : (
        <Button
          buttonType={ButtonType.default}
          color="green"
          type="button"
          onClick={() => setShowSelectCharacter(true)}
        >
          Buy
        </Button>
      )}
      {sellError && (
        <div className="text-red-600 text-sm mt-1">{sellError}</div>
      )}
    </div>
  );
};

export default BuyItemButton;
