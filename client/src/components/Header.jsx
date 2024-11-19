import React from 'react';
import { AppBar, Toolbar, Typography, Container, Select, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        mode: "dark",
    },
});

const Header = () => {
    const homepage = useNavigate();

    const { currency, setCurrency } = CryptoState();

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container maxWidth="xl">
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography
                            onClick={() => homepage('/')}
                            variant="h6"
                            sx={{
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: "bold",
                                color: "gold",
                                cursor: "pointer",
                                flexShrink: 0,
                            }}
                        >
                            Gemini
                        </Typography>
                        <Select
                            variant="outlined"
                            style={{
                                width: 100,
                                height: 40,
                                marginLeft: 15,
                                right: "-60px",
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="ARS">ARS</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;
