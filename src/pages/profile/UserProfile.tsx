import React, {useEffect, useState} from "react";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {getCurrentUser, logoutUser, onAuthChange} from "../../services/authService";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "../../components/SnackbarContext";

const UserProfilePage = () => {

  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const {showMessage} = useSnackbar();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      console.log('User', currentUser);
      setUser(currentUser);
    } else {
      const unsubscribe = onAuthChange((user) => {
        if (user) {
          console.log('Unsubscribe', user);
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
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