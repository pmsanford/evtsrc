import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const [results, setResults] = useState<string>('');
  const [syncResults, setSyncResults] = useState<string>('');
  const getEvents = () => {
    var evtSrc = new EventSource("/rest/get_results");
    evtSrc.addEventListener('jobinitiated', (e) => {
      console.log("Got init result:")
      console.log(e)
      setResults("Initiated")
    })
    evtSrc.addEventListener('jobprogress', (e) => {
      console.log("Got progress result:")
      console.log(e)
      var ssevent = e as MessageEvent
      setResults(`Progress report: ${ssevent.data}`)
    })
    evtSrc.addEventListener('jobfinished', (e) => {
      evtSrc.close()
      console.log("Got finished result:")
      console.log(e)
      var ssevent = e as MessageEvent
      setResults(`Finished: ${ssevent.data}`)
    })
    evtSrc.onerror = (e) => {
      console.log(e)
    }
    console.log("initiated")
  }
  const getSync = () => {
    fetch('/rest/sync_results').then(resp => {
      return resp.text()
    }).then(txt => {
      setSyncResults(txt)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <button onClick={getEvents}>Get streaming results</button> <button onClick={getSync}>Get sync results</button>
          <pre>Streaming:{'\n'}
          {results}</pre>
          <pre>Sync:{'\n'}
          {syncResults}</pre>
        </div>
      </header>
    </div>
  );
}

export default App;
