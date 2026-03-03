import { createContext, useState } from "react";

export const AuthContext = createContext({
  id: "",
  email: "",
  fullName: "",
  role: {
    name: "",
  },
});

export const AuthWrapper = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [user, setUser] = useState({
    id: "",
    email: "",
    fullName: "",
    role: {
      name: "",
    },
  });
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAppLoading, setIsAppLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
