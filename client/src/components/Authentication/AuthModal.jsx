import React from 'react';
import { Modal, Backdrop, Fade, Box, Button, Tab, AppBar, Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase';
import { CryptoState } from '../../CryptoContext';

export default function AuthModal() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { setAlert } = CryptoState();
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        console.log("Google Sign-In clicked");
        signInWithPopup(auth, googleProvider).catch((error) => {
            if (error.code === 'auth/popup-blocked') {
                console.error("Popup blocked. Try again after enabling popups.");
                setAlert({
                    open: true,
                    message: "Popup blocked. Please enable popups and try again.",
                    type: "error",
                });
            } else {
                console.error(error.message);
                setAlert({
                    open: true,
                    message: error.message,
                    type: "error",
                });
            }
        });

    };

    return (
        <div>
            <Button
                variant="contained"
                sx={{
                    width: 85,
                    height: 40,
                    marginLeft: 2,
                    backgroundColor: "#EEBC1D",
                    "&:hover": { backgroundColor: "#D4A017" },
                }}
                onClick={handleOpen}
            >
                Login
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 400,
                            backgroundColor: "#3b3b3b",
                            color: "white",
                            borderRadius: 2,
                            margin: "auto",
                            padding: 3,
                            gap: 2,
                            boxShadow: 24,
                        }}
                    >
                        <AppBar
                            position="static"
                            style={{
                                backgroundColor: "transparent",
                                color: "white",
                                borderRadius: 2,
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                style={{ borderRadius: 2 }}
                            >
                                <Tab label="Login" />
                                <Tab label="Sign Up" />
                            </Tabs>
                        </AppBar>

                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <Signup handleClose={handleClose} />}
                        <Box
                            sx={{
                                padding: 5,
                                paddingTop: 0,
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                                alignItems: "center",
                                gap: 3,
                                fontSize: 20,
                            }}
                        >
                            <span>OR</span>
                            <GoogleButton
                                style={{ width: "150%", outline: "none", zIndex: 1 }}
                                onClick={signInWithGoogle}
                            />
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
