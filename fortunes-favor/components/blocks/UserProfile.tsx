"use client";

import client from "@/utils/graphQLclient";
import { gql, TypedDocumentNode } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import VerticalLabeledBox from "./VerticalLabeledBox";
import { useRouter } from "next/navigation";
import Button, { ButtonType } from "./Inputs/Button";

interface Character {
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

interface Variables {}

const PROFILE_QUERY: TypedDocumentNode<Data, Variables> = gql`
  query Me {
    me {
      id
      email
      name
      characters {
        id
        name
        level
        characterClass {
          title
        }
        characterLineage {
          title
        }
        characterCulture {
          title
        }
      }
    }
  }
`;

const UserProfile = () => {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [error, setError] = useState<any>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({ query: PROFILE_QUERY });
        setData(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }
  const user = data.me;
  const characters = user.characters;
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
    location.reload();
  };
  return (
    <div className="w-full">
      <VerticalLabeledBox label="User">
        <p>Email: {user.email}</p>
      </VerticalLabeledBox>
      <Button
        color="red"
        buttonType={ButtonType.default}
        onClick={handleLogout}
      >
        Logout
      </Button>
      <div>
        <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6">
          Characters
        </h2>
        <ul className="flex flex-auto flex-wrap">
          <Link
            href={"/characters/create_character"}
            className="flex-none hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 w-56 block"
          >
            <div className="text-4xl flex items-center justify-center h-full">
              +
            </div>
          </Link>
          {characters.map((character: Character) => (
            <Link
              href={`/characters/${character.id}`}
              key={character.id}
              className="flex-none hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 w-56 block"
            >
              <li key={character.id}>
                <header className="bg-purple-300 dark:bg-purple-700 p-2">
                  <span className="font-bold text-lg overflow-hidden">
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
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
