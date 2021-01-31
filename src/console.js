import React from 'react';

export default (props) => {
  const { consoleLogs, clearConsole } = props;

  return (
    <div className="console">
      <h3>Konsole</h3>
      <button onClick={clearConsole}>Konsole löschen</button>

      {
        consoleLogs.map((log, key) => {
          return (
            <div key={ key }>
              <span>{ log }</span>
              <br/>
            </div>
          )
        })
      }
    </div>
  )
}
