import * as React from 'react'
import './App.css';

import {useTabSharedState} from './useTabSharedState';

function App() {
  const [value, setValue] = useTabSharedState<number>('test', 1);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value

    // set locally
    setValue(Number(newValue))
  }

  return (
    <div className="App" >
      <header className="App-header" >
        <p>
          <input type='range' value={value} min={0} max={10} onChange={handleChange} />
        </p>
      </header>
    </div>
  );
}

export default App;
