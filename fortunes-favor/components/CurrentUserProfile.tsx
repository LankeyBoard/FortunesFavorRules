"use client";

import UserProfile from "./blocks/UserProfile";
import { useEffect, useState } from "react";
import VerifyLogin from "./VerifyLogin";

const CurrentUserProfile: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!localStorage.getItem("token")) {
    return <div>Signup or login to view your profile</div>;
  }
  return (
    <VerifyLogin>
      <UserProfile />
    </VerifyLogin>
  );
};

export default CurrentUserProfile;
