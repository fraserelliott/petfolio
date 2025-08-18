import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ToastMessageDisplay } from "./components/ToastMessageDisplay";
import Home from "./pages/home";
import RegPage from "./pages/RegPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import grass from "./assets/background.png";

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
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegPage />} />
            <Route path="/login" element={<LoginPage />} />
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
