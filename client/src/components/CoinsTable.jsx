import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        mode: "dark",
    },
});

const CoinsTable = () => {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const history = useNavigate();

    const { currency, symbol, coins, loading, fetchCoins } = CryptoState();


    console.log(coins);

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField
                    label="Search For a Crypto Currency.."
                    variant="outlined"
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold" }} />
                        ) : (
                            <Table>
                                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Montserrat",
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "left" : "right"}

                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {handleSearch()
                                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map(row => {
                                            const profit = row.price_change_percentage_24 > 0;

                                            return (
                                                <TableRow
                                                    onClick={() => history(`/coins/${row.id}`)}
                                                    key={row.name}
                                                    sx={{
                                                        backgroundColor: "#16171a",
                                                        cursor: "pointer",
                                                        "&:hover": {
                                                            backgroundColor: "#131111",
                                                        },
                                                        fontFamily: "Montserrat",
                                                    }}
                                                >
                                                    <TableCell component='th' scope='row'
                                                        style={{
                                                            display: "flex",
                                                            gap: 15,
                                                        }}
                                                    >
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />
                                                        <div
                                                            style={{ display: "flex", flexDirection: "column" }}
                                                        >
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                }}
                                                            >
                                                                {row.symbol}
                                                            </span>
                                                            <span style={{ color: "darkgrey" }}>{row.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {symbol}{" "}
                                                        {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {profit && "+"}
                                                        {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {symbol}{" "}
                                                        {numberWithCommas(
                                                            row.market_cap.toString().slice(0, -6)
                                                        )}
                                                        M
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        )}
                </TableContainer>

                <Pagination sx={{
                    "& .MuiPaginationItem-root": {
                        color: "gold",
                    },
                }}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    count={Math.ceil(handleSearch()?.length / 10)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />

            </Container>
        </ThemeProvider>
    );
};

export default CoinsTable;