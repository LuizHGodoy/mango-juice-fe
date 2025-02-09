import type { Message } from "@/types";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

interface ChatSectionProps {
  messages: Message[];
  currentUser: string;
  newMessage: string;
  onNewMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}

export const ChatSection = ({
  messages,
  currentUser,
  newMessage,
  onNewMessageChange,
  onSendMessage,
  onKeyPress,
}: ChatSectionProps) => {
  const chatMessages = messages.filter(
    (msg) =>
      msg.content?.trim() &&
      msg.type !== "system" &&
      msg.senderName &&
      new Date(msg.timestamp).toString() !== "Invalid Date"
  );

  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return "";
    }
  };

  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 2 },
        display: "flex",
        flexDirection: "column",
        height: { xs: 300, sm: 390 },
        minHeight: 300,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Chat
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          mb: 2,
          display: "flex",
          flexDirection: "column-reverse",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            width: "100%",
          }}
        >
          {chatMessages.length > 0 ? (
            chatMessages.map((msg) => (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignSelf:
                    msg.senderName === currentUser ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    ml: msg.senderName === currentUser ? "auto" : 1,
                    mr: msg.senderName === currentUser ? 1 : "auto",
                  }}
                >
                  {msg.senderName === currentUser ? "eu" : msg.senderName}
                </Typography>
                <Paper
                  sx={{
                    p: 1,
                    bgcolor:
                      msg.senderName === currentUser ? "#1976d2" : "#f5f5f5",
                    color: msg.senderName === currentUser ? "#fff" : "#000",
                    borderRadius: 2,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: "pre-wrap",
                      color: "inherit",
                    }}
                  >
                    {msg.content}
                  </Typography>
                </Paper>
                {msg.timestamp && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      ml: msg.senderName === currentUser ? "auto" : 1,
                      mr: msg.senderName === currentUser ? 1 : "auto",
                      fontSize: "0.7rem",
                    }}
                  >
                    {formatTimestamp(msg.timestamp)}
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                py: 2,
              }}
            >
              Nenhuma mensagem ainda. Seja o primeiro a enviar!
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={(e) => onNewMessageChange(e.target.value)}
          onKeyDown={onKeyPress}
          multiline
          maxRows={3}
        />
        <Button
          variant="contained"
          onClick={onSendMessage}
          disabled={!newMessage.trim()}
          sx={{
            minWidth: "fit-content",
            whiteSpace: "nowrap",
            bgcolor: "#000000",
            color: "#FFD700",
            borderColor: "#FFD700",
            "&:hover": {
              bgcolor: "#1a1a1a",
            },
            "&:disabled": {
              bgcolor: "#333333",
              color: "#888888",
            },
          }}
        >
          Enviar
        </Button>
      </Box>
    </Paper>
  );
};
