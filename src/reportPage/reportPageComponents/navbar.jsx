import "../reportPage.css";
import { Link } from "react-router-dom";

function Navbar(){
    return(
    <nav className="navBar">
        <Link to="/">GO TO MAIN PAGE</Link>
    </nav>
    );
}

export default Navbar;