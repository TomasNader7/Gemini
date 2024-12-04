import React from "react";
import { Avatar, Drawer, Button, Box } from '@mui/material';
import { CryptoState } from "../../CryptoContext";
import { signOut } from "firebase/auth";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Carousel";

export default function UserSidebar() {
    const [state, setState] = React.useState({
        right: false,
    });
    const { user, setAlert, watchlist, coins, symbol } = CryptoState();

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successful!",
        });

        toggleDrawer();
    };

    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(
                coinRef,
                { coins: watchlist.filter((watch) => watch !== coin?.id) },
                { merge: true }
            );

            setAlert({
                open: true,
                message: `${coin.name} Removed from the Watchlist!`,
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

    return (
        <div>
            {["right"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            marginLeft: 15,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D",
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <Box
                            sx={{
                                width: 350,
                                padding: 2,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                fontFamily: "monospace",
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "20px",
                                    height: "92%",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 200,
                                        height: 200,
                                        cursor: "pointer",
                                        backgroundColor: "#EEBC1D",
                                        objectFit: "contain",
                                    }}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <Box
                                    sx={{
                                        flex: 1,
                                        backgroundColor: "grey",
                                        borderRadius: 5,
                                        padding: 10,
                                        paddingTop: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 2,
                                        overflowY: "scroll",
                                    }}
                                >
                                    <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                        Watchlist
                                    </span>
                                    {coins.map((coin) => {
                                        if (watchlist.includes(coin.id))
                                            return (
                                                <Box
                                                    key={coin.id}
                                                    sx={{
                                                        padding: 1.1,
                                                        borderRadius: 5,
                                                        color: "black",
                                                        width: "180%",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        backgroundColor: "#EEBC1D",
                                                        boxShadow: "0 0 7px black",
                                                    }}
                                                >
                                                    <span>{coin.name}</span>
                                                    <span style={{ display: "flex", gap: 8 }}>
                                                        {symbol}{" "}
                                                        {numberWithCommas(coin.current_price.toFixed(2))}
                                                        <AiFillDelete
                                                            style={{ cursor: "pointer" }}
                                                            fontSize="16"
                                                            onClick={() => removeFromWatchlist(coin)}
                                                        />
                                                    </span>
                                                </Box>
                                            );
                                        else return <></>;
                                    })}
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{
                                    height: "8%",
                                    width: "100%",
                                    backgroundColor: "#EEBC1D",
                                    marginTop: 20,
                                }}
                                onClick={logOut}
                            >
                                Log Out
                            </Button>
                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
