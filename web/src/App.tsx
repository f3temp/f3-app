import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from './theme/ThemeProvider';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { useRoutes } from 'react-router-dom';
import router from './router';

const App = () => {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
