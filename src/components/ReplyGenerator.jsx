import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import GeneratedReply from "./GeneratedReply";

function ReplyGenerator() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState(" ");
  const [generateReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(" ");
  const handleSubmit = async () => {
    if (!emailContent) {
      setError("Email content cannot be empty !!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(import.meta.env.VITE_EMAIL_API_URL + "/reply", {
        emailContent,
        tone,
      });
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("Failed to generate email reply. Please try again.");
      console.error(error);
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
          Email Reply Generator
        </Typography>

        <Box>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original email content"
            value={emailContent}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setEmailContent(e.target.value)}
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

          <Button
            variant="contained" 
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
            sx={{ fontWeight: "bold", py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} /> : "Generate Reply"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {generateReply && <GeneratedReply replyText={generateReply} />}
      </Paper>
    </Container>
  );
}

export default ReplyGenerator;
