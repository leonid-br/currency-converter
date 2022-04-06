import { useState, useEffect } from 'react';

import s from './ExchangeRates.module.css';
import getRates from 'services/getRate-api';
import { currencyCod } from 'helpers/currency-code';

const ExchangeRates = () => {
    const [currentCur, setCurrentCur] = useState('');
    const [rates, setRates] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            const rates = await getRates();
            setRates(rates.data.rates);
        };
        fetchRates().catch(console.error);
    }, []);

    const options = currencyCod.map((curCod, idx) => {
        return (
            <option key={idx} value={curCod}>
                {curCod}
            </option>
        );
    });
    return (
        <>
            <h2 className={s.title}>Сurrent exchange rate</h2>
            <select
                value={currentCur}
                onChange={e => setCurrentCur(e.target.value)}
                className={s.select}
            >
                {options}
            </select>

            <ul className={s.list}>
                {currentCur
                    ? currencyCod.map(cur => {
                          if (
                              cur === 'select currency' ||
                              cur === currentCur
                          ) {
                              // eslint-disable-next-line array-callback-return
                              return;
                          }
                          if (currentCur === 'select currency') {
                              return '';
                          } else {
                              return (
                                  <li key={cur}>
                                      <span>
                                          1 {currentCur} ={' '}
                                      </span>
                                      <span className={s.cours}>
                                          {(
                                              rates[cur] /
                                              rates[currentCur]
                                          ).toFixed(2)}
                                      </span>
                                      {cur}
                                  </li>
                              );
                          }
                          //   return (
                          //       <li key={cur}>
                          //           <span>1 {currentCur} = </span>
                          //           <span className={s.cours}>
                          //               {(
                          //                   rates[cur] /
                          //                   rates[currentCur]
                          //               ).toFixed(2)}
                          //           </span>
                          //           {cur}
                          //       </li>
                          //   );
                      })
                    : ''}
                {}
            </ul>
        </>
    );
};

export default ExchangeRates;
