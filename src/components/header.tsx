import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <header className="header">
            <Link to="/">
                <div className="logo">
                    Goal Setter
                </div>
            </Link>
            <ul>
                <li>
                    <Link to="/login">
                        <FaSignInAlt />
                        Login
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        <FaUser />
                        Register
                    </Link>
                </li>
            </ul>


        </header>
    );
}

export default Header;