import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ToastMessageDisplay } from "./components/ToastMessageDisplay";
import HomePage from "./pages/HomePage";
import RegPage from "./pages/RegPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UserProfilePage from "./pages/UserProfilePage.jsx";
import grass from "./assets/grass-bg.png";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div
        className="pageContainer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            backgroundImage: `url(${grass})`,
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserProfilePage />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
          <div style={{ position: "fixed", bottom: "3rem", right: "1rem" }}>
            <ToastMessageDisplay />
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
