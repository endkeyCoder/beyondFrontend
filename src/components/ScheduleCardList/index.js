import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Card,
    CardContent,
    Typography,
    CardActions,
    BottomNavigation,
    BottomNavigationAction,
    TextField,
} from '@material-ui/core';
import { Info, LocationOn, Archive } from '@material-ui/icons';
import PropTypes from 'prop-types';

import EndSale from './EndSale';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    containerBottomNavigation: {
        flex: 1
    },
    headerCard: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    bodyInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    containerCards: {
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.up('lg')]: {
            display: 'flex',
            justifyContent: 'space-evenly'
        }
    },
    itemCard: {
        [theme.breakpoints.up('md')]: {
            width: '35em',
            marginBottom: '0.5em',
            marginRigth: '1em',
            marginTop: '0.5em'
        },
        [theme.breakpoints.down('md')]: {
            width: '100%'
        },
        marginTop: '1em',
    },
    bodyInfo2: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    }
}))

function ScheduleCard({ scheduling }) {
    const [navPanel, setNavPanel] = useState({
        index: 0,
        bgColor: '#00f'
    });

    const classes = useStyles();

    return (
        <Card variant="elevation" elevation={3} className={classes.itemCard}>
            <CardContent>
                <div className={classes.headerCard}>
                    <div>
                        <Typography variant="h5">{scheduling.client}</Typography>
                        <Typography variant="subtitle2">{`Código do agendamento: ${scheduling.cod}`}</Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Typography variant="subtitle1">{`${(scheduling.dateScheduling).split("-")[2]}/${(scheduling.dateScheduling).split("-")[1]}/${(scheduling.dateScheduling).split("-")[0]}`}</Typography>
                        <Typography variant="subtitle2">{scheduling.hourScheduling}</Typography>
                    </div>
                </div>
                <TabPanel value={navPanel.index} index={0}>
                    <div className={classes.bodyInfo}>
                        <div className={classes.bodyInfo2}>
                            <div>
                                <TextField
                                    label="Idade"
                                    value={scheduling.age}
                                    InputProps={{
                                        disableUnderline: true,
                                        disabled: true
                                    }}
                                    type="number"
                                />
                                <TextField
                                    label="Nome do conjuge"
                                    value={scheduling.spouse}
                                    InputProps={{
                                        disableUnderline: true,
                                        disabled: true
                                    }}
                                />
                                <TextField
                                    label="Idade do conjuge"
                                    value={scheduling.ageSpouse}
                                    InputProps={{
                                        disableUnderline: true,
                                        disabled: true
                                    }}
                                    type="number"
                                />
                                <TextField
                                    label="Estado Civil"
                                    value={scheduling.civilState}
                                    InputProps={{
                                        disableUnderline: true,
                                        disabled: true
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Probabilidade de venda %"
                                    value={scheduling.saleProbability}
                                    InputProps={{
                                        disableUnderline: true,
                                        disabled: true
                                    }}
                                    type="number"
                                    size="small"
                                    style={{ paddingTop: '0.7em' }}
                                />
                                <TextField
                                    label="Profissão"
                                    value={scheduling.profession}
                                    InputProps={{
                                        disableUnderline: true,
                                        disabled: true
                                    }}
                                    size="small"
                                />
                                 <TextField
                                    label="Telefone"
                                    value={scheduling.telephone}
                                    InputProps={{
                                        disableUnderline: true,
                                        disabled: true
                                    }}
                                    size="small"
                                />
                            </div>
                        </div>
                        <TextField
                            label="Observação"
                            value={scheduling.observation}
                            InputProps={{
                                disableUnderline: true,
                                disabled: true
                            }}
                            size="small"
                            multiline
                        />

                    </div>
                </TabPanel>
                <TabPanel value={navPanel.index} index={1}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <TextField
                            label="Endereço"
                            value={scheduling.address + " " + scheduling.city}
                            InputProps={{
                                disableUnderline: true,
                                disabled: true
                            }}
                            multiline
                        />
                        <a href={scheduling.linkMaps} target="_blank">
                            <TextField
                                label="Link do google maps"
                                value={scheduling.linkMaps}
                                InputProps={{
                                    disableUnderline: true,
                                    disabled: true
                                }}
                                type="url"
                                multiline
                            />
                        </a>
                    </div>
                </TabPanel>
                <TabPanel value={navPanel.index} index={2}>
                    <EndSale scheduling={scheduling} />
                </TabPanel>
            </CardContent>
            <CardActions>
                <BottomNavigation
                    showLabels
                    value={navPanel.index}
                    className={classes.containerBottomNavigation}
                    onChange={(e, newValue) => {
                        setNavPanel({
                            ...navPanel,
                            index: newValue
                        })
                    }}

                >
                    <BottomNavigationAction label="Informações" icon={<Info />} />
                    <BottomNavigationAction label="Localização" icon={<LocationOn />} />
                    <BottomNavigationAction label="Finalizar" icon={<Archive />} />
                </BottomNavigation>
            </CardActions>
        </Card>
    )
}

export default function ScheduleCardList({ schedulings }) {
    const classes = useStyles();
    if (schedulings.length > 0) {
        return (
            <div className={classes.containerCards}>
                {schedulings.map((scheduling) => <ScheduleCard key={scheduling.id} scheduling={scheduling} />)}
            </div>
        );
    } else {
        return (
            <h6>Nenhum agendamento encontrado</h6>
        )
    }

}
