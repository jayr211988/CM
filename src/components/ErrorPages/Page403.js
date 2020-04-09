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
      <h1 style={{ fontSize: 150, fontWeight: "bold", margin: 0 }}>403</h1>
      <p style={{ fontSize: 30, fontWeight: "bold", margin: 0 }}>Forbidden</p>
      <p>Access to this resources on the server is denied!</p>
      <Link to="/dashboard">Go Back to Home Page</Link>
    </div>
  );
}
