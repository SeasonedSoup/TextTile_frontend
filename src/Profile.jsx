import './styles/profile.css'

function Profile() {
    return (
        <div className='profileLayout'>
            <div className='profileModal'>
                 <h1>Your Profile</h1>
                <form action="" className='generalInfoForm'>
                    <img src="" alt="Your profile pic that you can edit with cloudinary upload and stuff" />
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" />
                    <label htmlFor="aboutme">About me: </label>
                    <textarea name="aboutme" id="aboutme"></textarea>
                </form>

                <button>Update password</button>
                <form action="" className='passwordForm'>
                    <label htmlFor="prevPassword">Previous Password:</label>
                    <input type="password" htmlFor="prevPassword" />
                    <label htmlFor="newPassword">New Password:</label>
                    <input type="password" htmlFor="newPassword" />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" htmlFor="confirmPassword" />
                </form>
            </div>
        </div>
    )
};


export default Profile;