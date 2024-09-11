import { createTheme } from '@mui/material/styles';

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ffa000',
    },
    secondary: {
      main: '#e65100',
    },
    background: {
      default: '#f5f5f5',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#424242',
      secondary: '#424242',
      disabled: '#9e9e9e',
    },
    divider: '#424242',
    warning: {
      main: '#fdd835',
    },
    info: {
      main: '#40c4ff',
    },
    success: {
      main: '#7cb342',
    },
  },
	components: {
		MuiAppBar: {
      styleOverrides: {
				root: {
					backgroundColor: 'background',
					color: '#424242',
				}
      },
    },
		MuiLink: {
      styleOverrides: {
				root: {
					color: '#424242',
				}
      },
    },
	},
  // overrides: {
  //   MuiAppBar: {
  //     colorInherit: {
  //       // backgroundColor: 'transparent',
  //       // color: '#ffffff',
  //     },
  //   },
  // },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  },
};

export default createTheme(themeOptions);