"use client";
import React, { useEffect } from "react";
import {
  gql,
  OperationVariables,
  QueryOptions,
  TypedDocumentNode,
  useSuspenseQuery,
} from "@apollo/client";
import client from "@/utils/graphQLclient";

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

const ProfilePage = () => {
  const [data, setData] = React.useState<Data | undefined>(undefined);
  const [error, setError] = React.useState<any>(null);

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

  console.log(data);
  return <div>TEST</div>;
};

export default ProfilePage;
