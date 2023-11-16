import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthProvider/AuthProvider";
import SideBarProvider from "./context/sideBarContext/SideBarProvider";
import Signin from "./pages/Signin";
import DashboardLayout from "./routes/DashBoardRoutes";

function App() {
  return (
    <Router basename="/dashboardAdmin">
      <ToastContainer />
      <AuthProvider>
        <SideBarProvider>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="*" element={<DashboardLayout />} />
          </Routes>
        </SideBarProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
