import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: "#49BC88",
    },
    secondary: {
      main: "#011000",
    },
  },
  typography: {
    fontFamily: [
      '"Marcellus"',
      '"Marcellus SC"',
    
    ].join(','),
  },
  
})

theme = responsiveFontSizes(theme)

export default theme