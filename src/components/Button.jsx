import PropTypes from "prop-types";
/*
Here by i am creating a common button component*/
const Button=({
    classes='',
    variant='filled',
    color='primary',
    children,
    ...rest
})=>{
    return (
        <button className={`btn ${variant} ${color} ${classes} {...rest}`}>
            {children}
            <div className="state-layer"></div>
        </button>

    )

}
Button.PropTypes={
    classes: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.any,
};

export  {Button};
