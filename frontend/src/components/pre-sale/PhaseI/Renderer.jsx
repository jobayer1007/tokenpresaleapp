import React from 'react';
import Countdown from 'react-countdown';
import Opened from './Opened';
import CountingDown from './CountingDown';
import { chainConfig } from '../../../config/env';

const opensIn = chainConfig.presaleOpensAt;

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) return <Opened />;

  return <CountingDown counter={`${days}:${hours}:${minutes}:${seconds}`} opensIn={opensIn} />;
};

const PhaseI = () => {
  return <Countdown date={opensIn} renderer={renderer} />;
};

export default PhaseI;
