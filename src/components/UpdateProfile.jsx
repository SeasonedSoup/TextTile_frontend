import '../styles/profile.css'
import getApiUrl from '../utils/getApiUrl';
import { useState, useEffect} from 'react';
import { useAuth } from './AuthToken/AuthContext';
function Profile() {
    const {user} = useAuth(); 

    const [username, setUsername] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [profileUrl, setProfileUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    useEffect(() => {
        function setProfile() {
            setUsername(user.username || '');
            setAboutMe(user.aboutMe || '');
            setProfileUrl(user.profilePicture || null);
        }
    if (user) {
        setProfile();
    }
  }, [user]);

    const profileChangeHandler = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageFile(file)
            setProfileUrl(URL.createObjectURL(file))
        }
    }


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
            alert('Profile updated successfully');
        } catch (err) {
            console.error('Error updating profile', err);
            alert('error unable to update profile');
        }
    }

    const changePassword = async(e) => {
        e.preventDefault();

        if (newPass != confirmPass) {
            alert('Password confirmation and new password are not the same!')
            return;
        }
        
        const token = localStorage.getItem('token');
        const result = await fetch(getApiUrl() + '/changePassword' , {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({oldPassword: oldPass, newPassword: newPass})
        })
        console.log(result)
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
                <form action="" className='passwordForm' onSubmit={changePassword}>
                    <label htmlFor="prevPassword">Previous Password:</label>
                    <input type="password" htmlFor="prevPassword" autoComplete='current-password' value={oldPass} onChange={(e) => setOldPass(e.target.value)}/>
                    <label htmlFor="newPassword">New Password:</label>
                    <input type="password" htmlFor="newPassword" autoComplete='new-password' value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" htmlFor="confirmPassword" autoComplete='new-password' value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                    <button>Change Password</button>
                </form>
            </div>
        </div>
    )
};


export default Profile;