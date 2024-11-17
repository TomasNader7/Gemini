import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Carousel from './Carousel';

const Banner = () => {
    return (
        <Box
            sx={{
                backgroundImage: "url(./banner2.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "400px",
            }}
        >
            <Container
                sx={{
                    height: 400,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    paddingTop: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "40%",
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                            marginBottom: 2,
                            fontFamily: "Montserrat, sans-serif",
                        }}
                    >
                        Gemini
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat, sans-serif",
                        }}
                    >
                        Get All The Info Regarding Your Favorite Crypto Currency
                    </Typography>
                </Box>
                <Carousel />
            </Container>
        </Box>
    );
};

export default Banner;

//const useStyles = makeStyles(() => ({
//    banner: {
//        backgroundImage: "url(./banner2.jpg)",
//    },
//    bannerContent: {
//        height: 400,
//        display: "flex",
//        flexDirection: "column",
//        paddingTop: 25,
//        justifyContent: "space-around",
//    },
//    tagline: {
//        display: "flex",
//        height: "40%",
//        flexDirection: "column",
//        justifyContent: "center",
//        textAlign: "center",
//    },
//}))
//const Banner = () => {

//    const classes = useStyles();

//    return (
//        <div className={classes.banner}>
//            <Container className={classes.bannerContent}>
//                <div className={classes.tagline}>
//                    <Typography
//                        varaint="h2",
//                    style={{
//                        fontWeight: "bold",
//                        marginBottom: 15,
//                        fontFamily: "Montserrat",
//                    }}
//                    >
//                    Gemini
//                </Typography>
//                <Typography
//                    varaint="subtitle2",
//                style={{
//                    color: "darkgrey",
//                    textTransform: "Capitalize",
//                    fontFamily: "Montserrat",
//                }}
//                >
//                Get All The Info Regarding Your Favorite Crypto Currency
//            </Typography>
//        </div>
//        <Carousel />


//            </Container>
//        </div >
//    );
//};

//export default Banner;