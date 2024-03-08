
export const Navbar = () => {
    return <>
    <h1>wellcome to navbar page</h1>
        <header>
            <div className="cantaner">
                <div className="logo-brand">
                    <a href="/">myWeb</a>
                </div>

                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    </>
}