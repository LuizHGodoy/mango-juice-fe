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
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Planning Poker
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Seu Nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Entrar em uma Sala
            </Typography>
            <TextField
              fullWidth
              label="ID da Sala"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleJoinRoom}
              disabled={!username || !roomId}
            >
              Entrar na Sala
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>ou</Divider>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Criar Nova Sala
            </Typography>
            <TextField
              fullWidth
              label="Nome da Sala"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleCreateRoom}
              disabled={!username || !newRoomName}
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
