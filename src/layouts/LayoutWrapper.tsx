/** Absolute imports */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/** Components */
import { StandartLayout } from './Standart/StandartLayout';

/** Store */
import { initializeApp } from '../store/auth/actions';
import { startMessagesListening, stopMessagesListening } from '../store/chat/actions';

export type LayoutType = 'standart';

interface Props {
    component: any;
    type?: LayoutType;
    // All other props
    [x:string]: any;
  };

export const LayoutWrapper: React.FC<Props> = ({type, component, ...rest}) => {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(initializeApp());
      dispatch(startMessagesListening(dispatch));
      return () => {
          dispatch(stopMessagesListening(dispatch));
      }
  }, []);


  if (type === 'standart')
    return <StandartLayout component={component} {...rest} />
  else
    return component;
}