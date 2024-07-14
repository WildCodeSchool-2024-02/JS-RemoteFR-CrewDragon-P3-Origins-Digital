import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexte/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
      <Footer />
    </AuthProvider>
  );
}

export default App;
