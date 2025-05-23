"use client";
import React, { useState } from "react";
import { ItemShop, ShopItem, ShopItemInput } from "@/utils/ItemShop";
import CreateItem, { ItemType } from "./blocks/Inputs/CreateItem";
import ItemCard from "./blocks/ItemCard";
import { useMutation } from "@apollo/client";
import CREATE_SHOP_MUTATION from "@/utils/graphQLMutations/CreateShopMutation";
import { useRouter } from "next/navigation";
import Button, { ButtonType } from "./blocks/Inputs/Button";
import { Rarity, RechargeOn } from "@/utils/enums";
import Trash from "./icons/Trash";
import UPDATE_SHOP_MUTATION, {
  UpdateShopInputType,
} from "@/utils/graphQLMutations/UpdateShopMutation";
import { BaseItem } from "@/utils/BaseItem";

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
  },
];

type ShopItemCardProps = {
  item: ShopItem;
  deleteItem: () => void;
  updateItem: (item: BaseItem) => void;
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
          className="cursor-pointer"
          onClick={() => {
            setIsEditing(true);
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

const ItemShopToGraphQLInput = (shop: ItemShop): UpdateShopInputType => {
  console.log(shop);
  let inputBuilder: any = { ...shop };
  console.log("unprocessed graph inputs", inputBuilder);
  inputBuilder.itemsInStock = inputBuilder.itemsInStock.map(
    (item: ShopItem) => {
      const { inStock, ...trimmedItem } = item;
      trimmedItem.text = trimmedItem.text.map((text) => {
        const { __typename, ...trimmedText } = text;
        return trimmedText;
      });
      return {
        ...trimmedItem,
        rarity: item.rarity.toString().toUpperCase(),
      };
    },
  );
  inputBuilder.itemsCouldStock = inputBuilder.itemsCouldStock.map(
    (item: ShopItem) => {
      const { inStock, salePrice, ...trimmedItem } = item;
      trimmedItem.text = trimmedItem.text.map((text) => {
        const { __typename, ...trimmedText } = text;
        return trimmedText;
      });
      return {
        ...trimmedItem,
        rarity: item.rarity.toString().toUpperCase(),
      };
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

// Utility function to validate if an object is a valid ShopItem
const isValidShopItem = (item: any): item is ShopItem => {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof item.title === "string" &&
    Array.isArray(item.text) &&
    typeof item.isMagic === "boolean" &&
    Object.values(Rarity).includes(item.rarity) &&
    (item.uses === undefined ||
      (typeof item.uses === "object" &&
        typeof item.uses.used === "number" &&
        typeof item.uses.max === "number" &&
        Object.values(RechargeOn).includes(item.uses.rechargeOn))) &&
    Array.isArray(item.effects) &&
    Array.isArray(item.tags) &&
    typeof item.defaultPrice === "number" &&
    (typeof item.salePrice === "number" || item.salePrice === undefined) &&
    typeof item.inStock === "boolean"
  );
};

// Function to handle uploaded JSON file and return valid ShopItems
const parseShopItemsFromFile = async (
  file: File,
): Promise<{ itemsInStock: ShopItem[]; itemsCouldStock: ShopItem[] }> => {
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

        // Ensure each item has 'effects' and 'tags' keys
        parsed.forEach((item) => {
          item.rarity = Rarity[item.rarity];
          if (!("effects" in item)) item.effects = [];
          if (!("tags" in item)) item.tags = [];
        });
        const validItems = parsed.filter(isValidShopItem);
        const invalidItems = parsed.filter((item) => !isValidShopItem(item));
        if (invalidItems.length > 0)
          console.error("invalid items uploaded: ", invalidItems);
        const itemsInStock = validItems.filter((item) => item.inStock);
        const itemsCouldStock = validItems.filter((item) => !item.inStock);
        console.log("items from file", itemsCouldStock, itemsInStock);
        resolve({ itemsInStock, itemsCouldStock });
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
  extraSubmitEffect?: () => void;
};

const ShopBuilder = ({ initialShop, extraSubmitEffect }: ShopBuilderProps) => {
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
  const [CreateShop] = useMutation(CREATE_SHOP_MUTATION);
  const [UpdateShop] = useMutation(UPDATE_SHOP_MUTATION);

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
    let data;
    if (newShop.id) {
      const result = await UpdateShop({
        variables: {
          id: newShop.id,
          itemShopInput: ItemShopToGraphQLInput(newShop),
        },
      });
      data = result.data;
      if (extraSubmitEffect) extraSubmitEffect();
    } else {
      const result = await CreateShop({
        variables: {
          itemShopInput: ItemShopToGraphQLInput(newShop),
        },
      });
      data = result.data;
      console.log("shop created", data);
      if (!data.createShop.id) throw new Error("Error creating new Item Shop");

      // Reset form inputs
      setShopName("");
      setShopDescription("");
      setItemsInStock([]);
      setItemsCouldStock([]);
      if (extraSubmitEffect) extraSubmitEffect();
      if (!newShop.id) router.push(`/shop/${data.createShop.id}`);
    }
  };

  const [showCreateItem, setShowCreateItem] = useState(false);

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
          <input
            type="file"
            accept="application/json"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const items = await parseShopItemsFromFile(file);
                setItemsCouldStock((prev) => [
                  ...prev,
                  ...items.itemsCouldStock,
                ]);
                setItemsInStock((prev) => [...prev, ...items.itemsInStock]);
              } catch (err) {
                alert("Failed to parse JSON file: " + (err as Error).message);
              }
            }}
          />
          <a
            href={`data:application/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(exampleItems, null, 2),
            )}`}
            download="example-shop-items.json"
            className="text-blue-600 underline mb-2 block"
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
                  if ((newItem as ShopItem).inStock) {
                    setItemsCouldStock((prev) =>
                      prev.map((it, i) =>
                        i === index ? (newItem as ShopItem) : it,
                      ),
                    );
                  } else {
                    setItemsCouldStock((prev) =>
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
          </ul>
        </div>
        <Button
          buttonType={ButtonType.default}
          onClick={() => setShowCreateItem(false)}
          type="submit"
          color="green"
        >
          {initialShop?.id ? "Update Shop" : "Create Shop"}
        </Button>
      </form>
    </div>
  );
};

export default ShopBuilder;
