import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('RUB');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);
  const [rates, setRates] = React.useState({});

  React.useEffect(()=>{
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
    .then((json) => {
      setRates(json.rates);
      onChangeToPrice(1);
    })
    .catch((err) => {
      console.warn(err);
      alert('Не удалось получить информацию')
    })
  }, []);

  const onChangeFromPrice = (value) =>{
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setToPrice(result.toFixed(3))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) =>{
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result.toFixed(3))
    setToPrice(value)
  }

  React.useEffect(()=>{
   onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(()=>{
    onChangeToPrice(toPrice);
   }, [toCurrency]);
 
  return (
    <div className="App">
      <Block 
      value={fromPrice} 
      currency={fromCurrency} 
      onChangeCurrency={setFromCurrency} 
      onChangeValue={onChangeFromPrice} 
      />
      <Block 
      value={toPrice} 
      currency={toCurrency} 
      onChangeCurrency={setToCurrency} 
      onChangeValue={onChangeToPrice} 
      />
    </div>
  );
}

export default App;
