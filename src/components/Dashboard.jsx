import '../styles/dashBoard.css'
import Header from './Header';
import getApiUrl from'../utils/getApiUrl';
import { useEffect, useState } from 'react';

function Dashboard() {
    const [users, setUsers] = useState(null);
    const [activeUser, setActiveUser] = useState(null);
    const [activeForm, setActiveForm] = useState(false);

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch(getApiUrl() + '/users', {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const result = await response.json();
            setUsers(result);
        }
        fetchUsers();
    }, []);

    function messageUser(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const selectedUser = formData.get("user");
        setActiveUser(selectedUser);
    }



    return (
        <div className='dashBoardWrapper'>
            <Header></Header>
            <div className='mainContainer'>
                <div className="chatChoice">
                    <button>Create Chat</button>
                    {users && <form action="#" onSubmit={messageUser}>
                                <select name="user" id="username">
                                    {users.map((user) => {
                                        return <option key={user.username} value={user.username}>{user.username}</option>
                                    })}
                                </select>
                                <button>Message This User</button>
                                </form>
                    }
                    <h1>Chats</h1>
                </div>
                <div className="chatLayout">
                    { activeUser ?  
                        <div className='chat'>
                            <h1 className='activeUser'>{activeUser}</h1>
                            <div className='message'>
                                <input className="messageBar" />
                                <button>Message user</button>
                            </div> 
                        </div> : <h1>No active messages say hi to a user!</h1>
                    }
                </div>
                <div className="users">
                    <h1>Users</h1>
                    {users ? users.map((user) => {
                        return (
                            <div key={user.id}>
                                <h1>{user.username}</h1>
                                <button onClick={() => setActiveUser(user.username)}>Message this user</button>
                            </div>)
                    })
                    : <h1>No Users found</h1>}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
