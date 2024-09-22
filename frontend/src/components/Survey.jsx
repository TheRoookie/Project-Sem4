import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  FormControlLabel, 
  Checkbox, 
  Radio, 
  RadioGroup, 
  CircularProgress, 
  Box,
  InputLabel,
  Rating
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

const SurveyApp = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/dashboard/tasks/');
      const parsedData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      
      if (Array.isArray(parsedData)) {
        setTasks(parsedData.map(task => ({
          pk: task.pk,
          fields: {
            title: task.fields.title,
            description: task.fields.description,
            reward_amount: task.fields.reward_amount,
            deadline: task.fields.deadline,
            questions: task.fields.questions || []
          }
        })));
      } else {
        throw new Error('Invalid data format received from the server');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setResponses({});
  };

  const handleResponseChange = (questionId, value, type) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: { value, type }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:8000/dashboard/submit-survey/', {
        task_id: selectedTask.pk,
        responses: Object.entries(responses).map(([questionId, { value, type }]) => ({
          question_id: questionId,
          answer_text: type === 'text' ? value : null,
          rating: type === 'rating' ? value : null,
          selected_options: type === 'multiple_choice' || type === 'checkbox' ? value : [],
        })),
      });
      alert('Survey submitted successfully!');
      setSelectedTask(null);
      setResponses({});
    } catch (error) {
      console.error('Error submitting survey:', error);
      setError('Failed to submit survey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const visibleTasks = showAll ? tasks : tasks.slice(0, 3);

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Survey Tasks
      </Typography>
      {!selectedTask ? (
        <>
          <Grid container spacing={3}>
            {visibleTasks.length > 0 ? (
              visibleTasks.map(task => (
                <Grid item xs={12} sm={6} md={4} key={task.pk}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {task.fields.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {task.fields.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Reward: ₹{task.fields.reward_amount}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Deadline: {new Date(task.fields.deadline).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        color="primary" 
                        onClick={() => handleTaskSelect(task)}
                        endIcon={<ArrowForwardIcon />}
                      >
                        Take Survey
                      </Button>
                    </CardActions>
                  </StyledCard>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography align="center">No tasks available.</Typography>
              </Grid>
            )}
          </Grid>
          {tasks.length > 3 && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="outlined" 
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Show Less' : 'Show All'}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {selectedTask.fields.title}
          </Typography>
          {selectedTask.fields.questions && selectedTask.fields.questions.map(question => (
            <Box key={question.id} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                {question.question_text}
              </Typography>
              {question.question_type === 'text' && (
                <TextField
                  fullWidth
                  variant="outlined"
                  onChange={(e) => handleResponseChange(question.id, e.target.value, 'text')}
                  required={question.required}
                />
              )}
              {question.question_type === 'multiple_choice' && (
                <FormControl fullWidth variant="outlined">
                  <InputLabel id={`question-${question.id}-label`}>Select an option</InputLabel>
                  <Select
                    labelId={`question-${question.id}-label`}
                    value={responses[question.id]?.value || ''}
                    onChange={(e) => handleResponseChange(question.id, e.target.value, 'multiple_choice')}
                    label="Select an option"
                    required={question.required}
                  >
                    {question.options && question.options.map(option => (
                      <MenuItem key={option.id} value={option.id}>{option.option_text}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {question.question_type === 'checkbox' && (
                <FormControl component="fieldset">
                  {question.options && question.options.map(option => (
                    <FormControlLabel
                      key={option.id}
                      control={
                        <Checkbox
                          onChange={(e) => {
                            const currentValue = responses[question.id]?.value || [];
                            const newValue = e.target.checked
                              ? [...currentValue, option.id]
                              : currentValue.filter(id => id !== option.id);
                            handleResponseChange(question.id, newValue, 'checkbox');
                          }}
                        />
                      }
                      label={option.option_text}
                    />
                  ))}
                </FormControl>
              )}
              {question.question_type === 'rating' && (
                <Rating
                  name={`question-${question.id}`}
                  onChange={(event, newValue) => {
                    handleResponseChange(question.id, newValue, 'rating');
                  }}
                />
              )}
            </Box>
          ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Survey
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default SurveyApp;