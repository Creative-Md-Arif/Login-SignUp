import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/home/Home";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
      <Route index element={<Registration />}></Route>)
      <Route path="/login" element={<Login />}></Route>)
      <Route path="/forgetpassword" element={<ForgetPassword />}></Route>)
      <Route path="home" element={<Home />}></Route>)
    </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
