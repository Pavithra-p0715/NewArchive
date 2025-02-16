import { AppBar, Box } from "@mui/material";
import Header from "./common/components/Header";
import menuItems from "@/app/path.json";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <AppBar position="static" sx={{ backgroundColor: "#568D94" }}>
            <Header title="Keep Notes" menuItems={menuItems} />
          </AppBar>
          <Box sx={{ backgroundColor: "#F4F2DE", minHeight: "100vh" }}>
            {children}
          </Box>
        </body>
      </html>
    </>
  );
}
