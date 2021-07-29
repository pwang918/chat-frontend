import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Button, Container, Divider, Grid, Paper, TextField, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
}));

export default function Chat() {
  const classes = useStyles();
  const { room } = useParams();

  return (
    <Container component="main" className={classes.container}>
      <Box width={1} m={5} display="flex" justifyContent="flex-end">
        <Paper className={classes.content}>
          <Box p={2} display="flex" flexDirection="column" boxSizing="border-box" height={1}>
            <Typography variant="h4">{room}</Typography>
            <Box py={2}>
              <Divider />
            </Box>
            <Box height={1}>
              <Typography>Content</Typography>
            </Box>
            <Grid container wrap="nowrap">
              <TextField label="Enter your message" variant="outlined" fullWidth />
              <Button variant="contained" color="primary">Send</Button>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
