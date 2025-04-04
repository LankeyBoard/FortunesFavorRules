import Plus from "@/components/icons/Plus";
import Item, { RechargeOn, ItemRarity } from "@/utils/Item";
import PlayerCharacter from "@/utils/PlayerCharacter";
import Button, { ButtonType } from "../Inputs/Button";
import DropdownField from "../Inputs/DropdownField";
import MultilineTextInput from "../Inputs/MulitlineTextInput";
import NumInput from "../Inputs/NumInput";
import TextInput from "../Inputs/TextInput";

import { Dispatch, SetStateAction, useState } from "react";

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
