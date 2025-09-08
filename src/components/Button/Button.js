import styles from './Button.module.css';

export default function Button(props) {
    var {value, on_click, custom_style} = props;
    return (
        <button style={custom_style} onClick={on_click} className={styles.con}>
            {value}
        </button>
    )
}