import { Typography } from "@mui/material";

interface CustomTypographyProps {
  text: string;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  sx?: object; 
}

const CustomTypography: React.FC<CustomTypographyProps> = ({
  text,
  variant = "h6",
  sx = {},
}) => {
  return (
    <Typography variant={variant} sx={{ paddingTop: "x", ...sx }}>
      {text}
    </Typography>
  );
};

export default CustomTypography;
