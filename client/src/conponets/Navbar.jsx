import { NavLink } from "react-router-dom"

export const Navbar = () => {
    return <>
        <h1>wellcome to navbar page</h1>
        <header>
            <div className="cantaner">
                <div className="logo-brand">
                    <NavLink href="/">myWeb</NavLink>
                </div>

                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/services">Services</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    </>
}