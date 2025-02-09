import type { RoomState } from "../types";

export const saveRoomState = (roomId: string, state: RoomState) => {
	localStorage.setItem(`room_${roomId}_state`, JSON.stringify(state));
};

export const loadRoomState = (roomId: string): RoomState | null => {
	const savedState = localStorage.getItem(`room_${roomId}_state`);
	return savedState ? JSON.parse(savedState) : null;
};

export const saveVote = (roomId: string, vote: string) => {
	localStorage.setItem(`room_${roomId}_vote`, vote);
};

export const loadVote = (roomId: string): string | null => {
	return localStorage.getItem(`room_${roomId}_vote`);
};

export const clearRoomData = (roomId: string) => {
	localStorage.removeItem(`room_${roomId}_state`);
	localStorage.removeItem(`room_${roomId}_vote`);
};
