import style from './Spinner.module.css';
import cx from 'classnames';

const Spinner = () => {
    return (
        <div className={style['spin-container']}>
            <div className={style.spin}></div>
            <div className={cx(style.spin, style.loader2)}></div>
            <div className={cx(style.spin, style.loader3)}></div>
            <div className={cx(style.spin, style.loader4)}></div>
            <span className={style.text}>LOADING...</span>
        </div>
    );
};

export default Spinner;
