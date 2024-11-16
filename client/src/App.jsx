import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material"; 
import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import CoinPage from "./pages/CoinPage";

function App() {
    return (
        <BrowserRouter>
            <Box
                sx={{
                    background: "#14161a",
                    color: "white",
                    minHeight: "100vh"
                }}
            >
                <Header />
                <Routes>
                    <Route path="/" element={<Homepage />} exact />
                    <Route path="/coins/:id" element={<CoinPage />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;
