import { Link, Links } from "react-router-dom"

function Navbar(){
    return(
        <>
        <nav className="navbar">
            <div className="navbar-brand">
            <Link to ="/">Movify</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/fav" className="nav-link">Favorites</Link>

            </div>
        </nav>
        </>
    )
}
export default Navbar