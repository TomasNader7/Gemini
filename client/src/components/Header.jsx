import React from 'react';
import { AppBar, Toolbar, Typography, Container, Select, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const homepage = useNavigate();
    return (
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                        <Typography onClick={() => homepage('/')}
                            sx={{
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: "bold",
                                color: "gold",
                                flex: 1,
                                cursor: "pointer",
                            }}
                        >
                            Gemini
                        </Typography>
                        <Select
                            variant="outlined"
                            style={{
                                width: 100,
                                height: 40
                            }}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"ARS"}>ARS</MenuItem>
                        </Select>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default Header;
