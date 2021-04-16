import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActionArea, CardActions,CardContent, CardMedia, Button, Typography  } from '@material-ui/core/';
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 16,
    transition: '0.2s',
    padding: '0.5rem',
    margin: '0.5rem',
    '&:hover': {
            transform: 'scale(1.1)',
    },
  },
  cardHover: {
        backgroundColor: 'rgba( 255, 255, 255, 0.25 )',
        boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
        backdropFilter: 'blur( 6.0px )',
        borderRadius: '10px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        WebkitBackdropFilter: 'blur(6.0px)'
    },
    cardImage: {
        background: 'transparent',
        borderRadius: '10px',
        margin: '2px'
    },
    link:{
        textDecoration: 'none',
        color:'#000',
        font: '12px',
        fontWeight: 'bold'
    }
});

const PokemonCard = ({ pokemon }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, classes.cardHover)}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={pokemon}
          height="280"
          width="240"
          image={`https://img.pokemondb.net/artwork/large/${pokemon}.jpg`}
          title={pokemon}
          className={classes.cardImage}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary" variant="contained">
            <Link to={`/pokemon/${pokemon}`} className={classes.link}>View More</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default PokemonCard