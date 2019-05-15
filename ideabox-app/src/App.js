import React, { Component } from "react";
import Routes from "./routes";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#40aaaa",
      contrastText: "#ffffff"
    },
    primary: {
      main: "#00646e",
      contrastText: "#ffffff"
    }
  },
  // MuiToolbar: {
  //   background: "#ffffff"
  // },
  // MuiAppBar: {
  //   backgroundColor: "#ffffff",
  //   color: "#00646e"
  // }

  typography: {
    useNextVariants: true,
    fontFamily: ['"Arial"', "sans-serif"]
  }
});

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
