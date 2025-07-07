"use client";

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import TextInput from "@/components/blocks/Inputs/TextInput";
import MultilineTextInput from "@/components/blocks/Inputs/MulitlineTextInput";
import DropdownField from "@/components/blocks/Inputs/DropdownField";
import Button, { ButtonType } from "@/components/blocks/Inputs/Button";

const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign($input: CampaignInput!) {
    createCampaign(input: $input) {
      id
      name
      description
      status
      startDate
      endDate
    }
  }
`;

const statusOptions = [
  { title: "Planning", slug: "PLANNING" },
  { title: "Active", slug: "ACTIVE" },
  { title: "On Hold", slug: "ON_HOLD" },
  { title: "Completed", slug: "COMPLETED" },
  { title: "Cancelled", slug: "CANCELLED" },
];

const CreateCampaignPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PLANNING");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [createCampaign, { loading, error, data }] =
    useMutation(CREATE_CAMPAIGN);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(false);
    await createCampaign({
      variables: {
        input: {
          name,
          description,
          status,
          startDate,
          endDate: endDate || null,
        },
      },
    });
    setConfirmed(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-black rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create a Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextInput
            placeholder="Campaign Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <MultilineTextInput
            placeholder="Describe your campaign"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <DropdownField
            name="Status"
            defaultValue={status}
            options={statusOptions}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div>
          <label>Start Date: </label>
          <TextInput
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date (Optional): </label>
          <TextInput
            type="date"
            placeholder="End Date (optional)"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <Button
          buttonType={ButtonType.default}
          type="submit"
          color="green"
          className="px-4 py-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Campaign"}
        </Button>
      </form>
      {error && <div className="text-red-600 mt-2">Error: {error.message}</div>}
      {confirmed && data && (
        <div className="text-green-600 mt-2">
          Campaign created! (ID: {data.createCampaign.id})
        </div>
      )}
    </div>
  );
};

export default CreateCampaignPage;
