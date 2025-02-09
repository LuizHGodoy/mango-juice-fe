export interface Vote {
	[participant: string]: string;
}

export type MessageType = "chat" | "system";

export interface Message {
	id: string;
	senderId: string;
	senderName: string;
	content: string;
	timestamp: string;
	type: MessageType;
}

export interface RoomState {
	participants: string[];
	votes: Vote;
	revealed: boolean;
	currentTask: string | null;
	name: string;
	messages?: Message[];
}

export interface ParticipantColor {
	bg: string;
	text: string;
}
