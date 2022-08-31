export interface mouseState {
   offset: number,
   isSwipedLeft: boolean,
   isSwipedRight: boolean,
   isSwiping: boolean,
};

interface swipingAction {
   type: 'Swiping',
   offset: number,
};

interface swipeLeftAction {
   type: 'SwipedLeft',
};

interface swipeRightAction {
   type: 'SwipedRight',
};

export type mouseAction =
   swipingAction |
   swipeLeftAction |
   swipeRightAction;