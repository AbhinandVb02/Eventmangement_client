import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Navbar } from "./modules/navigation/Navbar";
import { AppRoute } from "./modules/route/AppRoute";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <AppRoute />
      </BrowserRouter>
    </>
  );
}

export default App;
