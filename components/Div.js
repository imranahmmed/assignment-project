import React from 'react'

const Div = ({ children, className, ref, onClick }) => {
    return (
        <div className={className} ref={ref} onClick={onClick}>
            {children}
        </div>
    )
}

export default Div