import React from 'react'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardAction from '@material-ui/core/CardActions'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import moment from 'moment'
require('moment/locale/pt.js')

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  actions: {
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2),
    },
  }
}))

function NewsCard({news, onDelete = null}) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <Link 
          as={(onDelete !== null) ? `/admin/noticia/${news.id}`: `/noticia/${news.id}`} 
          href={{pathname: (onDelete !== null) ? '/admin/noticia': 'noticia', query: {id: news.id}}}
          >
          <a style={{textDecoration: 'none'}}>
            <div className={classes.details}>
              <CardMedia
                className={classes.cover}
                image={`http://localhost:5000/uploads/news/${news.image}`}
                title={news.title}
              />
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
          </a>
        </Link>
      </div>
      {(onDelete !== null) &&
        <CardAction className={classes.actions}>
          <IconButton onClick={onDelete} aria-label={`Deletar ${news.title}`} component="span">
            <DeleteIcon/>
          </IconButton>  
        </CardAction>
      }
    </Card>  
  )
}

export default React.memo(NewsCard)