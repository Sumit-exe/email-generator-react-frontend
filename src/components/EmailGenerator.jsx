import {
  CircularProgress,
  Box,
  Container,
  FormControl,
  TextField,
  Typography,
  Button,
  Paper,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import GeneratedReply from "./GeneratedReply";

function EmailGenerator() {
  const [subject, setSubject] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState(" ");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
     if (!context) {
      setError("Email context cannot be empty !!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(import.meta.env.VITE_EMAIL_API_URL + "/generate", {
        subject,
        context,
        tone,
      });
      setGeneratedEmail(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (err) {
      setError("Failed to generate email. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold" }}
        >
          New Email Generator
        </Typography>

        <Box>
          <TextField
            fullWidth
            variant="outlined"
            label="Subject (Optional)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
            
            <InputLabel id="tone-label">Tone (optional)</InputLabel>
            <Select
              labelId="tone-label"
              value={tone}
              label="Tone (optional)"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={loading}
            fullWidth
            sx={{ fontWeight: "bold", py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : "Generate Email"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {generatedEmail && <GeneratedReply replyText={generatedEmail} />}
      </Paper>
    </Container>
  );
}

export default EmailGenerator;
