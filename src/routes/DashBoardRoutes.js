import { Route, Routes } from "react-router-dom";
import DashBoard from "../components/DashBoard";
import Orders from "../pages/Orders";
import Users from "../pages/Users";

function DashboardLayout() {
  return (
    <DashBoard>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </DashBoard>
  );
}

export default DashboardLayout;
