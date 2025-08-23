import { Link } from "react-router-dom"

function Navigation({children}) {
    console.log('asas')
    return (
        <nav className="navbar shadow-sm">
                <Link className="navbar-brand px-4" to="/">
                Hexlet Chat
                </Link>
                {children}
        </nav>
    )
}


export default Navigation