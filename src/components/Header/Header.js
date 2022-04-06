import { NavLink } from 'react-router-dom';

import s from './Header.module.css';

const Header = () => {
    const setActiveClass = ({ isActive }) =>
        isActive
            ? `${s.header__item} ${s.activeNavLink}`
            : `${s.header__item}`;

    return (
        <header className={s.header}>
            <h2 className={s.name}>Currency Converter</h2>
            <span className={s.date}>
                {new Date().toLocaleString('en', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </span>
            <ul className={s.list}>
                <li>
                    <NavLink
                        to="/currency-converter"
                        className={setActiveClass}
                    >
                        <span>Selected currency converter</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/exchange-rates"
                        className={setActiveClass}
                    >
                        Current exchange rates
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;
