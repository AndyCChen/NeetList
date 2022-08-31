export interface CarouselState {
   offset: number,
   activeIndex: number,
   desiredIndex: number,
};

interface CarouselNextAction {
   type: 'Next',
   length: number
};

interface CarouselPrevAction {
   type: 'Prev',
   length: number
};

export type CarouselAction = 
   CarouselNextAction |
   CarouselPrevAction;