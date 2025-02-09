import FavoriteIcon from "@mui/icons-material/Favorite";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";

interface VotingSectionProps {
  cardValues: string[];
  selectedCard: string | null;
  revealed: boolean;
  onVote: (value: string) => void;
}

export const VotingSection = ({
  cardValues,
  selectedCard,
  revealed,
  onVote,
}: VotingSectionProps) => {
  return (
    <Paper sx={{ p: { xs: 1, sm: 2 }, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Vote sabiamente
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, sm: 2 }}
        sx={{
          justifyContent: { xs: "center", sm: "flex-start" },
          width: "100%",
        }}
      >
        {cardValues.map((value) => (
          <Grid item key={value}>
            <Card
              sx={{
                width: { xs: 60, sm: 80 },
                height: { xs: 90, sm: 120 },
                cursor: revealed ? "default" : "pointer",
                bgcolor: "#000000",
                opacity: revealed ? 0.6 : 1,
                borderRadius: 2,
                position: "relative",
                border:
                  selectedCard === value
                    ? "2px solid #FFD700"
                    : "1px solid #333333",
                background:
                  value === "?"
                    ? 'linear-gradient(145deg, #1a1a1a 0%, #000000 100%), url(\'data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23333333" fill-opacity="0.4" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"%2F%3E%3C%2Fg%3E%3C/svg%3E\')'
                    : "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)",
                backgroundBlendMode: "overlay",
                "&:hover": {
                  transform: revealed ? "none" : "translateY(-4px)",
                  boxShadow:
                    selectedCard === value
                      ? "0 8px 16px rgba(255, 215, 0, 0.3)"
                      : "0 8px 16px rgba(0, 0, 0, 0.5)",
                  transition: "all 0.2s ease-in-out",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 4,
                  left: 4,
                  right: 4,
                  bottom: 4,
                  border: "1px solid",
                  borderColor: selectedCard === value ? "#FFD700" : "#333333",
                  borderRadius: 1,
                  opacity: 0.5,
                  ...(value === "?" && {
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
                  border: "1px solid",
                  borderColor: selectedCard === value ? "#FFD700" : "#333333",
                  borderRadius: 1,
                  opacity: 0.3,
                },
              }}
              onClick={() => !revealed && onVote(value)}
            >
              <CardContent
                sx={{
                  p: "0 !important",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
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
                      color: selectedCard === value ? "#FFD700" : "#888888",
                      fontWeight: "bold",
                    }}
                  >
                    {value}
                  </Typography>
                  <FavoriteIcon
                    sx={{
                      fontSize: "0.7rem",
                      color: selectedCard === value ? "#FFD700" : "#888888",
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
                    color: selectedCard === value ? "#FFD700" : "#888888",
                    textShadow:
                      selectedCard === value
                        ? "0 0 10px rgba(255, 215, 0, 0.5)"
                        : "none",
                    fontFamily: "serif",
                    ...(value === "?" && {
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                      fontFamily: "'Playfair Display', serif",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                    }),
                  }}
                >
                  {value === "?" ? (
                    <>
                      <TheaterComedyIcon
                        sx={{
                          fontSize: { xs: "2rem", sm: "2.5rem" },
                          color: selectedCard === value ? "#FFD700" : "#888888",
                          animation:
                            selectedCard === value
                              ? "pulse 2s infinite"
                              : "none",
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
                      <Box sx={{ fontSize: "0.5em", opacity: 0.8 }}>JOKER</Box>
                    </>
                  ) : (
                    value
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
                      color: selectedCard === value ? "#FFD700" : "#888888",
                      fontWeight: "bold",
                    }}
                  >
                    {value}
                  </Typography>
                  <FavoriteIcon
                    sx={{
                      fontSize: "0.7rem",
                      color: selectedCard === value ? "#FFD700" : "#888888",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
