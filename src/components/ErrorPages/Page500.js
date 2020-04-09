import React from "react";
import { Link } from "react-router-dom";

export default function PageError() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "10% 0"
    }}>
      <h1 style={{ fontSize: 150, fontWeight: "bold", margin: 0 }}>500</h1>
      <p style={{ fontSize: 30, fontWeight: "bold", margin: 0 }}>Internal Server Error</p>
      <p>Sorry, the server is reporting an error</p>
      <Link to="/dashboard">Go Back to Home Page</Link>
    </div>
  );
}
