import classes from './detaile-ingredient.module.css'

const Detail = ({header, value}) => {
    return (
        <div className={`${classes.root} text_color_inactive`}>
            <p className={`${classes.text} text text_type_main-default`}>{header}</p>
            <p className={`${classes.text} text text_type_digits-default`}>{value}</p>
        </div>
    );
}

export default Detail;
