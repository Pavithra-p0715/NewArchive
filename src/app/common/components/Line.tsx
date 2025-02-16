import { Divider } from "@mui/material";

interface LineProps {
  sx?: object;
}

const Line: React.FC<LineProps> = ({ sx = {} }) => {
  return <Divider sx={{ borderColor: "#8B4513", borderWidth: "2px", ...sx }} />;
};

export default Line;
