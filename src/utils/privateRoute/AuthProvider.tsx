import { createContext, PropsWithChildren, useContext, useState } from "react";

import { IUser } from "../../types/AuthTypes";
import { useAppSelector } from "../hooks/redux-hooks";

const AuthContext = createContext<IUser | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  // Uses `isSignedIn` prop to determine whether or not to render a user
  //  const isAuth = useAppSelector((state) => state.auth.isAuth);
  // isSignedIn = true;
  // console.log(isSignedIn);
  const userId = useAppSelector((state) => state.auth.userId);
  // console.log(userId);
  const [user] = useState<IUser | null>(userId ? { userId: userId } : null);
  // console.log("autProv", user);
  // console.log("autProv", userId);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return context;
// };
