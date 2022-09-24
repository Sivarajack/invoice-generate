import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { gapi } from "gapi-script";
import * as React from "react";
import jwt from "jwt-decode";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Form from "./Form";
import Login from "./Login";
import axios from "./axios";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2d767f",
      },
      secondary: {
        main: "#ff5959",
      },
    },
  });

  React.useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId:
          "974366590750-nnfji4ash7bpagdvrccbul5q1g7mdqh1.apps.googleusercontent.com",
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const ProtectedRoute = ({ redirectPath = "/login" }) => {
    let decoded;
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to={redirectPath} replace />;
    }
    try {
      decoded = jwt(token);
    } catch (e) {
      console.log(e);
      localStorage.clear();
      return <Navigate to={redirectPath} replace />;
    }
    if (!decoded || decoded.exp < new Date().getTime() / 1000) {
      localStorage.removeItem("token");
      return <Navigate to={redirectPath} replace />;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return <Outlet />;
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh" }}>
        <header className="App-header">Safety and Safety</header>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="invoice" element={<Form />} />
            </Route>

            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
