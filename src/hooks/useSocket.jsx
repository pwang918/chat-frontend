import React, {
  createContext, useContext, useState,
} from 'react';

import io from 'socket.io-client';

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket] = useState(io.connect('/'));

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default function useSocket() {
  return useContext(SocketContext);
}
