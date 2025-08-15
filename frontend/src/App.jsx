import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ToastMessageDisplay } from "./components/ToastMessageDisplay";
import RegPage from './pages/RegPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/register" element={<RegPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
        <div style={{ position: "fixed", bottom: "3rem", right: "1rem" }}>
          <ToastMessageDisplay />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
