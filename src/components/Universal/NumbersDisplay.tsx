import * as React from 'react'

interface IProps{
    numbers:Number[];
}

function NumbersDisplay({numbers}:IProps) {
  return (
    <div className="num-display-container">
        {numbers.map((n)=>(<div className="num-display-value">{n.toString()}</div>))}
    </div>
  )
}

export default NumbersDisplay