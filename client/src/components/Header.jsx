import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

const Header = () => {
    return (
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar>
                    <Typography sx={{ fontFamily: "Montserrat, sans-serif" }}>
                        Gemini
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
};

export default Header;