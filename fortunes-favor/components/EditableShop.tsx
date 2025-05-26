import React, { useState } from "react";
import Shop from "./Shop";
import ShopBuilder from "./ShopBuilder";
import { ItemShop } from "@/utils/ItemShop";
import Button, { ButtonType } from "./blocks/Inputs/Button";

interface EditableShopProps {
  shop: ItemShop;
}

const EditableShop: React.FC<EditableShopProps> = ({ shop }) => {
  // Determine initial editing state from URL
  const url = new URL(window.location.href);
  const hasEditingKey = url.searchParams.has("editing");
  const [isEditing, setIsEditing] = useState(hasEditingKey);

  // Update URL when editing state changes
  React.useEffect(() => {
    const url = new URL(window.location.href);
    if (isEditing) {
      url.searchParams.set("editing", "1");
    } else {
      url.searchParams.delete("editing");
    }
    window.history.replaceState({}, "", url.toString());
  }, [isEditing]);
  const [currentShop, setCurrentShop] = useState(shop);

  return (
    <div>
      {isEditing ? (
        <ShopBuilder
          initialShop={currentShop}
          extraSubmitEffect={(shop: ItemShop) => {
            setIsEditing(false);
            setCurrentShop(shop);
          }}
        />
      ) : (
        <Shop shop={currentShop} />
      )}
      <div className="my-6">
        {!isEditing && (
          <div className="flex justify-center pb-6">
            <Button
              color="green"
              buttonType={ButtonType.default}
              onClick={() => setIsEditing(true)}
            >
              Edit Shop
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableShop;
