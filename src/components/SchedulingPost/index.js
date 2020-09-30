import 'date-fns';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography, Paper, Select, Button, FormControl, FormHelperText } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask';
import { useSelector, useDispatch } from 'react-redux';
import { setScheduling } from '../../config/redux/actions';
import apiBeyond from '../../config/apiBeyond';

const useStyles = makeStyles((theme) => ({
    containerForm: {
        display: 'flex',
        flexDirection: 'column'
    },
    containerBody: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'baseline',
        padding: '1em',
        [theme.breakpoints.down('sm')]: {
            '& input': {
                width: '20rem'
            },
            '& select': {
                width: '20rem'
            },
            '& textarea': {
                width: '20rem'
            }
        }
    },
    containerHeader: {
        display: 'flex',
        padding: '1em'
    },
    containerFooter: {
        display: 'flex',
        padding: '0 0 1em 1em'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    autoComplete: {
        [theme.breakpoints.down('sm')]: {
            width: '100vh'
        },
        width: '15em'
    }
}))

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        />
    );
}

function TextMaskCustom2(props) {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

export default function SchedulingPost() {
    const [probability, setProbability] = useState('');
    const [dateScheduling, setDateScheduling] = useState('');
    const [hour, setHour] = useState('');
    const [city, setCity] = useState('');
    const [client, setClient] = useState('');
    const [ageClient, setAgeClient] = useState(0);
    const [civilState, setCivilState] = useState('solteiro(a)');
    const [spouse, setSpouse] = useState('');
    const [ageSpouse, setAgeSpouse] = useState(0);
    const [telephone, setTelephone] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [address, setAddress] = useState('');
    const [profession, setProfession] = useState('');
    const [referencePoint, setReferencePoint] = useState('');
    const [linkMaps, setLinkMaps] = useState('');
    const [observation, setObservation] = useState('');
    const [externalUsers, setExternalUsers] = useState({
        searches: [],
        externalSelected: {
            id: 0
        }
    })

    const dataUser = useSelector(state => state.userReducer.user.data)
    const dispatch = useDispatch();

    function handleProbability(probability) {
        setProbability(probability);
    }
    function handleDateScheduling(dateScheduling) {
        setDateScheduling(dateScheduling);
    }
    function handleHour(hour) {
        setHour(hour);
    }
    function handleCity(city) {
        setCity(city);
    }
    function handleClient(client) {
        setClient(client);
    }
    function handleAgeClient(ageClient) {
        setAgeClient(ageClient);
    }
    function handleCivilState(civilState) {
        setCivilState(civilState);
    }
    function handleSpouse(spouse) {
        setSpouse(spouse);
    }
    function handleAgeSpouse(ageSpouse) {
        setAgeSpouse(ageSpouse)
    }
    function handleTelephone(telephone) {
        setTelephone(prevState => {
            return telephone.replace(/\D/gm, '');
        });
    }
    function handleCellphone(cellphone) {
        setCellphone(cellphone.replace(/\D/gm, ''));
    }
    function handleAddress(address) {
        setAddress(address);
    }
    function handleProfession(profession) {
        setProfession(profession);
    }
    function handleReferencePoint(referencePoint) {
        setReferencePoint(referencePoint);
    }
    function handleLinkMaps(linkMaps) {
        setLinkMaps(linkMaps)
    }
    function handleObservation(observation) {
        setObservation(observation)
    }
    function handleExternalUsers(dataExternalUsers) {
        setExternalUsers({
            searches: dataExternalUsers,
            externalSelected: {
                ...externalUsers.externalSelected
            }
        })
    }
    function handleExternalUserSelected(dataExternalUser) {
        setExternalUsers({
            searches: [...externalUsers.searches],
            externalSelected: dataExternalUser
        })
    }
    async function handleSubmitScheduling(e) {
        try {
            e.preventDefault();
            const resScheduling = await apiBeyond.post('/setScheduling', {
                saleProbability: probability,
                dateScheduling,
                hourScheduling: hour,
                city,
                client,
                age: ageClient,
                civilState,
                spouse,
                ageSpouse,
                telephone,
                cellphone,
                address,
                profession,
                referencePoint,
                linkMaps,
                observation,
                userId: dataUser.id,
                externalUser: externalUsers.externalSelected.id
            })

            if (resScheduling.data.message.statusCode == 200) {
                dispatch(setScheduling(resScheduling.data.data))
                schedulingFormReset()
            }

            alert(resScheduling.data.message.observation);
        } catch (error) {
            console.log('print de error em handleSubmitScheduling => ', error);
            alert('ocorreu algum problema ao tentar gravar o agendamento')
        }

    }
    function schedulingFormReset() {
        setProbability('')
        setDateScheduling('')
        setHour('')
        setCity('')
        setClient('')
        setAgeClient(0)
        setSpouse('')
        setAgeSpouse(0)
        setTelephone('')
        setCellphone('')
        setAddress('')
        setProfession('')
        setReferencePoint('')
        setLinkMaps('')
        setObservation('')
    }
    useEffect(() => {
        async function getExternalUsers() {
            try {
                const resGetExternalUsers = await apiBeyond.get('/getExternalUsers');
                if (resGetExternalUsers.data.data.length > 0) {
                    setExternalUsers({
                        searches: resGetExternalUsers.data.data,
                        externalSelected: { ...externalUsers.externalSelected }
                    })
                }
            } catch (error) {
                console.log('print de error em getExternalUsers => ', error);
                alert('Problema ao carregar usuários externos')
            }
        }

        if (externalUsers.searches.length <= 0) {
            getExternalUsers();
        }
    })

    const classes = useStyles();
    return (
        <Paper onSubmit={handleSubmitScheduling} component='form' elevation={3} className={classes.containerForm}>
            <div className={classes.containerHeader}>
                <Typography variant='h6'>Cadastro de agendamentos</Typography>
            </div>
            <div className={classes.containerBody}>
                <TextField
                    label="Probabilidade de venda %"
                    type="number"
                    className={classes.TextField}
                    value={probability}
                    onChange={(e) => handleProbability(e.target.value)}
                    required
                />
                <TextField
                    label="Data da visita"
                    type="date"
                    className={classes.TextField}
                    InputLabelProps={{
                        shrink: true
                    }}
                    value={dateScheduling}
                    onChange={(e) => handleDateScheduling(e.target.value)}
                    required
                />
                <TextField
                    label="Hora da visita"
                    type="time"
                    className={classes.TextField}
                    InputLabelProps={{
                        shrink: true
                    }}
                    value={hour}
                    onChange={(e) => handleHour(e.target.value)}
                    required
                />
                <TextField
                    label="Cidade"
                    value={city}
                    onChange={(e) => handleCity(e.target.value)}
                    required
                />
                <TextField
                    label="Nome do cliente"
                    value={client}
                    onChange={(e) => handleClient(e.target.value)}
                    required
                />
                <TextField
                    label="Idade"
                    type="number"
                    value={ageClient}
                    onChange={(e) => handleAgeClient(e.target.value)}
                    required
                />
                <FormControl className={classes.formControl}>
                    <Select
                        native
                        value={civilState}
                        onChange={(e) => handleCivilState(e.target.value)}
                    >
                        <option value="solteiro(a)">Solteiro(a)</option>
                        <option value="casado(a)">Casado(a)</option>
                        <option value="viuvo(a)">Viúvo(a)</option>
                        <option value="divorciado(a)">Divorciado(a)</option>
                        <option value="separado(a)">Separado(a)</option>
                    </Select>
                    <FormHelperText>Estado Civil</FormHelperText>
                </FormControl>

                <TextField
                    label="Nome do conjuge"
                    value={spouse}
                    onChange={e => handleSpouse(e.target.value)}
                    required
                />
                <TextField
                    label="Idade do conjuge"
                    type="number"
                    value={ageSpouse}
                    onChange={(e) => handleAgeSpouse(e.target.value)}
                    required
                />
                <TextField
                    label="Telefone Fixo"
                    value={telephone}
                    onChange={e => handleTelephone(e.target.value)}
                    InputProps={{
                        inputComponent: TextMaskCustom
                    }}
                    required
                />
                <TextField
                    label="Telefone Celular"
                    value={cellphone}
                    onChange={e => handleCellphone(e.target.value)}
                    InputProps={{
                        inputComponent: TextMaskCustom2
                    }}
                    required
                />
                <TextField
                    label="Endereço"
                    value={address}
                    onChange={e => handleAddress(e.target.value)}
                    rowsMax={15}
                    size="large"
                    multiline
                    required
                />
                <TextField
                    label="Profissão"
                    value={profession}
                    onChange={e => handleProfession(e.target.value)}
                    required
                />
                <TextField
                    label="Ponto de referência"
                    value={referencePoint}
                    onChange={e => handleReferencePoint(e.target.value)}
                    multiline
                />
                <TextField
                    label="Link do maps"
                    value={linkMaps}
                    onChange={e => handleLinkMaps(e.target.value)}
                    type="url"
                />
                <TextField
                    label="Observação"
                    value={observation}
                    onChange={e => handleObservation(e.target.value)}
                    rowsMax={15}
                    size="medium"
                    multiline
                />
                <Autocomplete
                    options={externalUsers.searches}
                    getOptionLabel={(option) => {
                        if ('name' in option) {
                            return option.name
                        } else {
                            return false
                        }
                    }}
                    renderInput={(params) => <TextField required {...params} label="Destinatário" variant="outlined" />}
                    className={classes.autoComplete}
                    onChange={(e, value) => handleExternalUserSelected(value)}
                    noOptionsText='Nenhuma opção disponível'
                    value={externalUsers.externalSelected}
                />
            </div>
            <div className={classes.containerFooter}>
                <Button type="submit" variant="contained" color="primary" size="large" startIcon={<Save />}>
                    Salvar
                </Button>
            </div>
        </Paper>
    );
}