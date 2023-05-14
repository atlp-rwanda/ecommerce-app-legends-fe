import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Rating = ({ rating }) => {
  const count = 5;
  const color = {
    filled: '#FF800C',
    unfilled: '#DCDCDC',
  };
  const getColor = (index) => {
    if (rating >= index) {
      const roundedNbr = Math.floor(rating);
      if (rating > roundedNbr) {
        const style = { color: color.filled, clipPath: 'inset(0 50% 0 0)' };
        return style;
      }
      return { color: color.filled };
    }
    return { color: color.unfilled };
  };

  const currentRating = useMemo(() => {
    // const roundedNbr = Math.floor(rating);
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className=""
          icon={faStar}
          //   onClick={() => onRating(idx)}
          style={{
            color: getColor(idx).color,
            clipPath: getColor(idx).clipPath,
          }}
          //   onMouseEnter={() => setHoverRating(idx)}
          //   onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [count, rating]);

  return <div>{currentRating}</div>;
};

export default Rating;
