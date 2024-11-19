import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';
import axios from "axios";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
// Import Chart.js components
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        mode: "dark",
    },
});

const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState([]);
    const [days, setDays] = useState(1);
    const [loading, setLoading] = useState(true);
    const { currency } = CryptoState();

    const fetchHistoricData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `/api/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`
            );
            setHistoricData(data.prices);
        } catch (error) {
            console.error("Error fetching historical data:", error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        if (coin) {
            fetchHistoricData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);

    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                sx={{
                    width: { md: "75%", xs: "100%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "25px",
                    padding: "40px",
                //    paddingTop: "50px",
                }}
            >
                {loading ? (
                    <CircularProgress
                        sx={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                ) : (
                        <>
                        <Line
                                data={{
                                    labels: historicData.map((coin) => {
                                        let date = new Date(coin[0]);
                                        let time =
                                            date.getHours() > 12
                                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                                : `${date.getHours()}:${date.getMinutes()} AM`;

                                        return days === 1 ? time : date.toLocaleDateString();
                                    }),

                                    datasets: [
                                        {
                                            data: historicData.map((coin) => coin[1]),
                                            label: `Price ( Past ${days} Days ) in ${currency}`,
                                            borderColor: "#EEBC1D",
                                        },
                                    ],
                                }}
                                options={{
                                    elements: {
                                        point: {
                                            radius: 1,
                                        },
                                    },
                                }}
                                />
                            <div
                                style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                            >
                                {chartDays.map(day => (
                                    <SelectButton
                                        key={day.value}
                                        onClick={() => setDays(day.value)}
                                        selected={day.value === days}
                                    >
                                        {day.label}
                                    </SelectButton>
                                ))}
                            </div>
                    </>
                )}
            </Container>
        </ThemeProvider>
    );
};

export default CoinInfo;