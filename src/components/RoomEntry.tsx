import CasinoIcon from "@mui/icons-material/Casino";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import type React from "react";
import { useState } from "react";

interface RoomEntryProps {
  onJoinRoom: (roomId: string, username: string) => void;
  onCreateRoom: (roomName: string, username: string) => void;
}

const RoomEntry: React.FC<RoomEntryProps> = ({ onJoinRoom, onCreateRoom }) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [newRoomName, setNewRoomName] = useState("");

  const handleJoinRoom = () => {
    if (username && roomId) {
      onJoinRoom(roomId, username);
    }
  };

  const handleCreateRoom = () => {
    if (username && newRoomName) {
      onCreateRoom(newRoomName, username);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          background: "#000000",
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
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <CasinoIcon sx={{ color: "#FFD700", fontSize: "3rem", mb: 2 }} />
          <Typography
            variant="h4"
            sx={{
              color: "#FFD700",
              fontWeight: "bold",
              textShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Planning Poker
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Seu Nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "#FFD700",
                "& fieldset": {
                  borderColor: "#333333",
                },
                "&:hover fieldset": {
                  borderColor: "#FFD700",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFD700",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#888888",
                "&.Mui-focused": {
                  color: "#FFD700",
                },
              },
            }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#FFD700",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <MeetingRoomIcon /> Entrar em uma Sala
            </Typography>
            <TextField
              fullWidth
              label="ID da Sala"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  color: "#FFD700",
                  "& fieldset": {
                    borderColor: "#333333",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFD700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FFD700",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#888888",
                  "&.Mui-focused": {
                    color: "#FFD700",
                  },
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleJoinRoom}
              disabled={!username || !roomId}
              sx={{
                bgcolor: "#000000",
                color: "#FFD700",
                border: "1px solid #FFD700",
                "&:hover": {
                  bgcolor: "rgba(255, 215, 0, 0.1)",
                },
                "&:disabled": {
                  bgcolor: "#333333",
                  color: "#888888",
                  borderColor: "#333333",
                },
              }}
            >
              Entrar na Sala
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider
              sx={{
                my: 2,
                "&::before, &::after": {
                  borderColor: "#333333",
                },
                "& .MuiDivider-wrapper": {
                  color: "#888888",
                },
              }}
            >
              ou
            </Divider>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#FFD700",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <GroupAddIcon /> Criar Nova Sala
            </Typography>
            <TextField
              fullWidth
              label="Nome da Sala"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  color: "#FFD700",
                  "& fieldset": {
                    borderColor: "#333333",
                  },
                  "&:hover fieldset": {
                    borderColor: "#FFD700",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#FFD700",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#888888",
                  "&.Mui-focused": {
                    color: "#FFD700",
                  },
                },
              }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleCreateRoom}
              disabled={!username || !newRoomName}
              sx={{
                bgcolor: "#000000",
                color: "#FFD700",
                border: "1px solid #FFD700",
                "&:hover": {
                  bgcolor: "rgba(255, 215, 0, 0.1)",
                },
                "&:disabled": {
                  bgcolor: "#333333",
                  color: "#888888",
                  borderColor: "#333333",
                },
              }}
            >
              Criar Sala
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default RoomEntry;
