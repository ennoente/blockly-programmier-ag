import React from 'react';

export default props => {
    const {lampState} = props;

    return (
        <div className="lamp">
            <h3 style={{ textAlign: "center" }}>Die Lampe leuchtet:</h3>
            <div style={{backgroundColor: `${lampState}`}} className="led_circle"/>
        </div>
    )
};
