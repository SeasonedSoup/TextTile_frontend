import {useState } from 'react'
import './App.css'
import './styles/reset.css'
import Header from './components/Header';
import getApiUrl from './utils/getApiUrl';
import { useAuth } from './components/AuthToken/AuthContext';
import returnIcon from './assets/return-button.png'
import Dashboard from './components/Dashboard';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [activeForm, setActiveForm] = useState('none');
  const {user, setUser} = useAuth();

  function signUp() {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
      setActiveForm('signup');
    }
  }

  function login() {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
      setActiveForm('login');
    }
  }

  function closeModal() {
    setShowForm(false);
    setActiveForm(null);
  }

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  async function createAccount(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const result = await fetch(getApiUrl() + '/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
      });

      if(!result.ok) {
        throw new Error(`Error status: ${result.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function loginAccount(e) {
    e.preventDefault();

    if (!password || !username) {
      return alert('password must not be empty');
    }

    try {
      const response = await fetch(getApiUrl() + '/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if(!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setUser(data.user);
      
    } catch (err) {
      console.error(err);
    }
  }
  
  if (user) {
    return <Dashboard/>
  }


  return (
    <div className='wrapper'>
      <Header></Header>
      <div className='text'>
        <h1 className='callToAction'>Welcome to TextTile</h1>
        <h2>TextTile is a cool chatting platform where you can chat and talk with other people! (not real-time) <br /> Sign Up now with your username! </h2>
      </div>
      <button className="signUpBtn" onClick={signUp}>Sign Up</button>
      <button className="signUpBtn" onClick={login}>Log In</button>
      
      {showForm && activeForm === 'signup' &&
        <div className='modal'>
          <form className='signUpForm' method="POST" onSubmit={createAccount} >
            <button className='close-btn' type='button' onClick={closeModal}>
              <img src={returnIcon} alt="Go back" />
            </button>
            <h1>Sign up</h1>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username'required />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" placeholder='••••••••' required/>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" htmlFor="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password"  placeholder='••••••••'required/>

            <button className='submit-btn'>Create Account</button>
          </form>
        </div>
      }

      { showForm && activeForm === 'login' &&
        <div className='modal'>
          <form className='loginForm' method="POST" onSubmit={loginAccount}>
            <button className='close-btn' type='button' onClick={closeModal}>
              <img src={returnIcon} alt="Go back" />
            </button>
            <h1 >Log in</h1>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"  placeholder='••••••••' required/>
            <button className='submit-btn'>Log In</button>
          </form>
        </div>
      }
      <a href="/TextTile-Dashboard">VIEW DASHBOARD</a>
    </div>
  )
}

export default App
