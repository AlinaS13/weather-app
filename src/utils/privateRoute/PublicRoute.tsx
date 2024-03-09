import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { useAuth } from "./AuthProvider";
import { useAppSelector } from "../hooks/redux-hooks";

type PublicRouteProps = PropsWithChildren;

export default function PublicRoute({ children }: PublicRouteProps) {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  //   if (isAuth) {
  //     navigate("/weather-app/");
  //   }
  useEffect(() => {
    if (isAuth) {
      navigate("/weather-app/");
    }
  }, [navigate, isAuth]);

  return children;
}
