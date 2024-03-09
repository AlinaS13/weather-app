import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux-hooks";

type PublicRouteProps = PropsWithChildren;

export default function PublicRoute({ children }: PublicRouteProps) {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      navigate("/weather-app/");
    }
  }, [navigate, isAuth]);

  return children;
}
