import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import io from 'socket.io-client';

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket] = useState(io.connect('/'));
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const history = useHistory();

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages([...messages, data]);

      if (data.private) {
        setUser({
          id: data.userId,
          username: data.username,
          isRoomCreator: data.isRoomCreator,
        });
      }

      history.push(`/chat/${data.room}`);
    });
  }, [socket, messages]);

  const memoedValue = useMemo(() => ({
    socket,
    messages,
    user,
    setMessages,
  }), [messages, user, socket]);

  return (
    <SocketContext.Provider value={memoedValue}>{children}</SocketContext.Provider>
  );
}

export default function useSocket() {
  return useContext(SocketContext);
}
