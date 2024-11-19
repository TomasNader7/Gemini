import { Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
    return (
        <Box
            onClick={onClick}
            sx={{
                border: "1px solid gold",
                borderRadius: 5,
                padding: "10px 20px",
                fontFamily: "Montserrat",
                cursor: "pointer",
                backgroundColor: selected ? "gold" : "transparent",
                color: selected ? "black" : "inherit",
                fontWeight: selected ? 700 : 500,
                textAlign: "center",
                "&:hover": {
                    backgroundColor: "gold",
                    color: "black",
                },
                width: "22%",
            }}
        >
            {children}
        </Box>
    );
};

export default SelectButton;
