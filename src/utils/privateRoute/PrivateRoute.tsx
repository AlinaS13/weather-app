import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { useAuth } from "./AuthProvider";
import { useAppSelector } from "../hooks/redux-hooks";

type PrivateRouteProps = PropsWithChildren;

export default function PrivateRoute({ children }: PrivateRouteProps) {
  // const user = useAuth();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/weather-app/registration", { replace: true });
    }
    // else if (user !== null) {
    //   navigate("/weather-app/"), { replace: false };
    // }
  }, [navigate, isAuth]);

  return children;
}
