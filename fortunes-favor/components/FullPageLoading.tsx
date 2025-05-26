import React from "react";
import Loading from "./blocks/Loading";

const FullPageLoading: React.FC = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <Loading />
  </div>
);

export default FullPageLoading;
