import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { brown, pink } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    maxWidth: '75%',
  },
  sentMsgBox: {
    backgroundColor: ({ sent }) => (sent ? brown[600] : pink[600]),
    padding: theme.spacing(2),
    color: 'white',
    borderRadius: ({ sent }) => (sent ? '0 8px 8px' : '8px 0 8px 8px'),
    '& > p': {
      wordBreak: 'break-all',
    },
  },
  username: {
    fontSize: 12,
    paddingLeft: 16,
    paddingTop: 4,
  },
}));

const SentMessage = ({ message, username, sent = true }) => {
  const classes = useStyles({ sent });

  return (
    <Grid container justifyContent={sent ? 'flex-start' : 'flex-end'}>
      <Box className={classes.content} mb={1.5}>
        <Box className={classes.sentMsgBox} width="auto">
          <Typography variant="body2">{message}</Typography>
        </Box>
        <Typography variant="subtitle2" className={classes.username}>{username}</Typography>
      </Box>
    </Grid>
  );
};

export default SentMessage;
