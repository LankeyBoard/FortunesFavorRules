import Plus from "@/components/icons/Plus";
import Item, { ItemRarity, RechargeOn } from "@/utils/Item";
import PlayerCharacter from "@/utils/PlayerCharacter";
import { Dispatch, SetStateAction, useState } from "react";
import Button, { ButtonType } from "../Inputs/Button";
import LargeField from "../LargeField";
import TextInput from "../Inputs/TextInput";
import DropdownField from "../Inputs/DropdownField";
import ItemCard from "../ItemCard";
import MultilineTextInput from "../Inputs/MulitlineTextInput";
import NumInput from "../Inputs/NumInput";
import CreateItem from "./CreateItem";

const CharacterItems = ({
  character,
  setCharacter,
  isEditable,
}: {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isEditable: boolean;
}) => {
  const [showItemForm, setShowItemForm] = useState(false);
  const updateItemBuilder = (i: number) => {
    const updateItem = (item: Item) => {
      const newCharacter = new PlayerCharacter(
        undefined,
        undefined,
        undefined,
        character,
      );
      newCharacter.items[i] = item;
      setCharacter(newCharacter);
    };
    return updateItem;
  };

  const deleteItemBuilder = (i: number) => {
    const deleteItem = () => {
      const newCharacter = new PlayerCharacter(
        undefined,
        undefined,
        undefined,
        character,
      );
      newCharacter.items.splice(i, 1);
      setCharacter(newCharacter);
    };
    return deleteItem;
  };

  return (
    <div className="p-4">
      <LargeField label="Items">
        {character.items.length > 0 ? (
          character.items.map((item, i) => (
            <ItemCard
              key={item.title + item.id}
              item={item}
              isExpanded={false}
              updateItem={updateItemBuilder(i)}
              deleteItem={isEditable ? deleteItemBuilder(i) : undefined}
            />
          ))
        ) : (
          <div>No items</div>
        )}
      </LargeField>
      {isEditable && (
        <div>
          <Button
            buttonType={ButtonType.default}
            color="green"
            onClick={() => setShowItemForm(!showItemForm)}
          >
            <div className="w-3 dark:fill-white fill-black">
              <Plus />
            </div>
          </Button>
          {showItemForm && (
            <CreateItem character={character} setCharacter={setCharacter} />
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterItems;
