import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to DocSpot</h1>
      <p>This is the homepage.</p>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/appointments">My Appointments</Link>
      </nav>
    </div>
  );
}

export default Home;