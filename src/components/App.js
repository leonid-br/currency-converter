import { Route, Routes } from 'react-router-dom';

import Header from './Header';
import CurrencyConverter from './CurrencyConverter';
import ExchangeRates from './ExchangeRates';

import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/currency-converter"
                    element={<CurrencyConverter />}
                />
                <Route
                    path="/exchange-rates"
                    element={<ExchangeRates />}
                />
            </Routes>
        </div>
    );
}

export default App;
