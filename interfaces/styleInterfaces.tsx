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
	activeIndex: number,
};

interface styleTransitionAction {
	type: 'Transition',
	direction: number,
}

export type styleAction = 
	stylePopBackAction |
	styleDragAction |
	styleDoneAction |
	styleTransitionAction;