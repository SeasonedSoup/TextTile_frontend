import { useLocation } from "react-router";

function ProfileDetails() {
    const location = useLocation();
    const user = location.state?.user;
    if (!user) {
        return (
            <h1>Profile does not exist</h1>
        )
    } 
     return (
        <div className='profileLayout'>
            <div className='profileModal'>
                <h1>{user?.username}'s Profile</h1>
                <div className='profileImg'>
                    {user?.profilePicture ? (
                        <img src={user?.profilePicture} alt={`${user?.username}'s profile`} className='profilePicture'/>
                    ) : (
                        <div className='defaultAvatar'>
                            {'NO AVATAR IS HERE'}
                        </div>
                    )}
                </div>
                   
                <div className='profileDetail'>
                    <span>Username:</span>
                    <span>@{user?.username}</span>
                </div>
                
                <div className='profileDetail'>
                    <span >About me:</span>
                    <span>
                        {user?.aboutMe || "This user hasn't added a bio yet"}
                    </span>
                </div>
           </div>
        </div>
    ) 
}

export default ProfileDetails;