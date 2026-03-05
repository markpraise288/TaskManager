
export const Button = ({className, children, onClick, variant}) => {

    return (
        <button className={className} onClick={onClick} >
            {children}
        </button>
    )
}
