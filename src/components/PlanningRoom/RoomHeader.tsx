import CasinoIcon from "@mui/icons-material/Casino";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface RoomHeaderProps {
  roomName: string;
  roomId: string;
  onLeaveRoom: () => void;
}

export const RoomHeader = ({
  roomName,
  roomId,
  onLeaveRoom,
}: RoomHeaderProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3 },
        mb: 2,
        background: "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)",
        border: "1px solid #333333",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #FFD700, transparent)",
          opacity: 0.5,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CasinoIcon sx={{ color: "#FFD700", fontSize: "2rem" }} />
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: "#FFD700",
                fontWeight: "bold",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {roomName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 0.5,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#888888",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                ID da Sala:{" "}
                <span
                  style={{
                    fontFamily: "monospace",
                    background: "rgba(255, 215, 0, 0.1)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 215, 0, 0.2)",
                  }}
                >
                  {roomId}
                </span>
              </Typography>
              <Tooltip
                title={copied ? "Copiado!" : "Copiar ID da Sala"}
                arrow
                placement="top"
              >
                <IconButton
                  onClick={handleCopyRoomId}
                  size="small"
                  sx={{
                    color: copied ? "#4caf50" : "#FFD700",
                    "&:hover": {
                      bgcolor: "rgba(255, 215, 0, 0.1)",
                    },
                  }}
                >
                  {copied ? (
                    <DoneIcon fontSize="small" />
                  ) : (
                    <ContentCopyIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Button
          variant="outlined"
          onClick={onLeaveRoom}
          startIcon={<LogoutIcon />}
          sx={{
            color: "#FFD700",
            borderColor: "#FFD700",
            "&:hover": {
              borderColor: "#FFD700",
              bgcolor: "rgba(255, 215, 0, 0.1)",
            },
          }}
        >
          Sair da Sala
        </Button>
      </Box>
    </Paper>
  );
};
