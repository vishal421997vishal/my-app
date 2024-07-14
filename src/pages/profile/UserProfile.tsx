import React, {useEffect, useState} from "react";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {getCurrentUser, logoutUser, logUserLocation, onAuthChange} from "../../services/authService";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../../components/SnackbarContext";

const UserProfilePage = () => {

  const [user, setUser] = useState<any>(null);
  const [locationInterval, setLocationInterval] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const {showMessage} = useSnackbar();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      const interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            logUserLocation(currentUser.uid, {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            showMessage(`Error getting location: ${error}`, 'error')
          });
      }, 5000);
      setLocationInterval(interval);
    } else {
      const unsubscribe = onAuthChange((user) => {
        if (user) {
          setUser(user);
        } else {
          navigate('/');
        }
      });
      return () => unsubscribe();
    }
  }, [navigate]);


  const logout = () => {
    logoutUser().then(r => {
      showMessage('Logout successfully', 'success');
      navigate('/');
    });
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            {user?.email}
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>

    </Box>
  )
}

export default UserProfilePage;