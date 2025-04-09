import Plus from "@/components/icons/Plus";
import Item, { RechargeOn, ItemRarity } from "@/utils/Item";
import PlayerCharacter from "@/utils/PlayerCharacter";
import Button, { ButtonType } from "../Inputs/Button";
import DropdownField from "../Inputs/DropdownField";
import MultilineTextInput from "../Inputs/MulitlineTextInput";
import NumInput from "../Inputs/NumInput";
import TextInput from "../Inputs/TextInput";

import { Dispatch, SetStateAction, useState } from "react";
import { Effect } from "@/utils/applyConditionalEffects";

type EffectBuilder = {
  target?: string;
  operation?: string;
  value?: string;
  condition?: string;
};

const CreateItem = ({
  character,
  setCharacter,
  setShowItemForm,
}: {
  character: PlayerCharacter;
  setCharacter: Dispatch<SetStateAction<PlayerCharacter | undefined>>;
  setShowItemForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [isMagicItem, setIsMagicItem] = useState(false);
  const [itemRarity, setItemRarity] = useState("Common");
  const [hasUses, setHasUses] = useState(false);
  const [itemUses, setItemUses] = useState<
    | {
        used: number;
        max: number;
        rechargeOn: RechargeOn;
      }
    | undefined
  >(undefined);
  const [itemEffects, setItemEffects] = useState<Effect[]>([]);
  const [newItemEffect, setNewItemEffect] = useState<EffectBuilder>({
    value: "",
    target: "",
    operation: "",
  });
  const [showEffectsInput, setShowEffectsInput] = useState(false);
  return (
    <div className="mt-4 p-4 border rounded bg-slate-100 dark:bg-slate-900">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowItemForm(false);
        }}
      >
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
                    ) as RechargeOn,
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
        <div className="flex justify-end gap-2 mt-2">
          <Button
            buttonType={ButtonType.default}
            color="red"
            onClick={() => {
              setShowItemForm(false);
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
              const newItem: Item = new Item(
                newItemTitle,
                [{ text: newItemText }],
                isMagicItem,
                itemRarity as ItemRarity,
                itemUses,
                undefined,
                itemEffects,
              );
              const newCharacter = new PlayerCharacter(
                undefined,
                undefined,
                undefined,
                character,
              );
              newCharacter.addItem(newItem);
              setCharacter(newCharacter);
              setNewItemTitle("");
              setNewItemText("");
              setShowItemForm(false);
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
            }}
          >
            Create Item
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
