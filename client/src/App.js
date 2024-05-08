import logo from './logo.svg';
import {useEffect, useState} from "react";
import './App.css';

function App() {
  const [test, setTest] = useState();
  useEffect(() => {
    fetch("http://localhost:5000")
      .then(response => response.json())
      .then(data => {
        setTest(data)
      })
  })
  return (
    <div className="App">
      {test}
    </div>
  );
}

export default App;
