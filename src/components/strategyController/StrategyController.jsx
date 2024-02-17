import clsx from 'clsx';

import styles from './strategycontroller.module.scss'

const StrategyController = ({number, active, onClick}) => {
  return (
    <button className={clsx(styles.strategy__controller, active && styles.active)} onClick={onClick}>
     {number}
    </button>
  )
}
export default StrategyController;