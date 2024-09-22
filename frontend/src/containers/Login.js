import React, { useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Snackbar,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showError, setShowError] = useState(false);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setShowError(true);
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                Sign In
              </Typography>
              <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={onChange}
                  variant="outlined"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChange}
                  inputProps={{ minLength: 6 }}
                  variant="outlined"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Link component={RouterLink} to="/reset_password" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to="/signup" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </motion.div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={showError}
          autoHideDuration={6000}
          onClose={() => setShowError(false)}
          message="Your email or password is incorrect."
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setShowError(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Container>
      
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);