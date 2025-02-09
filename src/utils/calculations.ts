import type { Vote } from "../types";

export const calculateAverageVote = (
	votes: Vote,
	revealed: boolean,
): number | null => {
	if (!revealed) return null;

	const validVotes = Object.values(votes).filter((v) => v !== "?");
	if (validVotes.length === 0) return 0;

	return (
		validVotes.reduce((sum, curr) => sum + Number(curr), 0) / validVotes.length
	);
};

export const getRandomParticipantColor = (
	colors: { bg: string; text: string }[],
): { bg: string; text: string } => {
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
};
