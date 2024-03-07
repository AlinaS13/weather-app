import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <Link to="/weather-app/">Home</Link>
        <Link to="/weather-app/registration">Registration</Link>
        <Link to="/weather-app/login">Login</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
