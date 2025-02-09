import type { ParticipantColor } from "@/types";
import { Box, Paper, Tooltip, Typography } from "@mui/material";

interface ParticipantsListProps {
  participants: string[];
  votes: { [key: string]: string };
  currentUser: string;
  getParticipantColor: (participant: string) => ParticipantColor;
}

export const ParticipantsList = ({
  participants,
  votes,
  currentUser,
  getParticipantColor,
}: ParticipantsListProps) => {
  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 2 },
        display: "flex",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Typography variant="h6">Participantes</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ml: "auto",
          }}
        >
          <Box
            sx={{
              height: 4,
              width: 100,
              bgcolor: "action.hover",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${
                  (Object.keys(votes).length / participants.length) * 100
                }%`,
                bgcolor: "success.main",
                position: "absolute",
                transition: "width 0.3s ease-in-out",
              }}
            />
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              minWidth: 45,
              textAlign: "right",
            }}
          >
            {Object.keys(votes).length}/{participants.length}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
        {participants.map((participant) => {
          const color = getParticipantColor(participant);
          const hasVoted = votes[participant];
          return (
            <Tooltip
              key={participant}
              title={hasVoted ? "Já votou" : "Ainda não votou"}
              arrow
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 24,
                  pl: 1,
                  pr: 1.5,
                  borderRadius: 3,
                  bgcolor: color.bg,
                  color: color.text,
                  fontSize: "0.75rem",
                  fontWeight: "medium",
                  position: "relative",
                  transition: "all 0.2s ease-in-out",
                  opacity: hasVoted ? 1 : 0.7,
                  "&:hover": {
                    transform: "translateY(-1px)",
                    opacity: 1,
                  },
                }}
              >
                {participant === currentUser ? "eu" : participant}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Paper>
  );
};
