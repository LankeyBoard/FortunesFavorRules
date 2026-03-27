import Plus from "@/components/icons/Plus";
import CharacterItem from "@/utils/CharacterItem";
import PlayerCharacter from "@/utils/PlayerCharacter";
import { Dispatch, SetStateAction, useState } from "react";
import Button, { ButtonType } from "../Inputs/Button";
import ItemCard from "../ItemCard";
import CreateItem, { ItemType } from "../Inputs/CreateItem";
import { BaseItem } from "@/utils/BaseItem";
import FillableBar, { FillableBarColor } from "../FillableBar";

type ItemCardSectionProps = {
  item: BaseItem;
  updateItemBuilder: (i: number) => (item: BaseItem) => void;
  deleteItemBuilder: (i: number) => () => void;
  isEditable: boolean;
  viewItemsOnly: boolean;
  i: number;
};

const ItemCardSection: React.FC<ItemCardSectionProps> = ({
  item,
  updateItemBuilder,
  deleteItemBuilder,
  isEditable,
  viewItemsOnly,
  i,
}) => {
  const [editItem, setEditItem] = useState(false);
  return (
    <>
      {editItem ? (
        <CreateItem
          addItemToParent={updateItemBuilder(i)}
          setShowItemForm={setEditItem}
          itemType={ItemType.CHARACTER_ITEM}
          initialItem={item}
        />
      ) : (
        <ItemCard
          key={item.title + item.id}
          item={item}
          isExpanded={false}
          updateItem={updateItemBuilder(i)}
          deleteItem={isEditable ? deleteItemBuilder(i) : undefined}
          viewOnly={viewItemsOnly}
        />
      )}
      {isEditable && (
        <div>
          <Button
            buttonType={ButtonType.default}
            color="amber"
            onClick={() => setEditItem(true)}
          >
            Edit Item
          </Button>
        </div>
      )}
    </>
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

  const upsertItemToCharacter = (item: CharacterItem) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );

    // If item has an id, try to find and replace existing item
    if (item && item.id) {
      const existingIndex = newCharacter.items.findIndex(
        (it) => it.id === item.id,
      );
      if (existingIndex !== -1) {
        newCharacter.items[existingIndex] = item;
      } else {
        newCharacter.addItem(item);
      }
    } else {
      // No id provided — add as new item
      newCharacter.addItem(item);
    }

    setCharacter(newCharacter);
  };

  return (
    <div className="pt-2">
      <h2 className="font-thin text-xl mx-auto text-center py-2 tracking-widest">
        {"Items"}
      </h2>
      {character.items.length > 0 ? (
        character.items.map((item, i) => (
          <ItemCardSection
            key={item.id + item.title}
            item={item}
            updateItemBuilder={updateItemBuilder}
            deleteItemBuilder={deleteItemBuilder}
            isEditable={isEditable}
            viewItemsOnly={viewItemsOnly}
            i={i}
          />
        ))
      ) : (
        <div>No items</div>
      )}
      <FillableBar
        currentValue={character.slotsUsed}
        maxValue={character.maxSlots}
        barColor={FillableBarColor.YELLOW}
        label="Slots"
        overLimitText="Overburdened"
        overflowAtMax={true}
      />
      {isEditable && (
        <div>
          {showItemForm ? (
            <CreateItem
              addItemToParent={(item) =>
                upsertItemToCharacter(item as CharacterItem)
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
