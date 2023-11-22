import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
const apiUrl = 'https://pizza.kando-dev.eu/Pizza?authuser=0';
const App = () => {
  const [isFetchPending, setFetchPending] = useState(true);
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const formattedData = data.map(pizza => ({
          ...pizza,
          isGlutenFree: pizza.isGlutenFree ? 'Gluténmentes pizza' : 'NEM gluténmentes pizza',
        }));

        setPizzas(formattedData);
        setFetchPending(false);
      } catch (error) {
        console.error('Hiba', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Pizzák</h1>
      {isFetchPending ? (
        <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      ) : (
        <div className="container">
        <div className="row">
          {pizzas.map(pizza => (
            <div key={pizza.id}>
              <div className="col-md-4 card">
                <div className="card-body">
                  <h1 className="card-title">{pizza.name}</h1>
                  <p className="card-text">{pizza.isGlutenFree}</p>
                  <div className='pizzastaska'>
                    <img src={pizza.kepURL} className="pizzastaska card-image" alt={pizza.name} />
                  </div>
                </div>
                
              </div>
            </div>
            ))}
          </div>
          </div>
      )}
    </div>
  );
};

export default App;

