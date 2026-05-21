import './App.css'

function App() {

  return (
    <>
      <h1 className='callToAction'>Welcome to TextTile</h1>
      <h2>TextTile is a cool chatting platform where you can chat and talk with other people! (not real-time) <br /> Sign Up now with your username! </h2>
      <button>Sign Up</button>
      <form action="#">
        <label htmlFor="username">Username: </label>
        <input id="username" name="username "type="text" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button>Create Account</button>
      </form>
    </>
  )
}

export default App
