import { useState, useEffect } from 'react';

import s from './CurrencyConverter.module.css';
import getRates from 'services/getRate-api';
import { currencyCod } from 'helpers/currency-code';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState('');
    const [startCur, setStartCur] = useState('select currency');
    const [endCur, setEndCur] = useState('select currency');
    const [endAmount, setEndAmount] = useState('');
    const [rates, setRates] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            const rates = await getRates();
            setRates(rates.data.rates);
        };
        fetchRates().catch(console.error);
    }, []);

    useEffect(() => {
        if (rates === null) {
            return;
        }

        if (endCur === '' || endCur === 'select currency') {
            return;
        }

        const amountCur =
            (rates[endCur] / rates[startCur]) * amount;

        setEndAmount(amountCur.toFixed(2));
    }, [endCur, rates, startCur, amount]);

    const handleAmountChange = ({ target: { value } }) =>
        setAmount(prev =>
            /\d+/.test(Number(value)) ? value : prev,
        );

    const options = currencyCod.map((curCod, idx) => {
        return (
            <option key={idx} value={curCod}>
                {curCod}
            </option>
        );
    });

    return (
        <>
            <div className={s.converter}>
                <form className={s.form}>
                    <label>
                        <span>Enter amount</span>
                        <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                        />
                    </label>
                </form>
                <div className={s.list}>
                    <div>
                        <span className={s.amount}>
                            {startCur === 'select currency'
                                ? ''
                                : amount}
                        </span>
                        <select
                            value={startCur}
                            onChange={e =>
                                setStartCur(e.target.value)
                            }
                        >
                            {options}
                        </select>
                    </div>
                    <span className={s.equals}> = </span>
                    <div>
                        <span className={s.amount}>
                            {isNaN(endAmount) ||
                            Number(endAmount) === 0 ||
                            endCur === 'select currency'
                                ? ''
                                : endAmount}
                        </span>
                        <select
                            value={endCur}
                            onChange={e =>
                                setEndCur(e.target.value)
                            }
                        >
                            {options}
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CurrencyConverter;
