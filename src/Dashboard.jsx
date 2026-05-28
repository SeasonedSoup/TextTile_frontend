import './styles/dashBoard.css'
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
                <div className="chatChoice"></div>
                <div className="chatLayout">
                    <div className='message'>
                        <input className="messageBar" />
                        <button>Message user</button>
                    </div>
                </div>
                <div className="users">
                    <button>Chat with this user each</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
