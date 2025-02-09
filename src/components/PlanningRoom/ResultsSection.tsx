import type { Vote } from "@/types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import {
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  Grid,
  Paper,
  Typography,
  Zoom,
} from "@mui/material";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import dicesAnimation from "../../assets/dices.json";

interface ResultsSectionProps {
  votes: Vote;
  revealed: boolean;
  localRevealed: boolean;
  showAnimation: boolean;
  countdown: number | null;
  average: number | null;
  participants: string[];
  onReveal: () => void;
  onReset: () => void;
}

export const ResultsSection = ({
  votes,
  revealed,
  localRevealed,
  showAnimation,
  countdown,
  average,
  participants,
  onReveal,
  onReset,
}: ResultsSectionProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [dots, setDots] = useState("...");

  const allVoted =
    participants.length > 0 &&
    participants.every((participant) => votes[participant]);

  useEffect(() => {
    if (countdown !== null || revealed) return;

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : `${prev}.`));
    }, 500);

    return () => clearInterval(interval);
  }, [countdown, revealed]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    participant: string
  ) => {
    if (!hoveredCard || !showAnimation) return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseEnter = (participant: string) => {
    if (!showAnimation) return;
    setHoveredCard(participant);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCard(null);
    if (!showAnimation) return;
    event.currentTarget.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  };

  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 2 },
        mb: 2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "200px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Resultados</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={onReveal}
            disabled={
              (revealed && localRevealed) || !allVoted || countdown !== null
            }
            sx={{
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
            {!allVoted
              ? "Aguardando votos..."
              : countdown !== null
              ? "Revelando..."
              : "Revelar Votos"}
          </Button>
          <Button
            variant="outlined"
            onClick={onReset}
            sx={{
              color: "#FFD700",
              borderColor: "#FFD700",
              "&:hover": {
                borderColor: "#FFD700",
                bgcolor: "rgba(255, 215, 0, 0.1)",
              },
            }}
          >
            Reiniciar Votação
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexGrow: 1,
        }}
      >
        {countdown !== null && (
          <Fade in={true}>
            <Typography variant="h2" align="center" sx={{ my: 3 }}>
              {countdown}
            </Typography>
          </Fade>
        )}
        {revealed && localRevealed ? (
          <Zoom in={showAnimation} timeout={500}>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                spacing={2}
                sx={{
                  alignItems: "flex-start",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {participants.map((participant) => (
                  <Grid item xs={6} sm={4} md={3} key={participant}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        width: "100%",
                      }}
                    >
                      <Card
                        onMouseMove={(e) => handleMouseMove(e, participant)}
                        onMouseEnter={() => handleMouseEnter(participant)}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                          width: { xs: 60, sm: 80 },
                          height: { xs: 90, sm: 120 },
                          bgcolor: "#000000",
                          borderRadius: 2,
                          position: "relative",
                          border: "1px solid #333333",
                          background:
                            votes[participant] === "?"
                              ? 'linear-gradient(145deg, #1a1a1a 0%, #000000 100%), url(\'data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23333333" fill-opacity="0.4" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"%2F%3E%3C%2Fg%3E%3C/svg%3E\')'
                              : "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)",
                          backgroundBlendMode: "overlay",
                          transform: showAnimation
                            ? "rotateY(0deg)"
                            : "rotateY(180deg)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden",
                          boxShadow:
                            hoveredCard === participant
                              ? "0 15px 25px rgba(0, 0, 0, 0.6)"
                              : "0 8px 16px rgba(0, 0, 0, 0.5)",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 4,
                            left: 4,
                            right: 4,
                            bottom: 4,
                            border: "1px solid #333333",
                            borderRadius: 1,
                            opacity: 0.5,
                            transform:
                              hoveredCard === participant
                                ? "translateZ(20px)"
                                : "none",
                            transition:
                              "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            ...(votes[participant] === "?" && {
                              background:
                                "radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 60%)",
                            }),
                          },
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            top: 6,
                            left: 6,
                            right: 6,
                            bottom: 6,
                            border: "1px solid #333333",
                            borderRadius: 1,
                            opacity: 0.3,
                            transform:
                              hoveredCard === participant
                                ? "translateZ(10px)"
                                : "none",
                            transition:
                              "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          },
                          "& .card-content": {
                            transform:
                              hoveredCard === participant
                                ? "translateZ(30px)"
                                : "none",
                            transition:
                              "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            backfaceVisibility: "hidden",
                          },
                          "&::before, &::after, & .card-content": {
                            backfaceVisibility: "hidden",
                          },
                        }}
                      >
                        <CardContent
                          className="card-content"
                          sx={{
                            p: "0 !important",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backfaceVisibility: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 4,
                              left: 4,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.7rem",
                                color: "#888888",
                                fontWeight: "bold",
                              }}
                            >
                              {votes[participant]}
                            </Typography>
                            <FavoriteIcon
                              sx={{
                                fontSize: "0.7rem",
                                color: "#888888",
                              }}
                            />
                          </Box>
                          <Typography
                            variant="h4"
                            align="center"
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              fontSize: { xs: "1.5rem", sm: "2rem" },
                              fontWeight: "bold",
                              color: "#888888",
                              fontFamily: "serif",
                              ...(votes[participant] === "?" && {
                                fontSize: { xs: "1.2rem", sm: "1.5rem" },
                                fontFamily: "'Playfair Display', serif",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                              }),
                            }}
                          >
                            {votes[participant] === "?" ? (
                              <>
                                <TheaterComedyIcon
                                  sx={{
                                    fontSize: { xs: "2rem", sm: "2.5rem" },
                                    color: "#888888",
                                    animation: "pulse 2s infinite",
                                    "@keyframes pulse": {
                                      "0%": {
                                        transform: "scale(1)",
                                        opacity: 1,
                                      },
                                      "50%": {
                                        transform: "scale(1.1)",
                                        opacity: 0.7,
                                      },
                                      "100%": {
                                        transform: "scale(1)",
                                        opacity: 1,
                                      },
                                    },
                                  }}
                                />
                                <Box sx={{ fontSize: "0.5em", opacity: 0.8 }}>
                                  JOKER
                                </Box>
                              </>
                            ) : (
                              votes[participant]
                            )}
                          </Typography>
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 4,
                              right: 4,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              transform: "rotate(180deg)",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.7rem",
                                color: "#888888",
                                fontWeight: "bold",
                              }}
                            >
                              {votes[participant]}
                            </Typography>
                            <FavoriteIcon
                              sx={{
                                fontSize: "0.7rem",
                                color: "#888888",
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          textAlign: "center",
                          width: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          px: 1,
                        }}
                      >
                        {participant}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              {average !== null && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    color: "#FFD700",
                    fontWeight: "medium",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                    "&::before, &::after": {
                      content: '""',
                      height: "1px",
                      width: { xs: "15%", sm: "20%" },
                      bgcolor: "#FFD700",
                      opacity: 0.5,
                    },
                  }}
                >
                  Média: {average?.toFixed(1)}
                </Typography>
              )}
            </Box>
          </Zoom>
        ) : countdown === null ? (
          <Box
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#FFD700",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Box component="span">Aguardando votação</Box>
              <Box
                component="span"
                sx={{
                  width: "2em",
                  textAlign: "left",
                  display: "inline-block",
                }}
              >
                {dots}
              </Box>
            </Typography>
            <Box
              sx={{
                width: "140px",
                height: "140px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))",
              }}
            >
              <Lottie
                animationData={dicesAnimation}
                loop={true}
                style={{
                  width: "80%",
                  height: "80%",
                  filter: "brightness(1.2) contrast(1.1)",
                }}
              />
            </Box>
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
};
