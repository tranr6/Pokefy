import './App.css';
import NavBar from './components/Navbar.js';
import LoginButton from './components/LoginButton.js';

function App() {

  return (
    <div>
      <NavBar></NavBar>
      <h1>HELLO MUSIC LOVERS! CHOOSE YOUR TEAM.</h1>
      <p>PAIR YOUR FAVORITE SPOTIFY ARTISTS WITH THEIR POKEMON TYPES</p>
      <LoginButton></LoginButton>
    </div>
    
  );

}

export default App;
