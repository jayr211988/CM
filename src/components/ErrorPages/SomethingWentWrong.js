import React from "react";
import { Link } from "react-router-dom";


export default function SomethingWentWrong() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}>
      <b style={{ fontSize: '125px', fontWeight: 400 }}>500</b>
      <b style={{ fontSize: 50, marginBottom: '-10px', fontWeight: 400 }}>Internal Server Error</b>
      <b style={{ fontSize: 30, fontWeight: 400 }}>Sorry, the server is reporting an error</b>
      <Link 
        onClick={
          async ()=> { 
            await window.location.reload()
            window.location.replace("/dashboard");
          }
          
        }
        //to="/dashboard"
      >Go Back to Home Page</Link>
      
    </div>
  );
}
