import { NavLink } from 'react-router-dom';

import s from './Header.module.css';

const Header = () => {
    return (
        <header className="header">
            <ul className={s.list}>
                <li>Currency Converter</li>
                <li>
                    <NavLink to="/currency-converter">
                        <span>selected currency converter</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/exchange-rates">
                        current exchange rates
                    </NavLink>
                </li>
                <li>
                    {new Date().toLocaleString('ru', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </li>
            </ul>
        </header>
    );
};

export default Header;
