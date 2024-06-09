import React from "react";

function PageNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img
        src="https://i.ibb.co/89RYLnW/notFound.png"
        alt="Not Found"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div style={{ marginTop: "20px", fontSize: "24px", fontWeight: "bold" }}>
        SAYFA BULUNAMADI
      </div>
    </div>
  );
}

export default PageNotFound;
