import '../styles/profile.css'
import getApiUrl from '../utils/getApiUrl';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthToken/AuthContext';
function Profile() {
    const {user} = useAuth(); 

    const [username, setUsername] = useState(user?.username || '');
    const [aboutMe, setAboutMe] = useState( user?.aboutMe || '');
    const [profileUrl, setProfileUrl] = useState(user?.profilePicture || null);
    const [imageFile, setImageFile] = useState(null);
    
    const profileChangeHandler = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageFile(file)
            setProfileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
    if (user) {
       
        if (!username && user.username) {
            setUsername(user.username);
        }
        if (!aboutMe && user.aboutMe) {
            setAboutMe(user.aboutMe);
        }
        
        if (!imageFile && user.profilePicture) {
            setProfileUrl(user.profilePicture);
        }
    }
    // We include username, aboutMe, and imageFile to satisfy React's compiler rules
}, [user, username, aboutMe, imageFile]);

    const updateProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('aboutMe', aboutMe);

        if (imageFile) {
            formData.append('profilePicture', imageFile);
        }

        try {
            const token = localStorage.getItem('token');

            const result = await fetch(getApiUrl() + '/updateProfile' , {
                method: 'PATCH',
                headers : {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            console.log(result)

        } catch (err) {
            console.error('Error updating profile', err);
            alert('error unable to update profile');
        }
    }
    return (
        <div className='profileLayout'>
            <div className='profileModal'>
                 <h1>Your Profile</h1>
                <form action="" className='generalInfoForm' onSubmit={updateProfile}>
                    <img src={profileUrl} alt="Your profile pic that you can edit with cloudinary upload and stuff" className='profilePicture'/>
                    <label htmlFor="file">Change Photo: </label>
                    <input type="file" id='file' name='file' accept='img/*' onChange={profileChangeHandler} />
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="aboutme">About me: </label>
                    <textarea name="aboutme" id="aboutme" value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} ></textarea>
                    <button>Update Profile</button>
                </form>

                <button>Update password</button>
                <form action="" className='passwordForm'>
                    <label htmlFor="prevPassword">Previous Password:</label>
                    <input type="password" htmlFor="prevPassword" autoComplete='current-password'/>
                    <label htmlFor="newPassword">New Password:</label>
                    <input type="password" htmlFor="newPassword" autoComplete='new-password' />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" htmlFor="confirmPassword" autoComplete='new-password' />
                </form>
            </div>
        </div>
    )
};


export default Profile;