import React from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import HeaderBar from './components/ui/HeaderBar';
import SideBar from './components/ui/SideBar';
import SnackbarSuccess from './components/ui/SnackbarSuccess';
import TagCreateModal from './components/tags/TagCreateModal';
import TagDeleteModal from './components/tags/TagDeleteModal';

import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import StudentDetailsPage from './pages/StudentDetailsPage';
import CoursesPage from './pages/CoursesPage';
import OrganizationsPage from './pages/OrganizationsPage';

const drawerWidth = 280;

function App(props) {

  const darkModeEnabled = useSelector(state => state.dashboard.darkMode)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkModeEnabled? 'dark': 'light',
        },
      }),
    [darkModeEnabled],
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box className="App" sx={{ display: 'flex' }}>
          <CssBaseline />
          <HeaderBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
          <SideBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} container={container} />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/student/:id" element={<StudentDetailsPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/organizations" element={<OrganizationsPage />} />
            </Routes>
          </Box>

        </Box>
        <SnackbarSuccess />
        <TagCreateModal />
        <TagDeleteModal />
      </ThemeProvider>
    </Router>
  );
}

export default App;
