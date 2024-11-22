import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
/*import { numberWithCommas } from "../CoinsTable";*/ // import it later 

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
let carouselRequestCount = 0;
const Carousel = () => {

    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        carouselRequestCount++;
        console.log(`API Request ${carouselRequestCount}: Fetching trending coins for currency: ${currency}`);
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data);
    };

    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link to={`/coins/${coin.id}`}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    color: "white",
                }}
                >
                    <img
                        src={coin?.image}
                        alt={coin.name}
                        height="80"
                        style={{ marginBottom: 10 }}
                    />
                    <span>
                        {coin?.symbol}
                        &nbsp;
                        <span style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                        >
                            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                    </span>
                    <span style={{ fontSize: 22, fontWeight: 500 }}>
                        {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
                </Box>
            </Link>
        );
    });

    const resposive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <Box
            sx={{
                height: "50%",
                display: "flex",
                alignItems: "center",
            }}
        >
            <AliceCarousel
                mouseTracking
                infinte
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={resposive}
                autoPlay
                items={items}
            />
        </Box>
    )
};

export default Carousel;

