import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid black" }}>
            <Link to="/">Dashboard</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/users">Users</Link>
        </nav>
    )
}