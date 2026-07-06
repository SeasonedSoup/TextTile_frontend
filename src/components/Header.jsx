import '../styles/header.css'
import { useAuth } from './AuthToken/AuthContext';
import DefaultProfile from '../assets/user.png';
import { useNavigate } from 'react-router';

  
function Header() {
    const navigate = useNavigate();
    function logout () {
        localStorage.removeItem("token");
        console.log('You lost a token!');
        location.reload();
    }

    const {user} = useAuth();

     const editProfile = () => {
        if (user) {
            navigate('/profile');
        }
    }

    return ( 
    <div className="header">
        <h1 className='headerTitle'>TextTile</h1>

        {user && <img src={user?.profilePicture || DefaultProfile} alt="default profile" className='profilePicture' onClick={editProfile}/> }
        {user && <h1>Hello, {user.username}</h1>}
        {user && <button onClick={logout}>Log out</button> }
    </div>
    )
}

export default Header;