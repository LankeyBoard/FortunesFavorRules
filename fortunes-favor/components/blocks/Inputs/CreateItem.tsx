import Plus from "@/components/icons/Plus";
import CharacterItem from "@/utils/CharacterItem";
import Button, { ButtonType } from "./Button";
import DropdownField from "./DropdownField";
import MultilineTextInput from "./MulitlineTextInput";
import NumInput from "./NumInput";
import TextInput from "./TextInput";

import { Dispatch, SetStateAction, useState } from "react";
import { Effect } from "@/utils/applyConditionalEffects";
import { findEnumValue, Rarity, RechargeOn } from "@/utils/enums";
import { BaseItem } from "@/utils/BaseItem";
import { ShopItem } from "@/utils/ItemShop";
import SmallField from "../SmallField";
import useAlert from "@/hooks/useAlert";
import { AlertType } from "@/contexts/AlertContext";
import Trash from "@/components/icons/Trash";
import Save from "@/components/icons/Save";

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
  const {setAlert} = useAlert();
  const [newItemTitle, setNewItemTitle] = useState(initialItem?.title ?? "");

  const [newItemText, setNewItemText] = useState(
    initialItem?.text ? initialItem.text.map((t) => t.text).join("\n") : "",
  );
  const [isMagicItem, setIsMagicItem] = useState(initialItem?.isMagic ?? false);
  const [itemRarity, setItemRarity] = useState(
    initialItem?.rarity ?? Rarity.COMMON,
  );
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
  const defaultEffect: EffectBuilder = {
    value: "",
    target: "armor",
    operation: "add",
  };
  const [newItemEffect, setNewItemEffect] = useState<EffectBuilder>(defaultEffect);
  const [showEffectsInput, setShowEffectsInput] = useState(!!itemEffects.length);
  const [stockCount, setStockCount] = useState(
    itemType === ItemType.SHOP_ITEM && initialItem && "count" in initialItem
      ? (initialItem as ShopItem).count
      : 0,
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
    setItemRarity(Rarity.COMMON);
    setItemUses(undefined);
    setHasUses(false);
    setItemEffects([]);
    setNewItemEffect(defaultEffect);
    setStockCount(0);
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
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
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
                options={Object.keys(Rarity).map((key) => {
                  return Rarity[key as keyof typeof Rarity];
                })}
                value={itemRarity}
                onChange={(e) => {
                  console.log(e.target.value);
                  const newRarity: Rarity = findEnumValue(e.target.value, Rarity);
                  console.log("rarity: ", newRarity);
                  setItemRarity(newRarity);
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
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
              <div className="flex-none">
                
                <DropdownField
                  name="Recharge On"
                  value={itemUses?.rechargeOn}
                  options={Object.keys(RechargeOn).map((key) => {
                    return RechargeOn[key as keyof typeof RechargeOn];
                  })}
                  onChange={(e) => {
                    setItemUses({
                      ...itemUses!,
                      rechargeOn: e.target.value as RechargeOn,
                    });
                  }}
                />
                <div className="mt-2">
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
                  </div>
              </div>
            )}
          </div>
          </div>
          <div>
            <input
              type="checkbox"
              checked={showEffectsInput || itemEffects.length > 0}
              onChange={(e) => {
                setShowEffectsInput(e.target.checked || itemEffects.length > 0);
              }}
            />
            <label>Has effect(s)</label>
          </div>
          <div className="w-auto">
            {itemEffects.length > 0 && (<>
                <h3 className="font-semibold">Effects</h3>
                <div className="flex gap-2 flex-1 flex-wrap">
                  {itemEffects.map((effect, index) => {
                    return (
                      <div
                        key={index}
                        className="flex gap-2 bg-slate-200 dark:bg-slate-800 rounded p-2"
                      >
                        <span>{effect.operation}</span>
                        <span>{effect.value}</span>
                        <span>{effect.target}</span>
                        <span>{effect.condition}</span>
                        <Button
                          buttonType={ButtonType.icon}
                          color="red"
                          onClick={() => {
                            const newEffects = [...itemEffects];
                            newEffects.splice(index, 1);
                            setItemEffects(newEffects);
                          }}
                        >
                          <Trash color="red" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
                </>)}
            {showEffectsInput && (
              <div>
                <h3>Effect</h3>
                <div className="flex flex-wrap items-center gap-2 w-full bg-slate-200 dark:bg-slate-800 rounded p-2">
                  <DropdownField
                    name="Effect Target"
                    className="flex-none"
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
                    className="flex-none"
                    onChange={(e) => {
                      const newEffect = { ...newItemEffect };
                      newEffect.operation = e.target.value;
                      setNewItemEffect(newEffect);
                    }}
                    options={["add", "subtract", "multiply", "divide", "set"]}
                  />
                  <NumInput
                    placeholder="Value"
                    value={newItemEffect.value}
                    required
                    pattern="[0-9]*"
                    className="flex-1 min-w-0 h-[40px] self-end"
                    onChange={(e) => {
                      const newEffect = { ...newItemEffect };
                      newEffect.value = e.target.value;
                      setNewItemEffect(newEffect);
                    }}
                  />
                  <Button
                  buttonType={ButtonType.default}
                  color="green"
                  className="h-[40px] self-end"
                  onClick={() => {
                    if (
                      newItemEffect.target &&
                      newItemEffect.operation &&
                      newItemEffect.value
                    ) {
                      console.log("adding effect", newItemEffect);
                      setItemEffects([
                        ...itemEffects,
                        {
                          target: newItemEffect.target,
                          operation: newItemEffect.operation,
                          value: Number(newItemEffect.value),
                          condition: newItemEffect.condition,
                        },
                      ]);
                      setNewItemEffect(defaultEffect);
                    }
                    else {
                      console.log("effect not complete", newItemEffect);
                      setAlert("Effect must have a value!", AlertType.WARNING);
                    }
                  }}
                >
                  <div className="w-3 dark:fill-white fill-black">
                    <Plus />
                  </div>
                </Button>
                </div>
                
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
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
          {itemType === ItemType.SHOP_ITEM && (
            <div>
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
                <SmallField label="Stock">
                  <NumInput
                    name="Stock Count"
                    min={0}
                    className="max-w-10"
                    required={true}
                    defaultValue={
                      initialItem
                        ? (initialItem as ShopItem).count
                        : undefined
                    }
                    onChange={(e) => setStockCount(Number(e.target.value))}
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
              disabled={!newItemTitle || !newItemText || !defaultPrice || (hasUses && !itemUses?.max)}
              onClick={() => {
                if (itemType === ItemType.SHOP_ITEM) {
                  const newItem: ShopItem = new ShopItem(
                    newItemTitle,
                    [{ text: newItemText }],
                    isMagicItem,
                    itemRarity,
                    itemEffects,
                    tags,
                    defaultPrice,
                    stockCount,
                    slots,
                    initialItem?.id,
                    itemUses,
                    salePrice && salePrice > -1 ? salePrice : undefined,
                  );
                  console.log("new Shop item", newItem);

                  addItemToParent?.(newItem);
                } else {
                  const newItem: CharacterItem = new CharacterItem(
                    newItemTitle,
                    [{ text: newItemText }],
                    isMagicItem,
                    slots,
                    itemRarity,
                    itemUses,
                    initialItem?.id,
                    itemEffects,
                  );
                  console.log("new character item", newItem);
                  addItemToParent?.(newItem);
                }
                resetItemInputs();
                setShowItemForm?.(false);
              }}
            >
              <span className="flex items-center gap-2">
                <span>Save Item</span>
                <Save className="h-4 w-4 shrink-0" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
