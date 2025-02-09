import {
  ChatSection,
  ParticipantsList,
  ResultsSection,
  RoomHeader,
  TaskSection,
  VotingSection,
} from "@/components/PlanningRoom/index";
import { SOCKET_URL } from "@/config";
import type { Message, RoomState } from "@/types";
import {
  calculateAverageVote,
  getRandomParticipantColor,
} from "@/utils/calculations";
import { CARD_VALUES, PARTICIPANT_COLORS } from "@/utils/constants";
import {
  loadRoomState,
  loadVote,
  saveRoomState,
  saveVote,
} from "@/utils/storage";
import { Box, Grid } from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import io, { type Socket } from "socket.io-client";

const PlanningRoom: React.FC<{
  roomId: string;
  username: string;
  onLeaveRoom: () => void;
}> = ({ roomId, username, onLeaveRoom }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomState, setRoomState] = useState<RoomState>(() => {
    return (
      loadRoomState(roomId) || {
        participants: [],
        votes: {},
        revealed: false,
        currentTask: null,
        name: "Planning Poker",
      }
    );
  });

  const [selectedCard, setSelectedCard] = useState<string | null>(() =>
    loadVote(roomId)
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [localRevealed, setLocalRevealed] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [participantColors] = useState(() => {
    const colors = [...PARTICIPANT_COLORS];
    return new Map(
      Array(15)
        .fill(null)
        .map(() => [
          Math.random().toString(),
          getRandomParticipantColor(colors),
        ])
    );
  });

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
      if (state.messages) {
        setMessages(state.messages);
      }
      saveRoomState(roomId, state);
    });

    newSocket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
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
      saveVote(roomId, "");
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [roomId, username, onLeaveRoom]);

  useEffect(() => {
    if (selectedCard) {
      saveVote(roomId, selectedCard);
    }
  }, [selectedCard, roomId]);

  const handleVote = (value: string) => {
    if (roomState.revealed) return;
    setSelectedCard(value);
    socket?.emit("vote", { value });
  };

  const handleNewTask = (task: string) => {
    socket?.emit("new_task", { task });
    setSelectedCard(null);
    setLocalRevealed(false);
    setShowAnimation(false);
    saveVote(roomId, "");
  };

  const handleReveal = () => {
    socket?.emit("start_reveal");
  };

  const handleReset = () => {
    socket?.emit("reset");
    setSelectedCard(null);
    setLocalRevealed(false);
    setShowAnimation(false);
    saveVote(roomId, "");
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit("send_message", { message: newMessage, type: "chat" });
      setNewMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const getParticipantColor = (participant: string) => {
    let color = participantColors.get(participant);
    if (!color) {
      const unusedColors = [...PARTICIPANT_COLORS].filter(
        (c) => ![...participantColors.values()].includes(c)
      );
      if (unusedColors.length > 0) {
        color = unusedColors[Math.floor(Math.random() * unusedColors.length)];
        participantColors.set(participant, color);
      } else {
        color =
          PARTICIPANT_COLORS[
            Math.floor(Math.random() * PARTICIPANT_COLORS.length)
          ];
        participantColors.set(participant, color);
      }
    }
    return color;
  };

  const average = calculateAverageVote(roomState.votes, roomState.revealed);

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

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <RoomHeader
            roomName={roomState.name}
            roomId={roomId}
            onLeaveRoom={onLeaveRoom}
          />
        </Grid>

        <Grid item xs={12} lg={8}>
          <TaskSection
            currentTask={roomState.currentTask}
            onNewTask={handleNewTask}
          />

          <ResultsSection
            votes={roomState.votes}
            revealed={roomState.revealed}
            localRevealed={localRevealed}
            showAnimation={showAnimation}
            countdown={countdown}
            average={average}
            participants={roomState.participants}
            onReveal={handleReveal}
            onReset={handleReset}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <ParticipantsList
            participants={roomState.participants}
            votes={roomState.votes}
            currentUser={username}
            getParticipantColor={getParticipantColor}
          />

          <ChatSection
            messages={messages}
            currentUser={username}
            newMessage={newMessage}
            onNewMessageChange={setNewMessage}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        <Grid item xs={12}>
          <VotingSection
            cardValues={CARD_VALUES}
            selectedCard={selectedCard}
            revealed={roomState.revealed}
            onVote={handleVote}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlanningRoom;
