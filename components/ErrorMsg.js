import React from 'react'
import Div from './Div'
import Typhography from './Typhography'

const ErrorMsg = ({ children, className }) => {
    return (
        <Div className={className}>
            {children}
        </Div>
    )
}

export default ErrorMsg