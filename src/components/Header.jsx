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

    const viewChats = () => {
        if (user) {
            navigate('/');
        }
    }

    return ( 
    <div className="header">
        <div className='headerTitle'>
             <h1 className='headerText'>TextTile</h1>
            <h1 className="visitChat"onClick={viewChats}>Chats</h1>
        </div>

        {user && <img src={user?.profilePicture || DefaultProfile} alt="default profile" className='profilePicture' onClick={editProfile}/> }
        {user && <h1>Hello, {user.username}</h1>}
        {user && <button onClick={logout}>Log out</button> }
    </div>
    )
}

export default Header;