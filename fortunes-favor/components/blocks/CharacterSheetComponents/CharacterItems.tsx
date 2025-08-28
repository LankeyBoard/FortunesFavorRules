import Plus from "@/components/icons/Plus";
import CharacterItem from "@/utils/CharacterItem";
import PlayerCharacter from "@/utils/PlayerCharacter";
import { Dispatch, SetStateAction, useState } from "react";
import Button, { ButtonType } from "../Inputs/Button";
import ItemCard from "../ItemCard";
import CreateItem from "../Inputs/CreateItem";
import { BaseItem } from "@/utils/BaseItem";

const SlotBar = ({
  slotsUsed,
  maxSlots,
}: {
  slotsUsed: number;
  maxSlots: number;
}) => {
  const percent = Math.min((slotsUsed / maxSlots) * 100, 100);
  const overLimit = slotsUsed > maxSlots;
  const barColor = overLimit ? "bg-red-500" : "bg-amber-400";

  return (
    <div className="w-full max-w-xs mx-auto my-2">
      <div className="flex justify-between mb-1 text-xs font-semibold">
        <span>
          Slots: {slotsUsed}/{maxSlots}
        </span>
        {overLimit && <span>Over burdened</span>}
      </div>
      <div className="w-full h-4 bg-gray-300 dark:bg-black rounded overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

const CharacterItems = ({
  character,
  setCharacter,
  isEditable,
  viewItemsOnly = true,
}: {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  isEditable: boolean;
  viewItemsOnly?: boolean;
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
            viewOnly={viewItemsOnly}
          />
        ))
      ) : (
        <div>No items</div>
      )}
      <SlotBar slotsUsed={character.slotsUsed} maxSlots={character.maxSlots} />
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
