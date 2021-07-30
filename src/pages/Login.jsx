import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useSocket from 'hooks/useSocket';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 600,
    marginTop: 100,
  },
  content: {
    padding: theme.spacing(6),
    margin: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [roomname, setRoomname] = useState('');
  const socket = useSocket();

  const onJoinRoom = () => {
    socket.emit('join', { username, roomname });
  };

  return (
    <Container component="main" className={classes.container}>
      <Paper className={classes.content} elevation={0}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h4" align="center">Welcome to ChatApp</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Input your user name"
              name="username"
              value={username}
              variant="outlined"
              fullWidth
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Input the room name"
              name="roomname"
              value={roomname}
              variant="outlined"
              fullWidth
              onChange={(event) => setRoomname(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="center" mt={3} width={1}>
              <Button
                variant="contained"
                color="primary"
                disabled={!username || !roomname}
                onClick={onJoinRoom}
              >
                Join
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
