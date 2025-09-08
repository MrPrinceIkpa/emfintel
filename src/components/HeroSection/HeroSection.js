import styles from './HeroSection.module.css';
import Button from '@/components/Button/Button';
import heroImg from '../../../public/heroImg.jpg';
    
export default function HeroSection (props) {
    var { scroll_to } = props;
    var mini_section = [
        {
            head: <h1>100</h1>,
            tail: "users"
        },
        {
            head: <h1>20</h1>,
            tail: "subscriptions"
        },
        {
            head: <h1>2</h1>,
            tail: "stations"
        }
    ]
    return (
        <div className={styles.con}>
            <div className={styles.hero_text}>
                <h1>Protect What Matters Most</h1>
                <h2>Check your home’s EMF exposure and create a healthier environment for your family</h2>
                <div className={styles.btn_con}>
                    <Button on_click={scroll_to} value="Try it Out!" />
                </div>
            </div>
            <div className={styles.hero_img}>
                <div className={styles.img}></div>
                <h3>discover, adapt!</h3>
            </div>
            <div className={styles.extra_text}>
                <ul>
                    {
                        mini_section.map((pair, index) => (
                            <li key={`${index}${pair.head}${pair.tail}`}>
                                <div className={styles.mini_head}>{pair.head}</div>
                                <div className={styles.mini_tail}>{pair.tail}</div>
                            </li>
                        ))

                    }
                </ul>
            </div>
        </div>
    )
}