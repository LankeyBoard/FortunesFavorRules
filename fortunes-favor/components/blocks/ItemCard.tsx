"use client";

import { useEffect, useState } from "react";
import TextBlock from "./TextBlock";
import CharacterItem from "@/utils/CharacterItem";
import Button, { ButtonType } from "./Inputs/Button";
import Trash from "../icons/Trash";
import { BaseItem } from "@/utils/BaseItem";
import { RechargeOn, Rarity } from "@/utils/enums";
import { isShopItem } from "@/utils/ItemShop";

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
  item: BaseItem;
  isExpanded: boolean;
  updateItem?: (item: BaseItem) => void;
  showDetails?: boolean;
  viewOnly?: boolean;
};

const ItemCardTitle = ({
  item,
  showDetails,
}: {
  item: BaseItem;
  showDetails: boolean;
}) => {
  let titleStyle = "flex p-2 mt-2 ";
  if (!item.isMagic) {
    titleStyle += "bg-slate-300 dark:bg-slate-700";
  } else {
    switch (item.rarity) {
      case Rarity.COMMON:
        titleStyle += "bg-gray-400 dark:bg-gray-600";
        break;
      case Rarity.UNCOMMON:
        titleStyle += "bg-green-300 dark:bg-green-800";
        break;
      case Rarity.RARE:
        titleStyle += "bg-blue-300 dark:bg-blue-800";
        break;
      case Rarity.LEGENDARY:
        titleStyle += "bg-purple-300 dark:bg-purple-800";
        break;
      case Rarity.UNIQUE:
        titleStyle += "bg-orange-300 dark:bg-orange-800";
        break;
      default:
        titleStyle += "bg-red-300 dark:bg-red-800"; // Fallback color
    }
  }

  return (
    <div className={titleStyle}>
      <h1 className="text-lg font-semibold float-left grow">{item.title}</h1>
      <div className="flex flex-row">
        {showDetails && isShopItem(item) && (
          <>
            {item.onSale && (
              <p className="px-2 underline underline-offset-2 decoration-red-500">
                On Sale!
              </p>
            )}
            <div className="bg-yellow-400 text-black px-2 py-1 rounded">
              {item.onSale ? item.salePrice : item.defaultPrice} Coin
            </div>
          </>
        )}
      </div>
      {item.uses && (
        <div className="float-right">
          <ItemCharges
            used={item.uses.used}
            max={item.uses.max}
            rechargeOn={item.uses.rechargeOn}
          />
        </div>
      )}
      {item.isMagic && (
        <h3 className="ml-2 float-right capitalize">
          {item.rarity?.toString().toLowerCase()}
        </h3>
      )}
    </div>
  );
};

const ItemCard = ({
  item,
  isExpanded,
  updateItem,
  showDetails,
  viewOnly = true,
}: ItemCardProps) => {
  const [cardItem, setItem] = useState(item);
  const [isOpen, setOpen] = useState(isExpanded);
  useEffect(() => {
    setOpen(isExpanded);
  }, [isExpanded]);

  if (!isOpen) {
    return (
      <div
        className="pb-3 hover:cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <ItemCardTitle item={cardItem} showDetails={showDetails || false} />
      </div>
    );
  }
  return (
    <>
      <div className="pb-2 bg-slate-50 dark:bg-slate-800 mb-4">
        <div onClick={() => setOpen(false)} className="hover:cursor-pointer">
          <ItemCardTitle item={cardItem} showDetails={showDetails || false} />
        </div>

        <div className="clear-both mx-2">
          {cardItem.uses && (
            <div>
              <div>
                <span>
                  <span>Charges: </span>
                  {cardItem.uses.max - cardItem.uses.used} /{" "}
                  {cardItem.uses.max}
                </span>
                <span className="mr-2 float-right">
                  {cardItem.uses.rechargeOn.toString() !== RechargeOn.NONE ?
                  <span>Recharge: {cardItem.uses.rechargeOn}</span>
                  : <span>Consumable</span>}
                </span>
              </div>
            </div>
          )}

          <TextBlock text={cardItem.text} style="px-4" />
          
          {!viewOnly &&
            cardItem.uses &&
            cardItem.uses.used < cardItem.uses.max && (
              <>
                <div className="mr-2 ml-auto align-items-right">
                  <Button
                    buttonType={ButtonType.simple}
                    color="green"
                    className="mr-2 ml-auto"
                    onClick={() => {
                      const newItem = new CharacterItem(
                        cardItem.title,
                        cardItem.text,
                        cardItem.isMagic,
                        cardItem.slots,
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
        {item.effects && item.effects.length > 0 && (
          <div className="px-4">
            <h3 className="font-semibold">Effects:</h3>
            <ul className="list-inside">
              {item.effects.map((effect, index) => (
                <li
                  key={index}
                  className="flex gap-2 bg-slate-300 dark:bg-slate-700 rounded p-2"
                >
                  <span>{effect.operation}</span>
                  <span>{effect.value}</span>
                  <span>{effect.target}</span>
                  <span>{effect.condition}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div id="slots" className="m-2 font-light text-sm text-gray-600 dark:text-gray-400">
          <p>
            <span>Slots: </span> {cardItem.slots}
          </p>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
