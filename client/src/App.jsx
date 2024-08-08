import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexte/AuthContext";
import { ThemeProvider } from "./contexte/ThemeContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Header />
        <Outlet />
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
