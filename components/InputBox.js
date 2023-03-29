import React from 'react'

const InputBox = ({ onChange, type, className, id, name, value, placeholder, disabled, checked, maxlength }) => {
    return (
        disabled
            ?
            <input onChange={onChange} type={type} className={className} id={id} name={name} value={value} placeholder={placeholder} checked={checked} disabled={disabled} maxLength={maxlength}/>
            :
            <input onChange={onChange} type={type} className={className} id={id} name={name} value={value} placeholder={placeholder} checked={checked} maxLength={maxlength}/>

    )
}

export default InputBox