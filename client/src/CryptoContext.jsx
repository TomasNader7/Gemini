import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CoinList } from './config/api';
const Crypto = createContext();

const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    let coinsTableRequestCount = 0;

    const fetchCoins = async () => {
        coinsTableRequestCount++;
        console.log(`API Request ${coinsTableRequestCount}: Fetching coins list for currency: ${currency}`);
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        if (currency === "USD") setSymbol("$");
        else if (currency === "ARG") setSymbol("AR$");
        // eslint-disable-nextline react-hooks/exhaustive-deps
    }, [currency]);

    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins }}>
            {children}
        </Crypto.Provider>
    );
};

export { Crypto };
export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto)
};
