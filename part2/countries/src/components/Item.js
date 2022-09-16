import React from 'react'

const Item = (props) => {
    return (
        <div>
        <li>{props.item} <button onClick={() => props.name(props.item)}>show</button></li>
        </div>
    )
}

export default Item