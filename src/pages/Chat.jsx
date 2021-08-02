import React, { useEffect, useRef, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {
  Box, Button, Container, Divider, Grid, Paper, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Message from 'components/Message';
import useSocket from 'hooks/useSocket';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
  },
  content: {
    width: 400,
    height: 600,
  },
  messages: {
    flex: 1,
    overflow: 'auto',
  },
}));

export default function Chat() {
  const classes = useStyles();
  const { room } = useParams();
  const { messages, user } = useSocket();
  const [message, setMessage] = useState('');
  const { socket, setMessages, setUser } = useSocket();
  const messageBoardRef = useRef(null);

  useEffect(() => {
    if (messageBoardRef?.current) {
      messageBoardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendChat = () => {
    socket.emit('chat', message);
    setMessage('');
  };

  if (!user) {
    return <Redirect to="/login" />;
  }

  const onLeave = () => {
    setUser(undefined);
    setMessages([]);
    socket.emit('leave');
  };

  return (
    <Container component="main" className={classes.container}>
      <Box width={1} m={5} display="flex" justifyContent="flex-end">
        <Paper className={classes.content}>
          <Box p={2} display="flex" flexDirection="column" boxSizing="border-box" height={1}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h4">
                {user.username}
                {' '}
                <Typography variant="subtitle1" component="span">
                  {`in ${room}`}
                </Typography>
              </Typography>
              <Button color="primary" onClick={onLeave}>{user.isRoomCreator ? 'Log out' : 'Leave'}</Button>
            </Grid>
            <Box py={2}>
              <Divider />
            </Box>
            <Box className={classes.messages}>
              {messages.map((item, index) => (
                <Message
                  message={item.text}
                  key={index}
                  username={item.username}
                  sent={item.userId === user.id}
                />
              ))}
              <Box ref={messageBoardRef} />
            </Box>
            <Grid container wrap="nowrap">
              <TextField
                label="Enter your message"
                value={message}
                variant="outlined"
                fullWidth
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    sendChat();
                  }
                }}
              />
              <Button variant="contained" color="primary" disabled={!message} onClick={sendChat}>Send</Button>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
