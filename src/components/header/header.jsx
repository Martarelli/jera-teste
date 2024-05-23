import './header.css';
import {Link} from 'react-router-dom'

function Header() {
    return (
        <header>
            <div>
                <h2>React</h2>
            </div>
            <div className='links'>
                <Link to='/'>Dashboard</Link>
                <Link to='/dashboard'>Login</Link>
            </div>
        </header>
    )
}

export default Header;