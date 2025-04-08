import { useEffect, useState } from "react";
import TextBlock from "./TextBlock";
import Item, { ItemRarity, RechargeOn } from "@/utils/Item";
import Button, { ButtonType } from "./Inputs/Button";
import Trash from "../icons/Trash";

const ItemCharges = (uses: {
  used: number;
  max: number;
  rechargeOn: RechargeOn;
}) => {
  const squares = [];
  for (let i = 0; i < uses.max; i++) {
    squares.push(
      <div
        key={i}
        className={`w-4 h-4 m-1 ${
          i < uses.used ? "bg-gray-400" : "bg-amber-400"
        }`}
      ></div>,
    );
  }

  return <div className="flex">{squares}</div>;
};

type ItemCardProps = {
  item: Item;
  isExpanded: boolean;
  updateItem?: (item: Item) => void;
  deleteItem?: () => void;
};

const ItemCardTitle = ({ item }: { item: Item }) => {
  let titleStyle = "flex p-2 mt-2 ";
  if (!item.isMagic) {
    titleStyle += "bg-slate-300 dark:bg-slate-700";
  } else {
    switch (item.rarity) {
      case ItemRarity.COMMON:
        titleStyle += "bg-gray-400 dark:bg-gray-600";
        break;
      case ItemRarity.UNCOMMON:
        titleStyle += "bg-green-300 dark:bg-green-800";
        break;
      case ItemRarity.RARE:
        titleStyle += "bg-blue-300 dark:bg-blue-800";
        break;
      case ItemRarity.LEGENDARY:
        titleStyle += "bg-purple-300 dark:bg-purple-800";
        break;
      case ItemRarity.UNIQUE:
        titleStyle += "bg-orange-300 dark:bg-orange-800";
        break;
      default:
        titleStyle += "bg-red-300 dark:bg-red-800"; // Fallback color
    }
  }
  return (
    <div className={titleStyle}>
      <h1 className="text-lg font-semibold float-left grow">{item.title}</h1>
      {item.uses && (
        <div className="float-right">
          <ItemCharges
            used={item.uses.used}
            max={item.uses.max}
            rechargeOn={item.uses.rechargeOn}
          />
        </div>
      )}
      {item.isMagic && <h3 className="float-right">{item.rarity}</h3>}
    </div>
  );
};

const ItemCard = ({
  item,
  isExpanded,
  updateItem,
  deleteItem,
}: ItemCardProps) => {
  const [cardItem, setItem] = useState(item);
  const [isOpen, setOpen] = useState(isExpanded);
  useEffect(() => {
    setOpen(isExpanded);
  }, [isExpanded]);

  const choiceStyle =
    "p-2 odd:bg-slate-300 dark:odd:bg-slate-700 cursor-pointer hover:border-2 hover:border-amber-300 hover:dark:border-amber-700 hover:bg-slate-200 hover:dark:bg-slate-800";
  const selectedChoiceStyle = choiceStyle + " border-2 border-amber-500";
  const deselectedChoiceStyle =
    choiceStyle +
    " border-2 border-gray-100 dark:border-gray-900 odd:border-slate-300 odd:dark:border-slate-700";
  if (!isOpen) {
    return (
      <div
        className="pb-3 hover:cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <ItemCardTitle item={cardItem} />
      </div>
    );
  }
  return (
    <>
      <div className="pb-2 bg-slate-50 dark:bg-slate-800 mb-4">
        <div onClick={() => setOpen(false)} className="hover:cursor-pointer">
          <ItemCardTitle item={cardItem} />
        </div>

        <div className="clear-both mx-2">
          {cardItem.uses && (
            <div>
              {cardItem.uses.rechargeOn !== RechargeOn.NONE ? (
                <div>
                  <p>
                    <span>Charges: </span>
                    {cardItem.uses.max - cardItem.uses.used} /{" "}
                    {cardItem.uses.max}
                  </p>
                  <p>
                    <span>Recharge: </span>
                    {cardItem.uses.rechargeOn}
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    <span>Uses: </span>
                    {cardItem.uses.max - cardItem.uses.used} /{" "}
                    {cardItem.uses.max}
                  </p>
                  <p>
                    <span>Consumable </span>
                  </p>
                </div>
              )}
            </div>
          )}

          <TextBlock text={cardItem.text} style="px-4" />
          <div>
            {cardItem.effects && cardItem.effects.length > 0 && (
              <div className="px-4">
                <h3 className="font-semibold">Effects:</h3>
                <ul className="list-inside">
                  {cardItem.effects.map((effect, index) => (
                    <li
                      key={index}
                      className="flex gap-2 bg-slate-300 dark:bg-slate-700 rounded p-2"
                    >
                      <span>{effect.target}</span>
                      <span>{effect.operation}</span>
                      <span>{effect.value}</span>
                      <span>{effect.condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-2 mx-2 -pb-2">
          {deleteItem && (
            <Button buttonType={ButtonType.icon} onClick={deleteItem}>
              <Trash color="red" />
            </Button>
          )}
          {cardItem.uses && cardItem.uses.used < cardItem.uses.max && (
            <>
              <div>
                <Button
                  buttonType={ButtonType.simple}
                  color="green"
                  onClick={() => {
                    const newItem = new Item(
                      cardItem.title,
                      cardItem.text,
                      cardItem.isMagic,
                      cardItem.rarity,
                      cardItem.uses,
                      cardItem.id,
                      cardItem.effects,
                    );
                    newItem.use();
                    if (updateItem) updateItem(newItem);
                    setItem(newItem);
                  }}
                >
                  Use
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemCard;
