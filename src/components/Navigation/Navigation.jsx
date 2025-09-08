import styles from './Navigation.module.css';

export default function Navigation () {
    return (
        <nav className={styles.con}>
            <div className={styles.logo_con}>
                EMF Intel
            </div>
            <div className={styles.others_con}>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </nav>
    )
}