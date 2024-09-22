import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import { 
  Container, 
  Grid, 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Button, 
  LinearProgress, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField,
  Snackbar,
  CircularProgress,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const Dashboard = ({ isAuthenticated, id }) => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalError, setWithdrawalError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const fetchEarnings = async () => {
    try {
      const access = localStorage.getItem('access');
      if (!access) {
        throw new Error('No access token found');
      }
      const response = await axios.post(`http://localhost:8000/dashboard/earnings/`, {
        userid: id
      }, {
        headers: {
          Authorization: `JWT ${access}`
        }
      });
      setEarnings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching earnings data:', error);
      setError("Failed to fetch earnings");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchEarnings();
    }
  }, [id, isAuthenticated]);

  const handleWithdraw = () => {
    if (earnings && earnings.total_earned >= 60) {
      setShowModal(true);
    }
  };

  const handleWithdrawalSubmit = async () => {
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0 || amount > earnings.total_earned) {
      setWithdrawalError('Invalid withdrawal amount');
      return;
    }

    try {
      const access = localStorage.getItem('access');
      if (!access) {
        throw new Error('No access token found');
      }
      const response = await axios.post(`http://localhost:8000/dashboard/withdraw/`, {
        userid: id,
        amount: amount
      }, {
        headers: {
          Authorization: `JWT ${access}`
        }
      });

      setEarnings(response.data);
      setShowModal(false);
      setWithdrawalAmount('');
      setWithdrawalError('');
      setSnackbar({ open: true, message: 'Withdrawal successful!' });
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      setWithdrawalError('Failed to process withdrawal');
    }
  };

  const progressPercentage = earnings ? (earnings.total_earned / 60) * 100 : 0;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardHeader
              title="Your Earnings"
              avatar={<MonetizationOnIcon color="primary" />}
            />
            <CardContent>
              <Typography variant="h4" component="div" gutterBottom>
                ₹{earnings && !isNaN(earnings.total_earned) 
                  ? parseFloat(earnings.total_earned).toFixed(2) 
                  : '0.00'}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                You've reached {progressPercentage.toFixed(2)}% of payment threshold (₹60)
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={progressPercentage} 
                sx={{ my: 2 }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                disabled={!earnings || earnings.total_earned < 60}
                onClick={handleWithdraw}
              >
                Withdraw
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>

        
      </Grid>

      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Withdraw Earnings</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Withdrawal Amount (INR)"
            type="number"
            fullWidth
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
            inputProps={{ min: 0, max: earnings ? earnings.total_earned : 0, step: 0.01 }}
            error={!!withdrawalError}
            helperText={withdrawalError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleWithdrawalSubmit} color="primary">
            Confirm Withdrawal
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </Container>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth?.isAuthenticated || false,
  id: state.auth.user?.id || null,
});

export default connect(mapStateToProps)(Dashboard);