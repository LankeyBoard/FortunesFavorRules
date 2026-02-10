"use client";
import React, { useState } from "react";
import { ItemShop, ShopItem, ShopItemInput } from "@/utils/ItemShop";
import CreateItem, { ItemType } from "./blocks/Inputs/CreateItem";
import ItemCard from "./blocks/ItemCard";
import { useMutation } from "@apollo/client";
import CREATE_SHOP_MUTATION from "@/utils/graphQLMutations/CreateShopMutation";
import { useRouter } from "next/navigation";
import Button, { ButtonType } from "./blocks/Inputs/Button";
import { findEnumKey, Rarity, RechargeOn } from "@/utils/enums";
import Trash from "./icons/Trash";
import UPDATE_SHOP_MUTATION, {
  UpdateShopInputType,
} from "@/utils/graphQLMutations/UpdateShopMutation";
import { BaseItem } from "@/utils/BaseItem";
import FullPageLoading from "./FullPageLoading";

const exampleItems: ShopItemInput[] = [
  {
    title: "Example Item",
    text: [{ text: "This is an example item." }],
    isMagic: false,
    rarity: Rarity.COMMON,
    uses: { used: 0, max: 3, rechargeOn: RechargeOn.NIGHTS_REST },
    effects: [
      {
        target: "maxHealth",
        operation: "add",
        value: 2,
        condition: "level > 2",
      },
    ],
    tags: ["starter", "demo"],
    salePrice: 1,
    inStock: false,
    defaultPrice: 2,
    slots: 1,
  },
  {
    title: "Another Example",
    text: [{ text: "Another example item." }],
    isMagic: true,
    rarity: Rarity.RARE,
    uses: { used: 1, max: 5, rechargeOn: RechargeOn.CATCH_BREATH },
    effects: [
      {
        target: "maxStamina",
        operation: "multiply",
        value: 2,
      },
    ],
    tags: ["rare", "magic"],
    defaultPrice: 5,
    salePrice: 4,
    inStock: true,
    slots: 0,
  },
];

type ShopItemCardProps = {
  item: ShopItem;
  deleteItem: () => void;
  updateItem: (item: ShopItem | BaseItem) => void;
};

