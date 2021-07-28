import React from 'react';
import {
  Box, Button, Container, Grid, Paper, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <Container component="main" className={classes.container}>
      <Paper p={3} className={classes.content} elevation={0}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant="h4" align="center">Welcome to ChatApp</Typography>
          </Grid>
          <Grid item>
            <TextField label="Input your user name" name="username" variant="outlined" fullWidth />
          </Grid>
          <Grid item>
            <TextField label="Input the room name" name="roomname" variant="outlined" fullWidth />
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="center" mt={3} width={1}>
              <Button variant="outlined" color="primary">Join</Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
