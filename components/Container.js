import React from 'react'
import Div from './Div'

const Container = ({ className, children }) => {
    return (
        <Div className={className}>
            {children}
        </Div>
    )
}

export default Container