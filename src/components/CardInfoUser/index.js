import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
    root: {
        width: '37em',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            flex: 'auto',
        },
        [theme.breakpoints.down('md')]: {
            marginBottom: '0.8em'
        }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function CardInfoUser() {
    const classes = useStyles();
    const infoUser = useSelector(state => state.userReducer.user.data)
    return (
        <Card className={classes.root} elevation={3}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Nome do usuário
                </Typography>
                <Typography variant="h5" component="h2">
                    {infoUser.name}
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Email
                </Typography>
                <Typography variant="body2" component="p">
                    {infoUser.email}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Grupo do usuário
                </Typography>
                <Typography variant="h5" component="h2">
                    {infoUser.userGroup[0].name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}