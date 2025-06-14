// components/GeneratedReply.js
import { Box, Button, TextField, Typography } from "@mui/material";

function GeneratedReply({ replyText }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Generated Reply
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={15}
        variant="outlined"
        value={replyText}
        inputProps={{ readOnly: true }}
        sx={{ backgroundColor: "#f1f8e9" }}
        InputLabelProps={{ shrink: true }}
      />
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => navigator.clipboard.writeText(replyText)}
      >
        Copy to Clipboard
      </Button>
    </Box>
  );
}

export default GeneratedReply;
