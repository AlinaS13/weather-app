import { Outlet } from "react-router-dom";

// import { useAppDispatch } from "./utils/hooks/redux-hooks";

const App: React.FC = () => {
  // const dispatch = useAppDispatch();
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
