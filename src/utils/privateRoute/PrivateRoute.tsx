import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../hooks/redux-hooks";

type PrivateRouteProps = PropsWithChildren;

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/weather-app/registration", { replace: true });
    }
  }, [navigate, isAuth]);

  return children;
}
