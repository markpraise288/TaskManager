
export const Input = ({ className, type, name, value, checked, placeholder, onChange, autoComplete}) => {
    return (
        <input className={className} type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} checked={checked} autoComplete={autoComplete}/>
    )
}