const ShopItemCard: React.FC<ShopItemCardProps> = ({
  item,
  deleteItem,
  updateItem,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  if (isEditing) {
    return (
      <CreateItem
        initialItem={item}
        itemType={ItemType.SHOP_ITEM}
        addItemToParent={updateItem}
        setShowItemForm={() => setIsEditing(false)}
      />
    );
  } else
    return (
      <div>
        <div
          className=""
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ItemCard item={item} isExpanded={true} showDetails />
        </div>

        <div className="flex flex-row gap-1 mt-2">
          <Button buttonType={ButtonType.icon} onClick={deleteItem}>
            <Trash color="red" />
          </Button>
          <Button
            buttonType={ButtonType.default}
            color="blue"
            onClick={() => setIsEditing(true)}
          >
            Edit Item
          </Button>
        </div>
      </div>
    );
};

const TrimItemForGraphQL = (item: ShopItem) => {
  const { inStock, onSale, ...trimmedItem } = item;
  trimmedItem.text = trimmedItem.text.map((text) => {
    return {
      text: text.text,
      type: text.type,
    };
  });
  if (trimmedItem.uses && typeof trimmedItem.uses === "object") {
    const trimmedUses = trimmedItem.uses;
    delete trimmedUses.__typename;
    const rechargeOn = findEnumKey(
      trimmedUses.rechargeOn,
      RechargeOn,
    ) as unknown as RechargeOn;
    trimmedUses.rechargeOn = rechargeOn || trimmedUses.rechargeOn;
    trimmedItem.uses = trimmedUses;
  }
  const rarity = findEnumKey(trimmedItem.rarity, Rarity) ?? Rarity.COMMON;
  if (!rarity)
    console.warn("Rarity not found for item, set to common", trimmedItem);
  console.log("Trimmed item for graphQL", trimmedItem);
  return {
    ...trimmedItem,
    rarity: rarity,
  };
};

const ItemShopToGraphQLInput = (shop: ItemShop): UpdateShopInputType => {
  let inputBuilder: any = { ...shop };
  console.log("unprocessed graph inputs", inputBuilder);
  inputBuilder.itemsInStock = inputBuilder.itemsInStock.map(
    (item: ShopItem) => {
      return TrimItemForGraphQL(item);
    },
  );
  inputBuilder.itemsCouldStock = inputBuilder.itemsCouldStock.map(
    (item: ShopItem) => {
      return TrimItemForGraphQL(item);
    },
  );

  console.log(inputBuilder);

  // Runtime type check for UpdateShopInputType
  const isUpdateShopInputType = (input: any): input is UpdateShopInputType => {
    return (
      typeof input === "object" &&
      typeof input.name === "string" &&
      typeof input.description === "string" &&
      Array.isArray(input.itemsInStock) &&
      Array.isArray(input.itemsCouldStock)
    );
  };

  if (isUpdateShopInputType(inputBuilder)) {
    return inputBuilder;
  } else {
    throw new Error("Input builder is not of type UpdateShopInputType");
  }
};

// Validate a ShopItem and return an array of reasons why it's invalid (empty = valid)
const validateShopItem = (item: any): string[] => {
  const reasons: string[] = [];
  if (typeof item !== "object" || item === null) {
    reasons.push("Item is not an object");
    return reasons;
  }
  if (typeof item.title !== "string")
    reasons.push("Missing or invalid `title` (string expected)");
  if (!Array.isArray(item.text))
    reasons.push("Missing or invalid `text` (array expected)");
  if (typeof item.isMagic !== "boolean")
    reasons.push("Missing or invalid `isMagic` (boolean expected)");
  if (!Object.values(Rarity).includes(item.rarity))
    reasons.push(
      `Missing or invalid ` +
        "`rarity`" +
        ` (expected one of: ${Object.keys(Rarity).join(", ")})`,
    );

  if (item.uses !== undefined) {
    if (typeof item.uses !== "object") {
      reasons.push("`uses` must be an object when provided");
    } else {
      if (typeof item.uses.used !== "number")
        reasons.push("`uses.used` must be a number");
      if (typeof item.uses.max !== "number")
        reasons.push("`uses.max` must be a number");
      if (!Object.values(RechargeOn).includes(item.uses.rechargeOn))
        reasons.push("`uses.rechargeOn` is missing or invalid");
    }
  }

  if (!Array.isArray(item.effects))
    reasons.push("Missing or invalid `effects` (array expected)");
  if (!Array.isArray(item.tags))
    reasons.push("Missing or invalid `tags` (array expected)");
  if (typeof item.defaultPrice !== "number")
    reasons.push("Missing or invalid `defaultPrice` (number expected)");
  if (item.salePrice !== undefined && typeof item.salePrice !== "number")
    reasons.push("`salePrice` must be a number when provided");
  if (typeof item.inStock !== "boolean")
    reasons.push("Missing or invalid `inStock` (boolean expected)");

  return reasons;
};

// Function to handle uploaded JSON file and return valid ShopItems plus invalid item reasons
const parseShopItemsFromFile = async (
  file: File,
): Promise<{
  itemsInStock: ShopItem[];
  itemsCouldStock: ShopItem[];
  invalidItems: { index: number; item: any; reasons: string[] }[];
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        console.log(text);
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
          reject(new Error("JSON is not an array"));
          return;
        }

        // Ensure each item has 'effects' and 'tags' keys and try to normalize rarity
        parsed.forEach((item) => {
          if (
            typeof item === "object" &&
            item !== null &&
            typeof item.rarity === "string"
          ) {
            const mapped = Rarity[item.rarity as keyof typeof Rarity];
            if (mapped !== undefined) item.rarity = mapped;
          }
          if (!("effects" in item)) item.effects = [];
          if (!("tags" in item)) item.tags = [];
        });

        const validItems: ShopItem[] = [];
        const invalidItems: { index: number; item: any; reasons: string[] }[] =
          [];

        parsed.forEach((item: any, idx: number) => {
          const reasons = validateShopItem(item);
          if (reasons.length === 0) validItems.push(item as ShopItem);
          else invalidItems.push({ index: idx, item, reasons });
        });

        if (invalidItems.length > 0)
          console.error("invalid items uploaded: ", invalidItems);

        const itemsInStock = validItems.filter((item) => item.inStock);
        const itemsCouldStock = validItems.filter((item) => !item.inStock);
        console.log("items from file", itemsCouldStock, itemsInStock);
        resolve({ itemsInStock, itemsCouldStock, invalidItems });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};

