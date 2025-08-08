"use client";

import { use, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import TextInput from "@/components/blocks/Inputs/TextInput";
import Button, { ButtonType } from "@/components/blocks/Inputs/Button";

const SET_PASSWORD_MUTATION = gql`
  mutation SetPassword($forgotPasswordId: String!, $newPassword: String!) {
    setPassword(
      forgotPasswordId: $forgotPasswordId
      newPassword: $newPassword
    ) {
      id
      email
      name
    }
  }
`;

const ForgotPassword = (props: { forgotPasswordId: string }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [setPassword, { loading, error, data }] = useMutation(
    SET_PASSWORD_MUTATION,
  );
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    const passwordId = props.forgotPasswordId;
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSuccess(false);
      return;
    }
    try {
      await setPassword({
        variables: {
          forgotPasswordId: passwordId,
          newPassword,
        },
      });
      setSuccess(true);
    } catch {
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        <TextInput
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <TextInput
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="w-sm">
          <Button
            type="submit"
            buttonType={ButtonType.default}
            color="green"
            disabled={
              loading || !newPassword || newPassword !== confirmPassword
            }
          >
            {loading ? "Resetting..." : "Set New Password"}
          </Button>
        </div>
      </form>
      {error && (
        <div className="text-red-600 mt-2">Error resetting password.</div>
      )}
      {success && (
        <div className="text-green-600 mt-2">
          Password reset successful! You may now log in.
        </div>
      )}
      {newPassword !== confirmPassword && (
        <div className="text-red-600 mt-2">Passwords do not match.</div>
      )}
    </div>
  );
};

export default ForgotPassword;
