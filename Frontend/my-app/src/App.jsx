import { useEffect } from "react";
import "./App.css";
import AllRouters from "./Routers";
import { useDispatch } from "react-redux";
import { getCookie } from "./helper/cookies";
import { loginSuccess } from "./Features/Auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie("token"); // Lấy token từ cookie
    if (token) {
      dispatch(loginSuccess()); // Nếu có token và user, dispatch vào Redux
    }
  }, [dispatch]);
  return (
    <>
      <AllRouters />
    </>
  );
}

export default App;
