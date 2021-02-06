import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Raleway', 'Helvetica', 'Lato', 'Arial', 'Roboto'].join(','),
  },
  palette: {
    primary: {
      main: 'rgba(0, 0, 0, 0.65)',
      dark: '#F8F8F8',
      contrastText: '#333333',
    },
    secondary: {
      main: '#EB2127',
      dark: '#9D1120',
    },
    info: {
      main: '#757575',
    },
  },
});

export default theme;
