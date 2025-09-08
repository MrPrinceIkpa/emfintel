import styles from './Features.module.css';
import icon from '../../../public/good.svg';
import Image from 'next/image';

export default function Features() {
    return (
        <div className={styles.con}>
            <div className={styles.headCon}>
                <h3>Our Features are quite A lot</h3>
            </div>
            <div className={styles.body}>
                <div className={styles.cardCon}>
                    <div><Image  style={{width:"10%", height:"auto"}} src={icon}/></div>
                    <h4>Sustainable</h4>
                    <p>Sustainable Service as it is</p>
                </div>
                <div className={styles.cardCon}>
                    <div><Image  style={{width:"10%", height:"auto"}} src={icon}/></div>
                    <h4>Reliable</h4>
                    <p>Our Stats Speak, you can lean on our analysis</p>
                </div>
                <div className={styles.cardCon}>
                    <div><Image  style={{width:"10%", height:"auto"}} src={icon}/></div>
                    <h4>Easy to Use</h4>
                    <p>AS easy as A, B and C</p>
                </div>
                <div className={styles.cardCon}>
                    <div><Image  style={{width:"10%", height:"auto"}} src={icon}/></div>
                    <h4>Helpful</h4>
                    <p>Our service is helpful, to the society at large</p>
                </div>
            </div>
        </div>
    )
}