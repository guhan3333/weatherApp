import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';




function App() {
  const [city, setCity] = useState();
  const [CitySuggestion, setCitysuggestion] = useState([]);

  const AutoCompURL = "https://api.weatherapi.com/v1/search.json?key=aa42f106a0e2473795e63351241510&q="



  useEffect(() => {
    if (city && city.length > 3) {
      fetchAutoCompApi();
    }
    // fetchAutoCompApi();
  }, [city]);


  const fetchAutoCompApi = async () => {
    try {
      const response = await axios.get(AutoCompURL + city);
      const resp = response.data;
      // console.log("api call", resp);
      const cityData = resp.map((data) => {
        return `${data.name},${data.region}, ${data.country}`
      });
      setCitysuggestion(cityData);
    }
    catch (defineError) {
      console.log('error', defineError);
    }
  }

  return (
    <div className="container bg-secondary p-5 rounded mt-5">
      <input type="text" className='form-control' onChange={(e) => { setCity(e.target.value) }} />
      {/* {city && <h4>{city}</h4>} */}
      {CitySuggestion && CitySuggestion.map((data) => {
        return <div className='text-center bg-info rounded p-1 bg-opacity-50 border border border-opacity-50 text-white'><h4>{data}</h4></div>;
      })}
    </div>
  );
}

export default App;
