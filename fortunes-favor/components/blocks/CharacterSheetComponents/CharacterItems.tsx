import Plus from "@/components/icons/Plus";
import CharacterItem from "@/utils/CharacterItem";
import PlayerCharacter from "@/utils/PlayerCharacter";
import { Dispatch, SetStateAction, useState } from "react";
import Button, { ButtonType } from "../Inputs/Button";
import ItemCard from "../ItemCard";
import CreateItem from "../Inputs/CreateItem";
import { BaseItem } from "@/utils/BaseItem";

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
    const updateItem = (item: BaseItem) => {
      const newCharacter = new PlayerCharacter(
        undefined,
        undefined,
        undefined,
        character,
      );
      newCharacter.items[i] = item as CharacterItem;
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

  const addItemToCharacter = (item: CharacterItem) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.addItem(item);
    setCharacter(newCharacter);
  };

  return (
    <div className="pt-2">
      <h2 className="font-thin text-xl mx-auto text-center py-2 tracking-widest">
        {"Items"}
      </h2>
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

      {isEditable && (
        <div>
          {showItemForm ? (
            <CreateItem
              addItemToParent={(item) =>
                addItemToCharacter(item as CharacterItem)
              }
              setShowItemForm={setShowItemForm}
            />
          ) : (
            <Button
              buttonType={ButtonType.default}
              color="green"
              onClick={() => setShowItemForm(!showItemForm)}
            >
              <div className="w-3 dark:fill-white fill-black">
                <Plus />
              </div>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterItems;
