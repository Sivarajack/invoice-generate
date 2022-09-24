import React, { createContext } from "react";

function useAuth() {
  return <div>useAuth</div>;
}

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
);


export default useAuth;
