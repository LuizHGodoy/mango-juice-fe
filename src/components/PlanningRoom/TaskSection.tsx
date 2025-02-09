import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface TaskSectionProps {
  currentTask: string | null;
  onNewTask: (task: string) => void;
}

export const TaskSection = ({ currentTask, onNewTask }: TaskSectionProps) => {
  const [newTask, setNewTask] = useState("");

  const handleNewTask = () => {
    if (newTask.trim()) {
      onNewTask(newTask.trim());
      setNewTask("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleNewTask();
    }
  };

  return (
    <Paper sx={{ p: { xs: 1, sm: 2 }, mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">
          Tarefa Atual: {currentTask || "Nenhuma tarefa selecionada"}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          label="Nova Tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#FFD700",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFD700",
              },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleNewTask}
          sx={{
            bgcolor: "#000000",
            color: "#FFD700",
            borderColor: "#FFD700",
            minWidth: "fit-content",
            whiteSpace: "nowrap",
            "&:hover": {
              bgcolor: "#1a1a1a",
            },
          }}
        >
          Adicionar Tarefa
        </Button>
      </Box>
    </Paper>
  );
};
