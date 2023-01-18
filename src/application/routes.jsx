import { BrowserRouter, Route, Routes } from "react-router-dom"; // S'ha d'instal·lar react-router
import Welcome from "../Components/Welcome";
import Budget from "../Components/Budget";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Welcome />} />
      <Route path='/Budget/' element={<Budget />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
