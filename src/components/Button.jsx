import React from 'react'

function Button({handleClick,className,label}) {
  return (
    <button onClick={handleClick} className={className} >
      {label}
    </button>
  )
}

export default Button
