"use client";

import client from "@/utils/graphQLclient";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

interface Character {
  id: string;
  name: string;
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

  return (
    <div>
      <h1>Username: {user.name}</h1>
      <p>Email: {user.email}</p>
      <h2>Characters</h2>
      <ul>
        {characters.map((character: Character) => (
          <Link href={`/characters/${character.id}`} key={character.id}>
            <li key={character.id}>
              <h3>{character.name}</h3>
              <p>Class: {character.characterClass.title}</p>
              <p>Culture: {character.characterCulture.title}</p>
              <p>Lineage: {character.characterLineage.title}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
