import { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [value, setValue] = useState(0);

  const postData = async (data) => {
    const {url, body} = data
        return   axios
                .post(url, body, 
                    {
                        headers:{"Content-Type": "application/json"}
                    })
            
                .then( response =>  response)
  }

  const getData = async (url) => {
        return   axios
                .get(url, 
                    {
                        headers:{"Content-Type": "application/json"}
                    })
            
                .then( response =>  response)
  }

  function handleChange(e){
    e.preventDefault();
    const target = e.target;
    setData(target.value);
  }

  async function handleSubmit(e){
    e.preventDefault();
    const response = await postData({url: `${process.env.REACT_APP_URL}total/add/`, body: data})
    setValue(response.data)
  }
 
  async function initialValue(){
    const response = await getData(`${process.env.REACT_APP_URL}total/view/`)
    setValue(response.data)
  }
  useEffect(() => {
    initialValue();
  })
  return (
    <div className="App">
      <header className="App-header">
        <p>Add To The Total</p>
      </header>
      <form onSubmit={handleSubmit}>
      <input type='number' name='counter' placeholder='Type here...' onChange={handleChange} />
      <button>Add</button>
      <p>current total: {value}</p>
      </form>
    </div>
  );
}

export default App;
