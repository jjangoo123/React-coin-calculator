
import {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [coins,setCoins] = useState([]);
  const [money,setMoney] = useState(0);
  const [BTC,setBTC] = useState(0);
  const [select,setSelect] = useState(0);

  const onChange = (event) => {
    setMoney(event.target.value)
  }
  const onChangeValue = (event) =>{
    setSelect(event.target.value);
    
  }
  const Calculate =() => {
    setBTC((money/coins[select].quotes.USD.price).toFixed(6));
    console.log(coins[select]);
  }
  /* useEffect로 api 패치*/
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    })
  },[]);


  return (
    <div className="App">
      {/*Heading*/}
      <h1>The Coins!({loading? "Loading":coins.length})</h1>
      <input type="number" onChange={onChange} value={money} />
      <select value ={select} onChange={onChangeValue}>
        {coins.map((coin,index)=>
        <option key={coin.id} value={index}>{coin.name}:{coin.quotes.USD.price}USD</option>)}
      </select> 
      <button onClick={Calculate}>Calculate!</button>
      <h2> you will have {BTC} !</h2>
     
     
    </div>
  );
}

export default App;
