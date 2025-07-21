import { Link } from "react-router-dom"

function Navigation() {
    return (
        <nav className="navbar shadow-sm">
                <Link className="navbar-brand px-4" to="/">
                Hexlet Chat
                </Link>
        </nav>
    )
}


export default Navigation