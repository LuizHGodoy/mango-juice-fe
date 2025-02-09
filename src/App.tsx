import PlanningRoom from "@/components/PlanningRoom";
import RoomEntry from "@/components/RoomEntry";
import { API_URL } from "@/config";
import { clearRoomData } from "@/utils/storage";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
          background: {
            default: prefersDarkMode ? "#121212" : "#ffffff",
            paper: prefersDarkMode ? "#1e1e1e" : "#ffffff",
          },
        },
      }),
    [prefersDarkMode]
  );

  const [roomState, setRoomState] = useState<{
    inRoom: boolean;
    roomId: string;
    username: string;
  }>(() => {
    const savedState = localStorage.getItem("roomState");
    return savedState
      ? JSON.parse(savedState)
      : {
          inRoom: false,
          roomId: "",
          username: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("roomState", JSON.stringify(roomState));
  }, [roomState]);

  const handleJoinRoom = async (roomId: string, username: string) => {
    const newState = {
      inRoom: true,
      roomId,
      username,
    };
    setRoomState(newState);
    localStorage.setItem("roomState", JSON.stringify(newState));
  };

  const handleCreateRoom = async (roomName: string, username: string) => {
    try {
      const response = await fetch(`${API_URL}/api/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: roomName }),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar sala");
      }

      const data = await response.json();
      const newState = {
        inRoom: true,
        roomId: data.room_id,
        username,
      };
      setRoomState(newState);
      localStorage.setItem("roomState", JSON.stringify(newState));
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      alert("Erro ao criar sala. Por favor, tente novamente.");
    }
  };

  const handleLeaveRoom = () => {
    const newState = {
      inRoom: false,
      roomId: "",
      username: "",
    };
    setRoomState(newState);
    if (roomState.roomId) {
      clearRoomData(roomState.roomId);
    }
    localStorage.removeItem("roomState");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!roomState.inRoom ? (
        <RoomEntry
          onJoinRoom={handleJoinRoom}
          onCreateRoom={handleCreateRoom}
        />
      ) : (
        <PlanningRoom
          roomId={roomState.roomId}
          username={roomState.username}
          onLeaveRoom={handleLeaveRoom}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
