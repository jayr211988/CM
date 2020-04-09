import React from "react";
import { Text } from "fe-components";

export default function StatusText({ children, status}) {
  return(
    <Text
      color   = {status.toLowerCase() === "inactive" ? "rgba(45, 36, 37, 0.3)" : ""}
      weight  = {status.toLowerCase() === "pending" ? "bold" : "normal"}
    >
      {children}
    </Text>
  )
}
