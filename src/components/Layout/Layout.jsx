import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Layout.scss"

const Layout = () => {
    return (
        <div className="app" >
            <Navbar />
            <main className="main">
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout