"use client";

import client from "@/utils/graphQLclient";
import { gql, TypedDocumentNode } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button, { ButtonType } from "./Inputs/Button";
import CharacterCard from "./CharacterCard";
import FullPageLoading from "../FullPageLoading";
import UPDATE_ME_MUTATION from "@/utils/graphQLMutations/UpdateMeMutation";
import TextInput from "./Inputs/TextInput";
import ShopCard from "./ShopCard";
import EncounterCard from "./EncounterCard";
import { EncounterData } from "@/utils/graphQLtypes";

interface QueryCampaign {
  id: number;
  name: string;
  description: string;
}
interface QueryShop {
  id: number;
  name: string;
  description: string;
}
interface QueryCharacter {
  id: string;
  name: string;
  level: number;
  characterClass: { title: string };
  characterCulture: { title: string };
  characterLineage: { title: string };
  campaign: QueryCampaign;
}

interface Data {
  me: {
    campaigns: any;
    id: string;
    email: string;
    name: string;
    characters: QueryCharacter[];
    createdCampaigns: QueryCampaign[];
    createdItemShops: QueryShop[];
    createdEncounters: EncounterData[];
  };
}

interface Variables {}

const PROFILE_QUERY: TypedDocumentNode<Data, Variables> = gql`
  query Me {
    me {
      id
      email
      name
      createdCampaigns {
        id
        name
        description
      }
      createdItemShops {
        id
        name
        description
      }
      characters {
        id
        name
        level
        campaign {
          id
          name
          description
        }
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
      createdEncounters {
        id
        title
        description
        monsters {
          name
        }
      }
    }
  }
`;

const UserProfile = () => {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [error, setError] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
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
  console.log(data);
  const user = data.me;
  const characters = user.characters;
  const campaignIds = new Set(
    user.createdCampaigns.map((campaign) => campaign.id),
  );
  const campaigns: QueryCampaign[] = [];
  characters.forEach((character) => {
    if (
      character.campaign &&
      character.campaign.id &&
      !campaignIds.has(character.campaign.id)
    ) {
      campaigns.push(character.campaign);
      campaignIds.add(character.campaign.id);
    }
  });
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
    location.reload();
  };
  const handleEdit = () => {
    setEditing(true);
    setNewName(user.name);
    setNewEmail(user.email);
    setNewPassword("");
    setUpdateError(null);
    setUpdateSuccess(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setUpdateError(null);
    setUpdateSuccess(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(null);
    try {
      const { data } = await client.mutate({
        mutation: UPDATE_ME_MUTATION,
        variables: {
          email: newEmail,
          name: newName,
          password: newPassword || undefined,
        },
      });
      if (data?.updateMe?.token) {
        setUpdateSuccess("Profile updated!");
        setEditing(false);
        setData((prev) =>
          prev
            ? {
                ...prev,
                me: {
                  ...prev.me,
                  name: newName,
                  email: newEmail,
                },
              }
            : prev,
        );
      } else {
        console.log(data);
        setUpdateError("Failed to update profile.");
      }
    } catch (err: any) {
      console.log(err);
      setUpdateError("Failed to update profile.");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 w-sm">
        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-2 flex flex-col">
            <TextInput
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <TextInput
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
            <TextInput
              type="password"
              placeholder="New Password (leave blank to keep current)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="flex gap-2">
              <Button
                color="blue"
                buttonType={ButtonType.default}
                type="submit"
              >
                Save
              </Button>
              <Button
                color="gray"
                buttonType={ButtonType.default}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
            {updateError && <div className="text-red-600">{updateError}</div>}
            {updateSuccess && (
              <div className="text-green-600">{updateSuccess}</div>
            )}
          </form>
        ) : (
          <>
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <Button
              color="blue"
              buttonType={ButtonType.default}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </>
        )}
        <Button
          color="red"
          buttonType={ButtonType.default}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
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
            {characters.map((character: QueryCharacter) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6">
          Campaigns
        </h2>
        <div className="">
          <ul className="flex flex-auto flex-wrap justify-center md:justify-start">
            <Link
              href={"/campaign/create"}
              className="flex-none md:hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 flex-grow md:grow-0 w-11/12 max-w-11/12 md:w-56 block"
            >
              <div className="text-4xl flex items-center justify-center h-full">
                +
              </div>
            </Link>
            {user.createdCampaigns.map((campaign: QueryCampaign) => (
              <div
                key={campaign.id}
                className="flex-none md:hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 flex-grow md:grow-0 max-w-11/12 md:w-56 block"
              >
                <Link href={`/campaign/${campaign.id}`}>
                  <div>
                    <header className="bg-amber-300 dark:bg-amber-700 p-2 ">
                      <span className="font-bold text-lg max-w-3/4 truncate inline-block">
                        {campaign.name}
                      </span>
                    </header>
                    <div className="mx-4 my-2">
                      <p>{campaign.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {campaigns.map((campaign: QueryCampaign) => (
              <div
                key={campaign.id}
                className="flex-none md:hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 flex-grow md:grow-0 max-w-11/12 md:w-56 block"
              >
                <Link href={`/campaign/${campaign.id}`}>
                  <div>
                    <header className="bg-purple-300 dark:bg-purple-700 p-2 ">
                      <span className="font-bold text-lg max-w-3/4 truncate inline-block">
                        {campaign.name}
                      </span>
                    </header>
                    <div className="mx-4 my-2">
                      <p className="line-clamp-3">{campaign.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6">
          Shops
        </h2>
        <div className="">
          <ul className="flex flex-auto flex-wrap justify-center md:justify-start">
            <Link
              href={"/shop/builder"}
              className="flex-none md:hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 flex-grow md:grow-0 w-11/12 max-w-11/12 md:w-56 block"
            >
              <div className="text-4xl flex items-center justify-center h-full">
                +
              </div>
            </Link>
            {user.createdItemShops.map((shop: QueryShop) => (
              <div
                key={shop.id}
                className="flex-none md:hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 flex-grow md:grow-0 max-w-11/12 md:w-56 block"
              >
                <ShopCard shop={shop} />
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="font-thin text-xl mx-auto text-center pb-0 tracking-widest md:pt-6">
          Encounters
        </h2>
        <div className="">
          <ul className="flex flex-auto flex-wrap justify-center md:justify-start">
            <Link
              href={"/encounter/builder"}
              className="flex-none md:hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 flex-grow md:grow-0 w-11/12 max-w-11/12 md:w-56 block"
            >
              <div className="text-4xl flex items-center justify-center h-full">
                +
              </div>
            </Link>
            {user.createdEncounters.map((encounter) => (
              <div
                key={encounter.id}
                className="flex-none md:hover:scale-110 bg-slate-300 dark:bg-slate-700 m-2 flex-grow md:grow-0 max-w-11/12 md:w-56 block"
              >
                <EncounterCard encounter={encounter} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
