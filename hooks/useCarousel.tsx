import { useEffect, useReducer } from "react";
import { CarouselState, CarouselAction } from '../interfaces/carouselInterfaces';

const getNextIndex = (currentIndex: number, length: number) => {
   return (currentIndex + 1) % length;
}

const getPrevIndex = (currentIndex: number, length: number) => {
   return (currentIndex - 1 + length) % length;
} 

const initialState: CarouselState  = {
   offset: 0,
   desiredIndex: 0,
   activeIndex: 0,
}

const reducer = (state: CarouselState, action: CarouselAction) => {
   switch(action.type) {
      case 'Next':
         return {
            ...state,
            desiredIndex: getNextIndex(state.activeIndex, action.length)
         };
      case 'Prev':
         return {
            ...state,
            desiredIndex: getPrevIndex(state.activeIndex, action.length)
         };
      
   }
}

export const useCarousel = (mouseOffset: number) => {
   console.log(mouseOffset);
}