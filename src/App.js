import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Users from "./pages/Users";
import SideBarProvider from "./context/sideBarContext/SideBarProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <ToastContainer />
      <SideBarProvider>
        <DashBoard>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </DashBoard>
      </SideBarProvider>
    </Router>
  );
}

export default App;
