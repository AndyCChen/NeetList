export interface styleState {
	transform: string,
	left: string,
	transition: string,
};

interface stylePopBackAction {
	type: 'PopBack',
	offset: number,
}

interface styleDragAction {
	type: 'Drag',
	offset: number,
};

interface styleDoneAction {
	type: 'Done',
};

export type styleAction = 
	stylePopBackAction |
	styleDragAction |
	styleDoneAction;