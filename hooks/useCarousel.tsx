import React, { useEffect, useReducer, useState } from "react";
import { CarouselState, CarouselAction } from '../interfaces/carouselInterfaces';
import { styleState, styleAction } from '../interfaces/styleInterfaces';

const transitionTime: number = 400;
const smoothTransition: string = `transform ${transitionTime}ms ease`;
const noTransition: string = '';

const getNextIndex = (currentIndex: number, length: number) => {
   return (currentIndex + 1) % length;
}

const getPrevIndex = (currentIndex: number, length: number) => {
   return (currentIndex - 1 + length) % length;
}

const getThreshold = (clientWidth: number) => {
   return clientWidth / 2;
}

const initialCarouselState: CarouselState  = {
   offset: NaN,
   desiredIndex: 0,
   activeIndex: 0,
}

const carouselReducer = (state: CarouselState, action: CarouselAction) => {
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
            offset: NaN,
            activeIndex: state.desiredIndex,
         };
      case 'Drag':
         return {
            ...state,
            offset: action.offset,
         };
      default:
         return {
            ...state
         };
   }
}

const initialStyleState: styleState = {
   transform: 'translateX(0)',
   transition: noTransition,
   left: '-100%',
}

const styleReducer = (state: styleState, action: styleAction) => {
   switch (action.type) {
      case 'Drag':
         return {
            ...state,
            transform: `translateX(${action.offset}px)`,
            transition: noTransition,
         };  
      case 'PopBack':
         return {
            ...state,
            transform: `translateX(${action.offset})`,
            transition: smoothTransition,
         };
      case 'Transition':
         return {
            ...state,
            transform: `translateX(${action.direction * 100}%)`,
            transition: smoothTransition,
         };
      case 'Done':
         return {
            transform: 'translateX(0)',
            transition: noTransition,
            left: `-${(action.activeIndex + 1) * 100}%`
         };
      default:
         return {
            ...state,
         };
   }
}

export const useCarousel = (length: number): {activeIndex: number, styles: React.CSSProperties} => {
   const [carauselState, carouselDispatch] = useReducer(carouselReducer, initialCarouselState);

   const [styleState, styleDispatch] = useReducer(styleReducer, initialStyleState);

   // handle a swiping operation that is in progress
   const swiping = (e: any) => {
      carouselDispatch({type: 'Drag', offset: e.detail()});
   }

   // run when swiped action is finished
   const handleSwiped = (e: any) => {
      const threshold = getThreshold(e.detail());
      const direction = Math.sign(carauselState.offset);

      // if offset exceeds threshold, go to next or previous index,
      // else popback to current index
      if (Math.abs(carauselState.offset) > threshold && direction !== 0) {
         carouselDispatch({type: direction === -1 ? 'Next' : 'Prev', length: length});
      } else {
         carouselDispatch({type: 'Drag', offset: 0});
      }
   }

   useEffect(() => {
      // if activeIndex and desiredIndex are not equal, perform transition to the desired index
      if (carauselState.activeIndex !== carauselState.desiredIndex && Math.sign(carauselState.offset) !== 0) {
         styleDispatch({type: 'Transition', direction: Math.sign(carauselState.offset)});
         console.log('transitioning')

      } else if (!isNaN(carauselState.offset)){
         // offset will be set to zero if it did not exceed the threshold needed to transiton to next or prev index,
         // in this case we popback to the active carousel item
         if (carauselState.offset === 0) {
            styleDispatch({type: 'PopBack', offset: carauselState.offset});
         }
         // else a drag operation is underway and we update the translateX with the new offset value
          else {
            styleDispatch({type: 'Drag', offset: carauselState.offset});
         }
      } else {
         styleDispatch({type: 'Done', activeIndex: carauselState.activeIndex});
      }

      // listen to swipe events emitted from useMousePosition
      document.addEventListener('swiping', swiping);
      document.addEventListener('swiped', handleSwiped);

      return () => {
         document.removeEventListener('swiping', swiping);
         document.removeEventListener('swiped', handleSwiped);
      }
   }, [carauselState]);

   useEffect(() => {
      const timeOut = setTimeout(() => carouselDispatch({type: 'Done'}), transitionTime);

      return () => clearTimeout(timeOut);
   }, [carauselState.desiredIndex]);

   return {activeIndex: carauselState.activeIndex, styles: styleState}
}