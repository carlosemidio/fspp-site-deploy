import React from "react"
import { withAuthSync } from '../../services/auth'
import {
  Card,
  CardContent,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/Layout'
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: 'none',
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
}));

function News() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Layout>
        <div className='editor'>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <h1>Notícias</h1>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}

export default withAuthSync(News);