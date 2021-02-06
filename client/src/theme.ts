import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
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

theme.typography.h3 = {
  fontFamily: 'Roboto, Helvetica',
  fontSize: '2.6rem',
  [theme.breakpoints.down('lg')]: {
    fontSize: '2.2rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.6rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.4rem',
  },
};

export default theme;
