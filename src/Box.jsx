import React, {useState} from 'react';

function Box (props){

    return(
        <div className="Box">
            <div>{props.message}</div>
            <input className="boxInput" value={props.value} onChange={props.onChange}/>
        </div>
    )
}

export default Box