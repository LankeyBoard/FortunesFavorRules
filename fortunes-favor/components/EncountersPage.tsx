"use client";

import React, { useState, useEffect } from "react";
import client from "@/utils/graphQLclient";
import MY_ENCOUNTERS_QUERY, {
  MyEncountersQueryData,
} from "@/utils/graphQLQueries/MyEncountersQuery";
import EncounterCard from "@/components/blocks/EncounterCard";
import Button, { ButtonType } from "@/components/blocks/Inputs/Button";
import FullPageLoading from "@/components/FullPageLoading";
import { EncounterData } from "@/utils/graphQLtypes";

const EncountersPage = () => {
  const [data, setData] = useState<
    { myEncounters: EncounterData[] } | undefined
  >(undefined);
  const [error, setError] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEncounter, setEditingEncounter] = useState<
    EncounterData | undefined
  >(undefined);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchEncounters();
  }, []);

  const fetchEncounters = async () => {
    try {
      const { data } = await client.query({
        query: MY_ENCOUNTERS_QUERY,
      });
      setData(data as MyEncountersQueryData);
      setError(null);
    } catch (error) {
      setError(error);
      console.error("Error fetching encounters:", error);
    }
  };

  const handleFormSubmit = async (encounter: EncounterData) => {
    if (editingEncounter) {
      setData((prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          myEncounters: prevData.myEncounters.map((enc) =>
            enc.id === encounter.id ? encounter : enc,
          ),
        };
      });
      setSuccessMessage("Encounter updated successfully!");
    } else {
      setData((prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          myEncounters: [...prevData.myEncounters, encounter],
        };
      });
      setSuccessMessage("Encounter created successfully!");
    }

    setShowForm(false);
    setEditingEncounter(undefined);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleEditClick = (encounter: EncounterData) => {
    setEditingEncounter(encounter);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEncounter(undefined);
  };

  if (error) {
    console.error(error);
    return (
      <div className="w-full p-4">
        <div className="text-red-600">Error loading encounters</div>
        <Button
          color="blue"
          buttonType={ButtonType.default}
          onClick={fetchEncounters}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!data) {
    return <FullPageLoading />;
  }

  const encounters = data.myEncounters || [];

  return (
    <div className="w-full p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="font-thin text-3xl text-center pb-2 tracking-widest md:pt-6">
            My Encounters
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
            Create and manage your combat encounters
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
            {successMessage}
          </div>
        )}

        {/* Encounters List */}
        {encounters.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {encounters.map((encounter) => (
                <EncounterCard
                  key={encounter.id}
                  encounter={encounter}
                  setData={setData}
                  onEdit={handleEditClick}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 dark:text-gray-400 py-8">
            <p>No encounters yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EncountersPage;
