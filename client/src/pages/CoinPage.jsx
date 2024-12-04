import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/CoinInfo';
import { Box, Typography, LinearProgress, Button } from "@mui/material";
import parse from 'html-react-parser';
import { numberWithCommas } from '../components/Banner/Carousel';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

let coinPageRequestCount = 0;
const CoinPage = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol, user, watchlist, setAlert } = CryptoState();

    const fetchCoin = async () => {
        coinPageRequestCount++;
        console.log(`API Request ${coinPageRequestCount}: Fetching coin data for: ${id}`);
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };

    console.log(coin);

    useEffect(() => {
        fetchCoin();
    }, []);

    const inWatchlist = watchlist.includes(coin?.id);

    const addToWatchlist = async () => {
        if (!coin?.id) {
            setAlert({
                open: true,
                message: "Invalid coin ID.",
                type: "error",
            });
            return;
        }
        const coinRef = doc(db, "watchlist", user.uid);

        try {
            await setDoc(coinRef,
                {
                    coins: watchlist ? [...watchlist, coin.id] : [coin?.id],
                });

            setAlert({
                open: true,
                message: `${coin.name} Added to the Watchlist !`,
                type: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    };

    const removeFromWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid);

        try {
            await setDoc(coinRef,
                {
                    coins: watchlist.filter((watch) => watch !== coin?.id) 
                },
                {merge: true}
            );

            setAlert({
                open: true,
                message: `${coin.name}Removed from the Watchlist !`,
                type: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    };


    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { md: "row", xs: "column" },
                alignItems: { md: "flex-start", xs: "center" },
            }}
        >
            <Box
                sx={{
                    width: { md: "30%", xs: "100%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 3,
                    borderRight: { md: "2px solid grey", xs: "none" },
                    minHeight: "80vh",
                }}
            >
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: 3,
                        fontFamily: "Montserrat",
                    }}
                >
                    {coin?.name}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{
                        width: "100%",
                        fontFamily: "Montserrat",
                        padding: 3,
                        paddingBottom: 2,
                        textAlign: "justify",
                    }}
                >
                    {parse(coin?.description.en.split(". ")[0] || "")}.
                </Typography>
                <Box
                    sx={{
                        alignSelf: "start",
                        padding: 3,
                        width: "100%",
                        display: { md: "block", sm: "flex" },
                        justifyContent: { sm: "space-around", xs: "flex-start" },
                        flexDirection: { sm: "row", xs: "column" },
                        alignItems: { xs: "center", sm: "flex-start" },
                    }}
                >
                    <Box sx={{ display: "flex", marginBottom: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                        >
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                            {numberWithCommas(coin?.market_cap_rank)}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", marginBottom: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                        >
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", marginBottom: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", fontFamily: "Montserrat" }}
                        >
                            Market Cap:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.market_cap[currency.toLowerCase()]
                                    .toString()
                                    .slice(0, -6)
                            )}
                            M
                        </Typography>
                    </Box>
                        {user && (
                            <Button
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    height: 40,
                                    backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                                }}
                                onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
                            >
                                {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                            </Button>
                            )}
                    </Box>
                </Box>
            <CoinInfo coin={coin} />
        </Box>
    );
};

export default CoinPage;