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
    <div className='text-center justify-content-center' align="center">
      <h1>Pizzák</h1>
      {isFetchPending ? (
        <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      ) : (
        <div className="container text-center miert" align="center">
        <div className="row" align="center">
          {pizzas.map(pizza => (
            <div key={pizza.id} align="center">
              <div className="col-md-4 card miert" align="center">
                <div className="card-body">
                  <h1 className="card-title">{pizza.name}</h1>
                  <p className="card-text">{pizza.isGlutenFree}</p>
                  <img src={pizza.kepURL} className="card-image" alt={pizza.name} />
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

