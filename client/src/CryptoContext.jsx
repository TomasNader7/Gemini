import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CoinList } from './config/api';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Crypto = createContext();

const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
    });

    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user.uid);

           var unsubscribe = onSnapshot(coinRef, (coin) => {
                if (coin.exists()) {
                    setWatchlist(coin.data().coins);
                } else {
                    console.log("No items in the Watchlist");
                }
           });
            return () => {
                unsubscribe();
            };
        }
    }, [user])

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, [])

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
        <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist }}>
            {children}
        </Crypto.Provider>
    );
};

export { Crypto };
export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto)
};
