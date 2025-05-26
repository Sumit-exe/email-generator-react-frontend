import { CircularProgress, Select, Box, Container, FormControl, InputLabel, MenuItem, TextField, Typography, Button, Paper } from '@mui/material';
import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState(' ');
  const [tone, setTone] = useState(' ');
  const [generateReply, setGeneratedReply] = useState(' ');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(' ');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        emailContent,
        tone
      })
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Typography variant='h4' gutterBottom align='center' sx={{ fontWeight: 'bold' }}>
          Email Reply Generator
        </Typography>

        <Box>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant='outlined'
            label='Original email content'
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="tone-label">Tone (optional)</InputLabel>
            <Select
              labelId="tone-label"
              value={tone}
              label="Tone (optional)"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
            sx={{ fontWeight: 'bold', py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : "Generate Reply"}
          </Button>
        </Box>

        {error && (
          <Typography color='error' sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {generateReply && (
          <Box sx={{ mt: 4 }}>
            <Typography variant='h6' gutterBottom>
              Generated Reply
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={15}
              variant="outlined"
              value={generateReply}
              inputProps={{ readOnly: true }}
              sx={{ backgroundColor: '#f1f8e9' }}
            />
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigator.clipboard.writeText(generateReply)}
            >
              Copy to Clipboard
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App;
