import styles from './folder.module.scss'


const Folder = (props) => {
    return (
     <div className={styles.folder} onClick={props.onClick}>
       <img src={props.folderImage} alt="" className={styles.folder__img} /> {/* Если ты создаешь папку то src = {} */}
       <p className={styles.folder__name}>{props.folderName}</p>
     </div>
    )
}

export default Folder