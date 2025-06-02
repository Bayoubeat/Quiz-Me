import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export function Layout() {
  return (
    <>
      <NavBar />
      <main className="App">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
