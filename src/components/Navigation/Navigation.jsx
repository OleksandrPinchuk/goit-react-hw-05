import { NavLink } from "react-router-dom";
import css from './Navigation.module.css';

const Navigation = () => {
    return (
        <div className={css.box}>
            <nav className={css.navigation}>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/movies' className={css.link}>Movies</NavLink>
            </nav>
        </div>
    )
}
export default Navigation