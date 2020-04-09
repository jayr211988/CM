import React, { useReducer, useEffect } from "react";
import authReducer, { initialState } from "../reducers/auth";
import { getProfile, getPermission } from "./helper";
import { API_V1 } from "fe-utils/api";

const Context = React.createContext();
function Provider(props) {
  const [profile, authDispatcher] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API_V1.defaults.headers.common.Authorization = `Bearer ${token}`;

      const fetchData = async () => {
        // const result = await getProfile();
        // const { data: permission } = await getPermission();
        // console.log("permission", permission);
        // authDispatcher({ type: "PROFILE_UPDATE", payload: result && result.data });

        authDispatcher({ type: "PROFILE_UPDATE", payload: {name: "Rogelio"} });
      }

      fetchData();

    } else {
      authDispatcher({ type: "PROFILE_RESET" });
    }
  }, []);

  function fnLogout() {
    localStorage.removeItem("token");
    authDispatcher({ type: "PROFILE_RESET" });
  }

  return (
    <Context.Provider value={{
      profile,
      authDispatcher,
      fnLogout
    }}>
      {props.children}
    </Context.Provider>
  );
}

const useStateValue = () => React.useContext(Context);

export { Context, Provider, useStateValue };
