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
      <h1 style={{ fontSize: 150, fontWeight: "bold", margin: 0 }}>404</h1>
      <p style={{ fontSize: 30, fontWeight: "bold", margin: 0 }}>Page not found</p>
      <p>Sorry, but the page you are looking for doesn't exist</p>
      <Link to="/dashboard">Go Back to Home Page</Link>
    </div>
  );
}
