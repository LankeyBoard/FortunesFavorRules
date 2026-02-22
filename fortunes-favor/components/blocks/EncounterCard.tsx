"use client";

import Link from "next/link";
import Button, { ButtonType } from "./Inputs/Button";
import { useState, Dispatch, SetStateAction } from "react";
import Trash from "../icons/Trash";
import client from "@/utils/graphQLclient";
import DELETE_ENCOUNTER_MUTATION from "@/utils/graphQLMutations/DeleteEncounterMutation";
import { EncounterData } from "@/utils/graphQLtypes";
import Markdown from "react-markdown";

interface EncounterCardProps {
  encounter: EncounterData;
}

const EncounterCard = ({ encounter }: EncounterCardProps) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const deleteEncounter = async () => {
    try {
      const { data } = await client.mutate({
        mutation: DELETE_ENCOUNTER_MUTATION,
        variables: { id: encounter.id },
      });
      console.log(data);
      console.log("encounter deleted");
    } catch (error) {
      console.error("Error deleting encounter:", error);
    }
  };

  const DeleteConfirmation = () => {
    return (
      <div className="p-4">
        <p>Are you sure you want to delete this encounter?</p>
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
            onClick={deleteEncounter}
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
      <Link href={`/encounter/${encounter.id}`}>
        <header className="bg-purple-300 dark:bg-purple-700 p-2 ">
          <span className="font-bold text-lg max-w-3/4 truncate inline-block">
            {encounter.title}
          </span>
        </header>
        <div className="mx-4 my-2">
          <Markdown>{encounter.description}</Markdown>
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

export default EncounterCard;
