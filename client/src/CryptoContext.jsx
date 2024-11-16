import React, { createContext } from 'react';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    return (
        <Crypto.Provider value={{}}>
            {children}
        </Crypto.Provider>
    );
};

export { Crypto };
export default CryptoContext;
