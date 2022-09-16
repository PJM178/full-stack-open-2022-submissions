import React from 'react'

const Filter = (props) => {
    return (
        <div>find countries <input name="filter" value={props.value} onChange={props.function} /></div>
    )
}

export default Filter