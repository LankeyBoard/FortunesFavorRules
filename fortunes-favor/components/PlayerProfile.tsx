"use client";

import SignupOrLoginModal from "./SignupLoginModal";
import UserProfile from "./blocks/UserProfile";
import { useEffect, useState } from "react";

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
  return <UserProfile />;
};

export default CurrentUserProfile;
