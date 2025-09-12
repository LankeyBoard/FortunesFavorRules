import Plus from "@/components/icons/Plus";
import CharacterItem from "@/utils/CharacterItem";
import Button, { ButtonType } from "./Button";
import DropdownField from "./DropdownField";
import MultilineTextInput from "./MulitlineTextInput";
import NumInput from "./NumInput";
import TextInput from "./TextInput";

import { Dispatch, SetStateAction, useState } from "react";
import { Effect } from "@/utils/applyConditionalEffects";
import { Rarity, RechargeOn } from "@/utils/enums";
import { BaseItem } from "@/utils/BaseItem";
import { ShopItem } from "@/utils/ItemShop";
import SmallField from "../SmallField";

type EffectBuilder = {
  target?: string;
  operation?: string;
  value?: string;
  condition?: string;
};

export enum ItemType {
  CHARACTER_ITEM,
  SHOP_ITEM,
}

const CreateItem = ({
  addItemToParent,
  setShowItemForm,
  itemType,
  initialItem,
}: {
  addItemToParent?: (item: BaseItem) => void;
  setShowItemForm?: Dispatch<SetStateAction<boolean>>;
  itemType?: ItemType;
  initialItem?: BaseItem;
}) => {
  const [newItemTitle, setNewItemTitle] = useState(initialItem?.title ?? "");

  const [newItemText, setNewItemText] = useState(
    initialItem?.text ? initialItem.text.map((t) => t.text).join("\n") : "",
  );
  const [isMagicItem, setIsMagicItem] = useState(initialItem?.isMagic ?? false);
  const [itemRarity, setItemRarity] = useState(initialItem?.rarity ?? "Common");
  const [hasUses, setHasUses] = useState(initialItem?.uses != undefined);
  const [itemUses, setItemUses] = useState<
    | {
        used: number;
        max: number;
        rechargeOn: RechargeOn;
      }
    | undefined
  >(initialItem?.uses);
  const [itemEffects, setItemEffects] = useState<Effect[]>(
    initialItem?.effects ?? [],
  );
  const [newItemEffect, setNewItemEffect] = useState<EffectBuilder>({
    value: "",
    target: "",
    operation: "",
  });
  const [showEffectsInput, setShowEffectsInput] = useState(false);
  const [inStock, setInStock] = useState(
    itemType === ItemType.SHOP_ITEM && initialItem && "inStock" in initialItem
      ? (initialItem as ShopItem).inStock
      : false,
  );
  const [tags, setTags] = useState<string[]>(initialItem?.tags ?? []);
  const [defaultPrice, setDefaultPrice] = useState(
    itemType === ItemType.SHOP_ITEM &&
      initialItem &&
      "defaultPrice" in initialItem
      ? (initialItem as ShopItem).defaultPrice
      : -1,
  );
  const [salePrice, setSalePrice] = useState(
    itemType === ItemType.SHOP_ITEM && initialItem && "salePrice" in initialItem
      ? (initialItem as ShopItem).salePrice
      : undefined,
  );
  const [slots, setSlots] = useState(
    initialItem?.slots ? initialItem.slots : 0,
  );
  const resetItemInputs = () => {
    setNewItemTitle("");
    setNewItemText("");
    setIsMagicItem(false);
    setItemRarity("Common");
    setItemUses(undefined);
    setHasUses(false);
    setItemEffects([]);
    setNewItemEffect({
      value: "",
      target: "",
      operation: "",
    });
    setInStock(false);
    setSlots(0);
  };

  return (
    <div className="mt-4 p-4 border rounded bg-slate-100 dark:bg-slate-900 max-w-lg">
      <div>
        <div>
          <TextInput
            placeholder="Item Title"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            required
          />
          <div className="w-full mt-2">
            <MultilineTextInput
              placeholder="Item Description"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="checkbox"
              checked={isMagicItem}
              onChange={(e) => setIsMagicItem(e.target.checked)}
            />
            <label>Magic Item</label>
          </div>
          {isMagicItem && (
            <DropdownField
              name="Item Rarity"
              options={[
                { title: "Common", value: "Common" },
                { title: "Uncommon", value: "Uncommon" },
                { title: "Rare", value: "Rare" },
                { title: "Legendary", value: "Legendary" },
                { title: "Unique", value: "Unique" },
              ]}
              onChange={(e) => {
                setItemRarity(e.target.value.slice("Item Rarity".length));
              }}
            />
          )}
          <SmallField label="Slots">
            <NumInput
              name="Slots"
              min={0}
              required={true}
              className="max-w-10"
              defaultValue={slots}
              onChange={(e) => setSlots(Number(e.target.value))}
            />
          </SmallField>
          <div>
            <input
              type="checkbox"
              checked={hasUses}
              onChange={(e) => {
                setHasUses(e.target.checked);
                if (e.target.checked)
                  setItemUses({
                    used: 0,
                    max: 0,
                    rechargeOn: RechargeOn.NONE,
                  });
                else setItemUses(undefined);
              }}
            />
            <label>Has uses</label>
          </div>
          {hasUses && (
            <div>
              <span className="text-sm font-semibold">Charges: </span>
              <NumInput
                defaultValue={0}
                onChange={(e) =>
                  setItemUses({
                    rechargeOn: itemUses?.rechargeOn || RechargeOn.NONE,
                    max: Number(e.target.value),
                    used: 0,
                  })
                }
                size={String(itemUses?.max).length}
              />
              <DropdownField
                name="Recharge On"
                options={[
                  { title: "None", value: RechargeOn.NONE },
                  {
                    title: "Catch Your Breath",
                    value: RechargeOn.CATCH_BREATH,
                  },
                  {
                    title: "Night's Rest",
                    value: RechargeOn.NIGHTS_REST,
                  },
                  {
                    title: "Rest and Recuperate",
                    value: RechargeOn.REST_AND_RECUPERATE,
                  },
                ]}
                onChange={(e) => {
                  setItemUses({
                    ...itemUses!,
                    rechargeOn: e.target.value.slice(
                      "RechargeOn".length + 1,
                    ) as unknown as RechargeOn,
                  });
                }}
              />
            </div>
          )}
          <div className="w-auto">
            <Button
              buttonType={ButtonType.simple}
              color="blue"
              onClick={() => setShowEffectsInput(!showEffectsInput)}
            >
              {showEffectsInput ? (
                <span>Hide Effects Input</span>
              ) : (
                <span>Show Effects Input</span>
              )}
            </Button>
            {showEffectsInput && (
              <div>
                <h3 className="font-semibold">Effects</h3>
                <div className="flex gap-2">
                  {itemEffects.map((effect, index) => {
                    return (
                      <div
                        key={index}
                        className="flex gap-2 bg-slate-200 dark:bg-slate-800 rounded p-2"
                      >
                        <span>{effect.target}</span>
                        <span>{effect.operation}</span>
                        <span>{effect.value}</span>
                        <span>{effect.condition}</span>
                      </div>
                    );
                  })}
                </div>
                <h3>Effect</h3>
                <div className="grid grid-cols-3 gap-2">
                  <DropdownField
                    name="Effect Target"
                    onChange={(e) => {
                      const newEffect = { ...newItemEffect };
                      newEffect.target = e.target.value;
                      setNewItemEffect(newEffect);
                    }}
                    options={[
                      "armor",
                      "deflect.dice",
                      "deflect.count",
                      "deflect.flat",
                      "maxHealth",
                      "maxStamina",
                      "counter",
                      "baseDamage.dice",
                      "baseDamage.count",
                      "baseDamage.stat",
                      "range.min",
                      "range.max",
                      "attack",
                      "deflectDice",
                    ]}
                  />
                  <DropdownField
                    name="Effect Operation"
                    onChange={(e) => {
                      const newEffect = { ...newItemEffect };
                      newEffect.operation = e.target.value;
                      setNewItemEffect(newEffect);
                    }}
                    options={["add", "subtract", "multiply", "divide", "set"]}
                  />
                  <NumInput
                    placeholder="Effect Value"
                    value={newItemEffect.value}
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const newEffect = { ...newItemEffect };
                      newEffect.value = e.target.value;
                      setNewItemEffect(newEffect);
                    }}
                  />
                </div>
                <Button
                  buttonType={ButtonType.default}
                  color="green"
                  onClick={() => {
                    if (
                      newItemEffect.target &&
                      newItemEffect.operation &&
                      newItemEffect.value
                    ) {
                      setItemEffects([
                        ...itemEffects,
                        {
                          target: newItemEffect.target,
                          operation: newItemEffect.operation,
                          value: Number(newItemEffect.value),
                          condition: newItemEffect.condition,
                        },
                      ]);
                      setNewItemEffect({
                        value: "",
                        target: "",
                        operation: "",
                      });
                    }
                  }}
                >
                  <div className="w-3 dark:fill-white fill-black">
                    <Plus />
                  </div>
                </Button>
              </div>
            )}
          </div>
        </div>
        {itemType === ItemType.SHOP_ITEM && (
          <div>
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => {
                setInStock(e.target.checked);
              }}
            />
            <label>Currently In Stock</label>
            <div className="flex flex-row">
              <div className="">
                <SmallField label="Base Price">
                  <NumInput
                    name="Base Price"
                    min={0}
                    required={true}
                    className="max-w-10"
                    defaultValue={
                      initialItem
                        ? (initialItem as ShopItem).defaultPrice
                        : undefined
                    }
                    onChange={(e) => setDefaultPrice(Number(e.target.value))}
                  />
                </SmallField>
              </div>
              <SmallField label="Sale Price">
                <NumInput
                  name="Sale Price"
                  min={0}
                  className="max-w-10"
                  defaultValue={
                    initialItem
                      ? (initialItem as ShopItem).salePrice
                      : undefined
                  }
                  onChange={(e) => setSalePrice(Number(e.target.value))}
                />
              </SmallField>
            </div>
          </div>
        )}
        <div className="flex justify-end gap-2 mt-2">
          <Button
            buttonType={ButtonType.default}
            color="red"
            onClick={() => {
              setShowItemForm?.(false);
            }}
            type="button"
          >
            Cancel
          </Button>
          <Button
            buttonType={ButtonType.default}
            color="green"
            type="submit"
            onClick={() => {
              if (itemType === ItemType.SHOP_ITEM) {
                const newItem: ShopItem = new ShopItem(
                  newItemTitle,
                  [{ text: newItemText }],
                  isMagicItem,
                  itemRarity as unknown as Rarity,
                  itemEffects,
                  tags,
                  defaultPrice,
                  inStock,
                  slots,
                  undefined,
                  itemUses,
                  salePrice && salePrice > -1 ? salePrice : undefined,
                );
                console.log("new item", newItem);

                addItemToParent?.(newItem);
              } else {
                const newItem: CharacterItem = new CharacterItem(
                  newItemTitle,
                  [{ text: newItemText }],
                  isMagicItem,
                  slots,
                  itemRarity as unknown as Rarity,
                  itemUses,
                  undefined,
                  itemEffects,
                );
                console.log("new item 2", newItem);
                addItemToParent?.(newItem);
              }
              resetItemInputs();
              setShowItemForm?.(false);
            }}
          >
            Save Item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
