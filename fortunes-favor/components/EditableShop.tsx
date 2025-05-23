import React, { useState } from "react";
import Shop from "./Shop";
import ShopBuilder from "./ShopBuilder";
import { ItemShop } from "@/utils/ItemShop";
import Button, { ButtonType } from "./blocks/Inputs/Button";

interface EditableShopProps {
  shop: ItemShop;
}

const EditableShop: React.FC<EditableShopProps> = ({ shop }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <ShopBuilder
          initialShop={shop}
          extraSubmitEffect={() => {
            setIsEditing(false);
            // window.location.reload();
          }}
        />
      ) : (
        <Shop shop={shop} />
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
