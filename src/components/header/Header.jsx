import styles from './header.module.scss'

import logo from '../../img/logotype.png'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
       <div className={styles.header__wrapper}>
         <img src={logo} alt="" className={styles.header__img} />
         <nav className={styles.header__navigation}>
           <NavLink to="/strategy" className={navData => navData.isActive ? `${styles.choosen} ${styles.navigation__title}` : styles.navigation__title}>Стратегия</NavLink>
           <NavLink to="/grenades" className={navData => navData.isActive ? `${styles.choosen} ${styles.navigation__title}` : styles.navigation__title}>Раскидки</NavLink>
           <p className={styles.navigation__title}>Схемы игр</p>
           <p className={styles.navigation__title}>Комьюнити</p>
           <p className={styles.navigation__title}>Информация</p>
           <p className={styles.navigation__title}>Вход</p>
        </nav>


       <div className={styles.pro__wrap}>
        <div className={styles.pro}>
          PRO
         </div>

            <div className={styles.burger}>
              <span></span>
            </div>
          </div>
       </div> 
    </header>
  )
}

export default Header