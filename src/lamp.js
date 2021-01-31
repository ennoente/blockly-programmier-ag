import React from 'react';

import LED from './LED.svg';

export default props => {
  const { lampState } = props;

  return (
    <div className="lamp">
      <div style={{ backgroundColor: `${lampState}` }} className="led_circle"/>
      {/*
        <svg className="led" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title>background</title>
            <rect fill="#fff" id="canvas_background" height="296" width="371" y="-1" x="-1"/>
            <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
              <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
            </g>
          </g>
          <g>
            <rect stroke="#000" id="svg_1" height="114" width="367" y="179.75" x="0.75" stroke-width="1.5"
                  fill="#BBBBBB"/>
            <rect id="svg_2" height="37" width="37" y="141.75" x="162.75" stroke-opacity="null" stroke-width="1.5"
                  stroke="#000" fill="#BBBBBB"/>
            <ellipse ry="72" rx="77" id="svg_4" cy="72.75" cx="177.75" stroke-opacity="null" stroke-width="1.5"
                     stroke="#000" fill="#ffffff"/>
          </g>
        </svg>
      */ }


      {/*
        <img className="led" src={ LED } alt="An LED"/>
      */ }
    </div>
  )
};
