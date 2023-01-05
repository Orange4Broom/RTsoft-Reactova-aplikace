import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <nav id="navigation-bar">
            <div id="navigation-content">
                <Link to="/"><h1 id="company-name"><span id="name-color">RT</span>soft</h1></Link>

                <ul>
                    <li>
                        <Link to="/" className='nav-link' id='All'><span>Všechny</span></Link>
                    </li>
                    <li>
                        <Link to="/favourites" className='nav-lik' id='Favourites'><span>Oblíbené</span></Link>
                    </li>
                </ul>

            </div>
        </nav>
    )
}

export default Navigation;