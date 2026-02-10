"use client";

import client from "@/utils/graphQLclient";
import { gql } from "@apollo/client";
import Link from "next/link";
import Trash from "../icons/Trash";
import { Dispatch, SetStateAction, useState } from "react";
import Button, { ButtonType } from "./Inputs/Button";
import SmallField from "./SmallField";
interface Character {
  maxHealth: string;
  maxStamina: string;
  mettle: string;
  agility: string;
  heart: string;
  intellect: string;
  id: string;
  name: string;
  level: number;
  coin: string;
  characterClass: { title: string };
  characterCulture: { title: string };
  characterLineage: { title: string };
}

interface SimpleCharacter {
  id: string;
  name: string;
  level: number;
  characterClass: { title: string };
  characterCulture: { title: string };
  characterLineage: { title: string };
}

interface Data {
  me: {
    id: string;
    email: string;
    name: string;
    characters: Character[];
  };
}

const DELETE_CHARACTER_MUTATION = gql`
  mutation DeleteCharacter($id: ID!) {
    deleteCharacter(id: $id)
  }
`;

export enum CARD_SIZE {
  DEFAULT,
  MEDIUM,
}

const CharacterCard = ({
  character,
  setData,
  cardSize = CARD_SIZE.DEFAULT,
}: {
  character: Character | SimpleCharacter;
  setData?: Dispatch<SetStateAction<Data | undefined>>;
  cardSize?: CARD_SIZE;
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const deleteCharacter = async () => {
    try {
      const { data } = await client.mutate({
        mutation: DELETE_CHARACTER_MUTATION,
        variables: { id: character.id },
      });
      console.log(data);
      console.log("character deleted");
      if (setData)
        setData((prevData) => {
          if (!prevData) return prevData;
          return {
            ...prevData,
            me: {
              ...prevData.me,
              characters: prevData.me.characters.filter(
                (char) => char.id !== character.id,
              ),
            },
          };
        });
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };

  const DeleteConfirmation = () => {
    return (
      <div className="p-4">
        <p>Are you sure you want to delete {character.name}?</p>
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
            onClick={deleteCharacter}
            buttonType={ButtonType.default}
          >
            Confirm
          </Button>
        </div>
      </div>
    );
  };
  switch (cardSize) {
    case CARD_SIZE.MEDIUM:
      // verify that the character is a full character
      if ("mettle" in character)
        return (
          <div className="flex-none md:hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 flex-grow md:grow-0 max-w-11/12 md:w-84 block">
            {showDeleteConfirmation ? (
              <DeleteConfirmation />
            ) : (
              <>
                <Link href={`/characters/${character.id}`}>
                  <div key={character.id}>
                    <header className="bg-purple-300 dark:bg-purple-700 p-2 ">
                      <span className="font-bold text-lg max-w-3/4 truncate inline-block">
                        {character.name}
                      </span>
                      <span className="float-right">{character.level}</span>
                    </header>
                    <div className="mx-4 my-2 gap-2 flex">
                      <SmallField label="Class">
                        {character.characterClass.title}
                      </SmallField>
                      <SmallField label="Culture">
                        {character.characterCulture.title}
                      </SmallField>
                      <SmallField label="Lineage">
                        {character.characterClass.title}
                      </SmallField>
                    </div>
                  </div>
                  <div className="p-4 pb-0 flex flex-wrap md:grid md:grid-cols-4 gap-2 justify-center w-auto md:w-max mx-auto">
                    <SmallField label="Mettle">{character.mettle}</SmallField>
                    <SmallField label="Agility">{character.agility}</SmallField>
                    <SmallField label="Heart">{character.heart}</SmallField>
                    <SmallField label="Intellect">
                      {character.intellect}
                    </SmallField>
                  </div>
                  <div className="p-4 pb-0 flex flex-wrap md:grid md:grid-cols-2 gap-2 justify-center w-auto md:w-max mx-auto">
                    <SmallField label="Max Health">
                      {character.maxHealth}
                    </SmallField>
                    <SmallField label="Max Stamina">
                      {character.maxStamina}
                    </SmallField>
                  </div>
                  <SmallField label="Coin">{character.coin}</SmallField>
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
              </>
            )}
          </div>
        );
    default:
      return (
        <div className="flex-none md:hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 flex-grow md:grow-0 max-w-11/12 md:w-56 block">
          {showDeleteConfirmation ? (
            <DeleteConfirmation />
          ) : (
            <>
              <Link href={`/characters/${character.id}`}>
                <div key={character.id}>
                  <header className="bg-purple-300 dark:bg-purple-700 p-2 ">
                    <span className="font-bold text-lg max-w-3/4 truncate inline-block">
                      {character.name}
                    </span>
                    <span className="float-right">{character.level}</span>
                  </header>
                  <div className="mx-4 my-2">
                    <p>
                      <span className="font-light">Class: </span>
                      {character.characterClass.title}
                    </p>
                    <p>
                      <span className="font-light">Culture: </span>
                      {character.characterCulture.title}
                    </p>
                    <p>
                      <span className="font-light">Lineage: </span>
                      {character.characterLineage.title}
                    </p>
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
            </>
          )}
        </div>
      );
  }
};

export default CharacterCard;
