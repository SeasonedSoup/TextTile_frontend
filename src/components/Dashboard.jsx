import '../styles/dashBoard.css'
import Header from './Header';
import getApiUrl from'../utils/getApiUrl';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthToken/AuthContext';
function Dashboard() {
    const [users, setUsers] = useState(null);
    const [activeUser, setActiveUser] = useState({username: "", id: ""});
    const[activeConversation, setActiveConversation] = useState(null);
    const [conversations, setConversations] = useState([]);
    const {user} = useAuth();

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

    useEffect(() => {
        async function fetchConversations() {
            const token = localStorage.getItem('token');
            
            const response = await fetch(getApiUrl() + '/conversation', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const result = await response.json();
            console.log("Conversations", result);
            setConversations(result);
        }
        fetchConversations();
    }, []);

    async function fetchActiveConversation(userId) {
         const token = localStorage.getItem('token');
            
            const response = await fetch(getApiUrl() + `/getConversation/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const result = await response.json();
        
            if (result !== null) {
                console.log("conversation already exists");
            } else {
                console.log("no conversations exist");
            }
            setActiveConversation(result);
    }

    //message
    const [message, setMessage] = useState('');
    async function sendMessage() {
        if (!message) return;

        const token = localStorage.getItem('token');

        if (!token) return;

        if (!activeConversation) {
            const response = await fetch(getApiUrl() + '/conversation', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                text: message,
                receiverId: activeUser.id
            })
            });

            const result = response.json();
            console.log(result);
        } else {
            const response = await fetch(getApiUrl() + '/message', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                text: message,
                receiverId: activeUser.id
                //conversationId: 
            })
            });
            const result = response.json();
            console.log(result);
        }
    }



    return (
        <div className='dashBoardWrapper'>
            <Header></Header>
            <div className='mainContainer'>
                <div className="chatChoice">
                    <h1>Chats</h1>
                    {conversations.length > 0 && 
                    <div className='conversations'> 
                      {conversations.map((conversation) => {
                        const targetUser = conversation.users.find((targetUser) => targetUser.id !== user.id )
                        return ( 
                            <div className="conversation" key={conversation.id} 
                            onClick={() => {setActiveUser({username: targetUser.username, id: targetUser.id}); fetchActiveConversation(user.id);}}>
                                Conversation with {targetUser.username} 
                            </div>
                        )
                      })}
                    </div> }
                </div>
                <div className="chatLayout">
                    { activeUser.username ?  
                        <div className='chat'>
                            <h1 className='activeUser'>{activeUser.username}</h1>
                            <div className='chatHistory'>
                                <div className='chatBox'>
                                    <h1>Hello!</h1>
                                </div>
                                <div className='chatBox'>
                                    <h1>Hi!</h1>
                                </div>
                            </div>
                            <div className='message'>
                                <input className="messageBar" value={message} onChange={(e) => setMessage(e.target.value)} />
                                <button onClick={sendMessage}>Message user</button>
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
                                <button onClick={() => {setActiveUser({username: user.username, id: user.id}); fetchActiveConversation(user.id);}}>Message this user</button>
                            </div>)
                    })
                    : <h1>No Users found</h1>}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
