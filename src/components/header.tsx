import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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