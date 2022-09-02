import React, { useEffect, useReducer } from "react";
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
      case 'Done':
         return {
            ...state,
            activeIndex: state.desiredIndex,
         };
      case 'Drag':
         return {
            ...state,
            offset: action.offset,
         };
   }
}

export const useCarousel = (length: number): [number] => {
   const [state, dispatch] = useReducer(reducer, initialState);

   // handle a swiping operation that is in progress
   const swiping = (e: any) => {
      //console.log(e.detail());
      dispatch({type: 'Drag', offset: e.detail()})
   }

   useEffect(() => {
      console.log(state.offset);
   }, [state.offset]);

   const swipedLeft = () => {
      console.log('left')
   }

   const swipedRight = () => {
      console.log('right')
   }

   useEffect(() => {
        document.addEventListener('swiping', swiping);
        document.addEventListener('swipedLeft', swipedLeft);
        document.addEventListener('swipedRight', swipedRight);

        return () => {
         document.removeEventListener('swiping', swiping);
         document.removeEventListener('swipedLeft', swipedLeft);
         document.removeEventListener('swipedRight', swipedRight);
     };
   }, []);

   return [state.activeIndex]
}