type ShopBuilderProps = {
  initialShop?: ItemShop;
  extraSubmitEffect?: (shop: ItemShop) => void;
  extraCancelEffect?: () => void;
};

const ShopBuilder = ({
  initialShop,
  extraSubmitEffect,
  extraCancelEffect,
}: ShopBuilderProps) => {
  const [shopName, setShopName] = useState(initialShop?.name ?? "");
  const [shopDescription, setShopDescription] = useState(
    initialShop?.description ?? "",
  );
  const [itemsInStock, setItemsInStock] = useState<ShopItem[]>(
    initialShop?.itemsInStock ?? [],
  );
  const [itemsCouldStock, setItemsCouldStock] = useState<ShopItem[]>(
    initialShop?.itemsCouldStock ?? [],
  );
  const [inputFileItemsInStock, setFileItemsInStock] = useState<ShopItem[]>([]);
  const [inputFileItemsCouldStock, setFileItemsCouldStock] = useState<
    ShopItem[]
  >([]);
  const [fileUploadErrors, setFileUploadErrors] = useState<
    { index: number; item: any; reasons: string[] }[]
  >([]);
  const [CreateShop] = useMutation(CREATE_SHOP_MUTATION);
  const [UpdateShop] = useMutation(UPDATE_SHOP_MUTATION);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const router = useRouter();

  const AddItemToShop = (item: ShopItem) => {
    if (item.inStock) {
      setItemsInStock([...itemsInStock, item]);
    } else {
      setItemsCouldStock([...itemsCouldStock, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newShop = new ItemShop(
      shopName,
      shopDescription,
      itemsInStock,
      itemsCouldStock,
      initialShop?.id,
    );
    console.log("submitted Shop", newShop);
    let errored = false;
    let data;
    if (newShop.id) {
      try {
        setLoading(true);
        const result = await UpdateShop({
          variables: {
            id: newShop.id,
            itemShopInput: ItemShopToGraphQLInput(newShop),
          },
        });
        data = result.data;
        if (extraSubmitEffect) extraSubmitEffect(newShop);
        setLoading(false);
      } catch (error) {
        console.error(error);
        errored = true;
      }
    } else {
      try {
        const result = await CreateShop({
          variables: {
            itemShopInput: ItemShopToGraphQLInput(newShop),
          },
        });

        data = result.data;
        console.log("shop created", data);
        if (!data.createShop.id)
          throw new Error("Error creating new Item Shop");
      } catch (error) {
        console.error(error);
        errored = true;
        if (error instanceof Error)
          setErrorMessage(`Error of type: ${error.name} occurred.`);
      }
      if (!errored) {
        // Reset form inputs
        setShopName("");
        setShopDescription("");
        setItemsInStock([]);
        setItemsCouldStock([]);
        if (extraSubmitEffect) extraSubmitEffect(newShop);
        if (!newShop.id) router.push(`/shop/${data.createShop.id}`);
      }
    }
    setLoading(false);
  };

  const [showCreateItem, setShowCreateItem] = useState(false);
  if (loading) return <FullPageLoading />;
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Shop Builder</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Shop Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2 ">Shop Description</label>
          <textarea
            value={shopDescription}
            onChange={(e) => setShopDescription(e.target.value)}
            className="w-full p-2 border rounded "
            required
          />
        </div>

        <div className="mb-4">
          <div className="mb-3 w-96">
            <label
              htmlFor="formFile"
              className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
            >
              Upload Shop Items
            </label>
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:text-neutral-100 dark:focus:border-primary file:bg-blue-400 file:dark:bg-blue-700 hover:file:bg-blue-500 hover:file:dark:bg-blue-600 file:border-blue-300 file:dark:border-blue-700 file:hover:border-blue-500 cursor-pointer"
              type="file"
              id="formFile"
              accept="application/json"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  const { itemsCouldStock, itemsInStock, invalidItems } =
                    await parseShopItemsFromFile(file);
                  setFileItemsCouldStock((prev) => [
                    ...prev,
                    ...itemsCouldStock,
                  ]);
                  setFileItemsInStock((prev) => [...prev, ...itemsInStock]);
                  setFileUploadErrors(invalidItems);
                } catch (err) {
                  const message = (err as Error).message || "Unknown error";
                  setFileUploadErrors([
                    { index: -1, item: null, reasons: [message] },
                  ]);
                  alert("Failed to parse JSON file: " + message);
                }
              }}
            />
          </div>

          {fileUploadErrors.length > 0 && (
            <div className="mt-2 text-sm text-red-700 dark:text-red-300">
              <div className="font-semibold mb-1">
                Invalid items in uploaded file:
              </div>
              {fileUploadErrors.map((err) => (
                <div
                  key={err.index}
                  className="mb-2 p-2 border rounded bg-red-50 dark:bg-red-900/20"
                >
                  <div className="font-medium">
                    {err.index === -1 ? "File Error" : `Item ${err.index + 1}`}:
                  </div>
                  <ul className="list-disc list-inside mt-1">
                    {err.reasons.map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <a
            href={`data:application/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(exampleItems, null, 2),
            )}`}
            download="example-shop-items.json"
            className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200 mb-2 block w-max"
          >
            Download example JSON file
          </a>
          <Button
            buttonType={ButtonType.default}
            color="blue"
            onClick={() => {
              setShowCreateItem(!showCreateItem);
            }}
          >
            {showCreateItem ? "Hide Item Builder" : "Show Item Builder"}
          </Button>
          {showCreateItem && (
            <CreateItem
              addItemToParent={(item) => AddItemToShop(item as ShopItem)}
              itemType={ItemType.SHOP_ITEM}
              setShowItemForm={() => setShowCreateItem(false)}
            />
          )}
        </div>
        <div className="mb-4 flex gap-2">
          <Button
            buttonType={ButtonType.default}
            color="red"
            onClick={(e) => {
              e.preventDefault();
              setFileItemsInStock([]);
              setFileItemsCouldStock([]);
            }}
          >
            Reset Uploaded File Items
          </Button>
        </div>
        <div className="mt-6 mb-4">
          {inputFileItemsInStock && (
            <h2 className="text-lg font-bold mb-2">File: Items In Stock</h2>
          )}
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {inputFileItemsInStock.map((item, index) => (
              <div
                key={item.title + item.id + "fileInStock"}
                className="relative"
              >
                <ShopItemCard
                  item={item}
                  deleteItem={() => {
                    setFileItemsInStock((prev) =>
                      prev.filter((_, i) => i !== index),
                    );
                  }}
                  updateItem={(newItem) => {
                    if ("inStock" in newItem && !newItem.inStock) {
                      setFileItemsInStock((prev) =>
                        prev.filter((_, i) => i !== index),
                      );
                      setFileItemsCouldStock((prev) => {
                        prev.push(newItem as ShopItem);
                        return prev;
                      });
                    } else {
                      setFileItemsInStock((prev) =>
                        prev.map((it, i) =>
                          i === index ? (newItem as ShopItem) : it,
                        ),
                      );
                    }
                  }}
                />
                <Button
                  buttonType={ButtonType.default}
                  color="green"
                  className="absolute bottom-2 right-2"
                  onClick={() => {
                    setItemsInStock((prev) => [...prev, item]);
                    setFileItemsInStock((prev) =>
                      prev.filter((_, i) => i !== index),
                    );
                  }}
                >
                  Add to Shop
                </Button>
              </div>
            ))}
          </ul>
          {inputFileItemsInStock && (
            <h2 className="text-lg font-bold mt-4 mb-2">
              File: Items Could Stock
            </h2>
          )}
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {inputFileItemsCouldStock.map((item, index) => (
              <div
                key={item.title + item.id + "fileCouldStock"}
                className="relative"
              >
                <ShopItemCard
                  item={item}
                  deleteItem={() => {
                    setFileItemsCouldStock((prev) =>
                      prev.filter((_, i) => i !== index),
                    );
                  }}
                  updateItem={(newItem) => {
                    if ("inStock" in newItem && newItem.inStock) {
                      setFileItemsCouldStock((prev) =>
                        prev.filter((_, i) => i !== index),
                      );
                      setFileItemsInStock((prev) => {
                        prev.push(newItem as ShopItem);
                        return prev;
                      });
                    } else {
                      setFileItemsCouldStock((prev) =>
                        prev.map((it, i) =>
                          i === index ? (newItem as ShopItem) : it,
                        ),
                      );
                    }
                  }}
                />
                <Button
                  buttonType={ButtonType.default}
                  color="green"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setItemsCouldStock((prev) => [...prev, item]);
                    setFileItemsCouldStock((prev) =>
                      prev.filter((_, i) => i !== index),
                    );
                  }}
                >
                  Add to Shop
                </Button>
              </div>
            ))}
          </ul>
        </div>
        <div className="mt-6 mb-4">
          <h2 className="text-lg font-bold mb-2">Items In Stock</h2>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {itemsInStock.map((item, index) => (
              <ShopItemCard
                key={item.title + item.id}
                item={item}
                deleteItem={() => {
                  setItemsInStock((prev) => prev.filter((_, i) => i !== index));
                }}
                updateItem={(newItem) => {
                  if ((newItem as ShopItem).inStock) {
                    setItemsInStock((prev) =>
                      prev.map((it, i) =>
                        i === index ? (newItem as ShopItem) : it,
                      ),
                    );
                  } else {
                    setItemsInStock((prev) =>
                      prev.filter((_, i) => i !== index),
                    );
                    setItemsCouldStock((prev) => [
                      ...prev,
                      newItem as ShopItem,
                    ]);
                  }
                }}
              />
            ))}
            {itemsInStock.length === 0 && <div>No Items</div>}
          </ul>
          <h2 className="text-lg font-bold mt-4 mb-2">Items Could Stock</h2>
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {itemsCouldStock.map((item, index) => (
              <ShopItemCard
                key={item.title + item.id}
                item={item}
                deleteItem={() => {
                  setItemsCouldStock((prev) =>
                    prev.filter((_, i) => i !== index),
                  );
                }}
                updateItem={(newItem) => {
                  if (!(newItem as ShopItem).inStock) {
                    setItemsCouldStock((prev) =>
                      prev.map((it, i) =>
                        i === index ? (newItem as ShopItem) : it,
                      ),
                    );
                  } else {
                    setItemsCouldStock((prev) =>
                      prev.filter((_, i) => i !== index),
                    );
                    setItemsInStock((prev) => [...prev, newItem as ShopItem]);
                  }
                }}
              />
            ))}
            {itemsCouldStock.length === 0 && <div>No Items</div>}
          </ul>
        </div>
        <div>
          <Button
            buttonType={ButtonType.default}
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.delete("editing");
              window.history.replaceState({}, "", url.toString());
              if (extraCancelEffect) extraCancelEffect();
            }}
            color="red"
          >
            Cancel
          </Button>
          <Button
            buttonType={ButtonType.default}
            onClick={() => setShowCreateItem(false)}
            type="submit"
            color="green"
          >
            {initialShop?.id ? "Update Shop" : "Create Shop"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShopBuilder;
