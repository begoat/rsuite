import React, { useState, useCallback } from 'react';
import { Button } from 'rsuite';

export const ClickTest = () => {
  const [clickTime, setClickTime] = useState(0);
  const handleClick = useCallback(() => {
    setClickTime(c => c + 1);
  }, []);

  return (
    <>
      <Button appearance="primary" onClick={handleClick}>
        Click Me
      </Button>
      <br />
      <span>You clicked {clickTime}</span>
    </>
  );
};

ClickTest.displayName = 'ClickTest';
export default ClickTest;
