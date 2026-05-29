import '../styles/dashBoard.css'
import Header from './Header';
function Dashboard() {
    function fetchUsers() {
        console.log('users');
    }

    fetchUsers();
    return (
        <div className='dashBoardWrapper'>
            <Header></Header>
            <div className='mainContainer'>
                <div className="chatChoice">
                    <h1>Chats</h1>
                </div>
                <div className="chatLayout">
                    <div className='message'>
                        <input className="messageBar" />
                        <button>Message user</button>
                    </div>
                </div>
                <div className="users">
                    <h1>Users</h1>
                    <button>Chat with this user each</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
