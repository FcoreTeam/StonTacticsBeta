import styles from './map.module.scss'

const Map = (props) => {
    return (
      <div className={styles.map}>
        <div className={`${styles.map__name} ${props.mapBackground}`}>
           {props.mapName}
        </div>
        <p className={styles.strategy__name}>{props.strategyName}</p>
      </div>
    )
}

export default Map