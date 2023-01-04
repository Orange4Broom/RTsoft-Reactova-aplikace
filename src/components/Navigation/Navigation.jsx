import './Navigation.css';

function Navigation() {
    return (
        <nav id="navigation-bar">
            <div id="navigation-content">
                <a href="./index.html"><h1 id="company-name"><span id="name-color">RT</span>soft</h1></a>

                <ul>
                    <li><a href="./index.html" className='nav-link'>Všechny</a></li>
                    <li><a href="#" className='nav-link'>Oblíbené</a></li>
                </ul>

            </div>
        </nav>
    )
}

export default Navigation;