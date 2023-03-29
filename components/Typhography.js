import React from 'react'

const Typhography = (props) => {
  return (
    <props.as className={props.className}>
        {props.children}
    </props.as>
  )
}

export default Typhography