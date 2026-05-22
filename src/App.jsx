import { useState } from 'react'
import './App.css'
import './styles/reset.css'
import Header from './Header';
function App() {
  const [showForm, setShowForm] = useState(false);

  function signUp() {
    if (showForm) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }


  return (
    <div className='wrapper'>
      <Header></Header>
      <div className='text'>
        <h1 className='callToAction'>Welcome to TextTile</h1>
        <h2>TextTile is a cool chatting platform where you can chat and talk with other people! (not real-time) <br /> Sign Up now with your username! </h2>
      </div>
      <button className="signUpBtn" onClick={signUp}>Sign Up</button>
      
      {showForm &&
      <form className='signUpForm' action="#">
        <label htmlFor="username">Username: </label>
        <input id="username" name="username "type="text" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" htmlFor="confirmPassword" />

        <button>Create Account</button>
      </form>
      }
    </div>
  )
}

export default App
