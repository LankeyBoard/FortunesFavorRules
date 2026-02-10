"use client";

import Link from "next/link";
import Button, { ButtonType } from "./Inputs/Button";
import { useState } from "react";
import Trash from "../icons/Trash";
import client from "@/utils/graphQLclient";
import { gql } from "@apollo/client";

const DELETE_SHOP_MUTATION = gql`
  mutation DeleteShop($id: ID!) {
    deleteShop(id: $id)
  }
`;
const ShopCard = ({
  shop,
}: {
  shop: { id: number; name: string; description: string };
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const deleteShop = async () => {
    try {
      const { data } = await client.mutate({
        mutation: DELETE_SHOP_MUTATION,
        variables: { id: shop.id },
      });
      console.log(data);
      console.log("shop deleted");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };
  const DeleteConfirmation = () => {
    return (
      <div className="p-4">
        <p>Are you sure you want to delete {shop.name}?</p>
        <p>This action cannot be undone</p>
        <div className="flex flex-row-reverse mt-4">
          <Button
            color="gray"
            onClick={() => setShowDeleteConfirmation(false)}
            buttonType={ButtonType.default}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={deleteShop}
            buttonType={ButtonType.default}
          >
            Confirm
          </Button>
        </div>
      </div>
    );
  };
  return showDeleteConfirmation ? (
    <DeleteConfirmation />
  ) : (
    <div>
      <Link href={`/shop/${shop.id}`}>
        <div>
          <header className="bg-amber-300 dark:bg-amber-700 p-2 ">
            <span className="font-bold text-lg max-w-3/4 truncate inline-block">
              {shop.name}
            </span>
          </header>
          <div className="mx-4 my-2">
            <p className="line-clamp-3">{shop.description}</p>
          </div>
        </div>
      </Link>
      <div className="z-20 w-full ">
        <button
          className="w-10 mx-auto cursor-pointer p-2 float-right"
          type="button"
          onClick={() => setShowDeleteConfirmation(true)}
        >
          <Trash color="red" />
        </button>
      </div>
    </div>
  );
};

export default ShopCard;
