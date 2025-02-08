import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import io, { type Socket } from "socket.io-client";
import { SOCKET_URL } from "../config";

interface Vote {
  [participant: string]: string;
}

interface RoomState {
  participants: string[];
  votes: Vote;
  revealed: boolean;
  currentTask: string | null;
  name: string;
}

const CARD_VALUES = ["0", "1", "2", "3", "5", "8", "13", "21", "?"];

const PlanningRoom: React.FC<{
  roomId: string;
  username: string;
  onLeaveRoom: () => void;
}> = ({ roomId, username, onLeaveRoom }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomState, setRoomState] = useState<RoomState>(() => {
    const savedState = localStorage.getItem(`room_${roomId}_state`);
    return savedState
      ? JSON.parse(savedState)
      : {
          participants: [],
          votes: {},
          revealed: false,
          currentTask: null,
          name: "Planning Poker",
        };
  });
  const [newTask, setNewTask] = useState("");
  const [selectedCard, setSelectedCard] = useState<string | null>(() => {
    const savedVote = localStorage.getItem(`room_${roomId}_vote`);
    return savedVote || null;
  });
  const [messages, setMessages] = useState<
    Array<{ text: string; timestamp: number }>
  >([]);
  const [localRevealed, setLocalRevealed] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on("connect", () => {
      console.log("Conectado ao servidor");
      newSocket.emit("join_room", { roomId, username });
    });

    newSocket.on("connect_error", () => {
      console.error("Erro de conexão com o servidor");
      onLeaveRoom();
    });

    newSocket.on("room_state", (state: RoomState) => {
      setRoomState(state);
    });

    newSocket.on("message", (message: string) => {
      setMessages((prev) => [
        ...prev,
        { text: message, timestamp: Date.now() },
      ]);
    });

    newSocket.on("start_countdown", () => {
      setCountdown(3);
    });

    newSocket.on("error", (error: string) => {
      console.error("Erro:", error);
      alert(error);
      if (error === "Sala não encontrada") {
        onLeaveRoom();
      }
    });

    newSocket.on("votes_reset", () => {
      setSelectedCard(null);
      setLocalRevealed(false);
      setShowAnimation(false);
      localStorage.removeItem(`room_${roomId}_vote`);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [roomId, username, onLeaveRoom]);

  useEffect(() => {
    localStorage.setItem(`room_${roomId}_state`, JSON.stringify(roomState));
  }, [roomState, roomId]);

  useEffect(() => {
    if (selectedCard) {
      localStorage.setItem(`room_${roomId}_vote`, selectedCard);
    } else {
      localStorage.removeItem(`room_${roomId}_vote`);
    }
  }, [selectedCard, roomId]);

  const handleVote = (value: string) => {
    if (roomState.revealed) return;

    setSelectedCard(value);
    socket?.emit("vote", { value });
  };

  const handleNewTask = () => {
    if (newTask.trim()) {
      socket?.emit("new_task", { task: newTask });
      setNewTask("");
      setSelectedCard(null);
      setLocalRevealed(false);
      setShowAnimation(false);
      localStorage.removeItem(`room_${roomId}_vote`);
    }
  };

  const handleReveal = () => {
    socket?.emit("start_reveal");
  };

  const handleReset = () => {
    socket?.emit("reset");
    setSelectedCard(null);
    setLocalRevealed(false);
    setShowAnimation(false);
    localStorage.removeItem(`room_${roomId}_vote`);
  };

  const handleLeaveRoom = () => {
    localStorage.removeItem(`room_${roomId}_state`);
    localStorage.removeItem(`room_${roomId}_vote`);
    onLeaveRoom();
  };

  const calculateAverage = () => {
    if (!roomState.revealed) return null;
    const validVotes = Object.values(roomState.votes).filter((v) => v !== "?");
    if (validVotes.length === 0) return 0;
    return (
      validVotes.reduce((sum, curr) => sum + Number(curr), 0) /
      validVotes.length
    );
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    setShowAnimation(true);
    setLocalRevealed(true);
    setCountdown(null);
  }, [countdown]);

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <Typography variant="h4" gutterBottom>
              {roomState.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle1" color="text.secondary">
                ID da Sala: {roomId}
              </Typography>
              <Tooltip title={copied ? "Copiado!" : "Copiar ID da Sala"}>
                <IconButton onClick={handleCopyRoomId} size="small">
                  {copied ? <DoneIcon color="success" /> : <ContentCopyIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </div>
          <Button variant="outlined" color="error" onClick={handleLeaveRoom}>
            Sair da Sala
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tarefa Atual:{" "}
              {roomState.currentTask || "Nenhuma tarefa selecionada"}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Nova Tarefa"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Button variant="contained" onClick={handleNewTask}>
                Adicionar Tarefa
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Participantes
            </Typography>
            {roomState.participants.map((participant) => (
              <Typography key={participant}>
                {participant} {roomState.votes[participant] ? "(Votou)" : ""}
              </Typography>
            ))}
          </Paper>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Mensagens
            </Typography>
            <Box sx={{ maxHeight: 200, overflow: "auto" }}>
              {messages.map((msg) => (
                <Typography key={msg.timestamp} variant="body2">
                  {msg.text}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Suas Cartas
            </Typography>
            <Grid container spacing={1}>
              {CARD_VALUES.map((value) => (
                <Grid item key={value}>
                  <Card
                    sx={{
                      width: 80,
                      height: 120,
                      cursor: roomState.revealed ? "default" : "pointer",
                      bgcolor:
                        selectedCard === value
                          ? "primary.light"
                          : "background.paper",
                      opacity: roomState.revealed ? 0.6 : 1,
                    }}
                    onClick={() => handleVote(value)}
                  >
                    <CardContent>
                      <Typography variant="h4" align="center">
                        {value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Resultados
            </Typography>
            {countdown !== null && (
              <Fade in={true}>
                <Typography variant="h2" align="center" sx={{ my: 3 }}>
                  {countdown}
                </Typography>
              </Fade>
            )}
            {roomState.revealed && localRevealed && (
              <Zoom in={showAnimation} timeout={500}>
                <div>
                  <Grid container spacing={2}>
                    {Object.entries(roomState.votes).map(
                      ([participant, vote]) => (
                        <Grid item key={participant}>
                          <Card
                            sx={{
                              width: 80,
                              height: 120,
                              transform: showAnimation
                                ? "rotateY(0deg)"
                                : "rotateY(180deg)",
                              transition: "transform 0.6s",
                            }}
                          >
                            <CardContent>
                              <Typography variant="body2">
                                {participant}
                              </Typography>
                              <Typography variant="h4" align="center">
                                {vote}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      )
                    )}
                  </Grid>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Média: {calculateAverage()?.toFixed(1)}
                  </Typography>
                </div>
              </Zoom>
            )}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleReveal}
                disabled={roomState.revealed && localRevealed}
                sx={{ mr: 1 }}
              >
                Revelar Votos
              </Button>
              <Button variant="outlined" onClick={handleReset}>
                Reiniciar Votação
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlanningRoom;
