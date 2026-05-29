import '../styles/header.css'
import { useAuth } from './AuthToken/AuthContext';


  
function Header() {
    function logout () {
        localStorage.removeItem("token");
        console.log('You lost a token!');
        location.reload();
    }
    const {user} = useAuth();

    return ( 
    <div className="header">
        <h1 className='headerTitle'>TextTile</h1>

        <img src="" alt="default profile" />
        <a href="/profile">Edit Profile</a>
        {user && <h1>Hello, {user.username}</h1>}
        <button onClick={logout}>Log out</button>
    </div>
    )
}

export default Header;