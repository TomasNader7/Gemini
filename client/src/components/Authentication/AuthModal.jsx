import React from 'react';
import { Modal, Backdrop, Fade, Box, Button, Tab, AppBar, Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';


export default function AuthModal() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
   
    return (
        <div>
            <Button variant="contained"
                sx={{
                    width: 85,
                    height: 40,
                    marginLeft: 2,
                    backgroundColor: "#EEBC1D",
                    "&:hover": {
                        backgroundColor: "#D4A017",
                    },
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
                BackdropProps={{
                    timeout: 500,
                }}
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
                        <AppBar position="static"
                            style={{
                                backgroundColor: "transparent", color: "white", borderRadius: 2,
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
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
