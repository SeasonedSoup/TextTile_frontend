import './styles/header.css'

function Header() {
    return ( 
    <div className="header">
        <h1>TextTile</h1>

        <img src="" alt="default profile" />
        <h1>Hello, user!</h1>
        <button>Log in</button>
        <button>Log out</button>
    </div>
    )
}

export default Header;