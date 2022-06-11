import React, { useState } from 'react';

export const App: React.FC<React.PropsWithChildren> = (props) => {
  const [kek, setKek] = useState(1);

  console.log('kek', kek, setKek);

  return (
    <div>
      {props.children}
    </div>
  );
};
