import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Tasks } from "./pages/Tasks";
import { NavBar } from "./components/layout/NavBar";
import { Signup } from "./pages/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <div className="bg-gray-200 min-h-screen p-2.5">
          <Toaster />
          <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
