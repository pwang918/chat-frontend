import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import io from 'socket.io-client';

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket] = useState(io.connect('http://localhost:8000'));
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const history = useHistory();
  const { url } = useRouteMatch();

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

      if (data.disconnect) {
        setUser(undefined);
        setMessages([]);
      } else if (url !== `/chat/${data.room}`) {
        history.push(`/chat/${data.room}`);
      }
    });
  }, [socket, messages]);

  useEffect(() => {
    if (history.location.pathname === '/login') {
      setMessages([]);
    }
  }, [history]);

  const memoedValue = useMemo(() => ({
    socket,
    messages,
    user,
    setMessages,
    setUser,
  }), [messages, user, socket]);

  return (
    <SocketContext.Provider value={memoedValue}>{children}</SocketContext.Provider>
  );
}

export default function useSocket() {
  return useContext(SocketContext);
}
