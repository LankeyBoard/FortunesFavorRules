"use client";

import client from "@/utils/graphQLclient";
import { gql, TypedDocumentNode } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import VerticalLabeledBox from "./VerticalLabeledBox";
import { useRouter } from "next/navigation";
import Button, { ButtonType } from "./Inputs/Button";
import Trash from "../icons/Trash";
import CharacterCard from "./CharacterCard";
import Loading from "./Loading";
import FullPageLoading from "../FullPageLoading";

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
    return <FullPageLoading />;
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
        <div className="flex justify-center my-4">
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            className="border rounded px-2 py-1 bg-slate-200 dark:bg-slate-800 text-white"
            onChange={(e) => {
              const sortKey = e.target.value;
              const sortedCharacters = [...characters].sort((a, b) => {
                if (sortKey === "name") {
                  return a.name.localeCompare(b.name);
                } else if (sortKey === "characterClass") {
                  return a.characterClass.title.localeCompare(
                    b.characterClass.title,
                  );
                } else if (sortKey === "characterCulture") {
                  return a.characterCulture.title.localeCompare(
                    b.characterCulture.title,
                  );
                } else if (sortKey === "characterLineage") {
                  return a.characterLineage.title.localeCompare(
                    b.characterLineage.title,
                  );
                }
                return 0;
              });
              setData((prevData) => {
                if (!prevData) return prevData;
                return {
                  ...prevData,
                  me: {
                    ...prevData.me,
                    characters: sortedCharacters,
                  },
                };
              });
            }}
          >
            <option value="name">Name</option>
            <option value="characterClass">Class</option>
            <option value="characterCulture">Culture</option>
            <option value="characterLineage">Lineage</option>
          </select>
        </div>
        <div className="">
          <ul className="flex flex-auto flex-wrap justify-center md:justify-start">
            <Link
              href={"/characters/create_character"}
              className="flex-none md:hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 flex-grow md:grow-0 w-11/12 max-w-11/12 md:w-56 block"
            >
              <div className="text-4xl flex items-center justify-center h-full">
                +
              </div>
            </Link>
            {characters.map((character: Character) => (
              <CharacterCard
                key={character.id}
                character={character}
                setData={setData}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
