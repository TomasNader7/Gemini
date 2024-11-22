import React from 'react';
import { Modal, Backdrop, Fade, Box, Button } from '@mui/material';

export default function AuthModal() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained"
                style={{
                    width: 85,
                    height: 40,
                    backgroundColor: "#EEBC1D",
                }}
                onClick={handleOpen}
            >
                Login
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh',
                            '& > .paper': {
                                backgroundColor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 5,
                                padding: (theme) => theme.spacing(2, 4, 3),
                            },
                        }}
                    >
                        <Box className="paper">
                            <h2 id="transition-modal-title">Transition modal</h2>
                            <p id="transition-modal-description">
                                react-transition-group animates me.
                            </p>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
