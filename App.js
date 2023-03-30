//import logo from './logo.svg';
import './App.css';
import React,{ useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const [mydata,setData] = useState([]);
  const apiGet = () => {
    fetch('https://data.covid19india.org/data.json')
    .then((response) =>response.json())
    .then((json)=> {
      console.log(json);
      setData(json.data);
    });
  };

  useEffect(()=> {
    apiGet();
    const interval = setInterval(() => {
      apiGet();
    }, 500000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
     <Table width="100%" class="table">
      <thead><tr>
        <th>State Name</th>
        <th>Total Confirmed</th>
        <th>Total Recoverd</th>
        <th>Total Deaths</th>
      </tr></thead>
      <tbody>      {
        mydata.map(
          (value) => {
          return <tr><td>{value.state}</td><td>{value.confirmed}</td><td>{value.recovered}</td><td>{value.deaths}</td></tr>
          }
          
        )
    }
    </tbody>
      
     </Table>
    </div>
  );
}

export default App;
