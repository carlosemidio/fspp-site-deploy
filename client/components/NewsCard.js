import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
require('moment/locale/pt.js');

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  details: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cover: {
    minWidth: 270,
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
    },
  }
}));

function NewsCard({news}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={`http://localhost:5000/uploads/news/${news.image}`}
        title={news.title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div>
            <Typography component="h6" variant="h6">
              {news.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Teste
            </Typography>
          </div>
          <Typography variant="subtitle2" color="textSecondary">
            {news.updatedAt && `Atualizado ${moment(news.updatedAt).fromNow()}`}
          </Typography>
        </CardContent>
      </div>
    </Card>  
  );
}

export default React.memo(NewsCard);