import "../mainPage.css";
import { Link } from "react-router-dom";

function Navbar(){
    return(
    <div className="navBar">
        <Link to="/report">REPORT PAGE</Link>
    </div>
    );
}

export default Navbar;