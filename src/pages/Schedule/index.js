import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/MenuBar';
import ScheduleCardList from '../../components/ScheduleCardList';
import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import apiBeyond from '../../config/apiBeyond';

export default function Schedule() {
  const authuser = useSelector(state => state.userReducer.user.data);
  const [schedulings, setSchedulings] = useState([]);
  const [initialDate, setInitialDate] = useState(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate()}`);
  const [finalDate, setFinalDate] = useState(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate()}`);

  async function loadFirstSchedule() {
    try {
      const resSchedulings = await apiBeyond.get('/getSchedulingsbyDateRange', {
        params: {
          initialDate,
          finalDate,
          idExternalUser: authuser.id
        }
      })
      if (resSchedulings.data.message.statusCode == 200) {
        setSchedulings(resSchedulings.data.data)
      }
    } catch (error) {
      console.log('print de error em loadFirstSchedule => ', error);
      alert('Problema ao consultar agendamentos')
    }
  }

  function handleInitialDate(value) {
    setInitialDate(value)
  }
  function handleFinalDate(value) {
    setFinalDate(value)
  }

  useEffect(() => {
    loadFirstSchedule()
  }, [initialDate, finalDate])

  return (
    <div>
      <MenuBar />
      <div>
        <div>
          <h4>Agendamentos</h4>
          <TextField
            label="Data Inicial"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            value={initialDate}
            onChange={e => handleInitialDate(e.target.value)}
          />
          <TextField
            label="Data Final"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            value={finalDate}
            onChange={e => handleFinalDate(e.target.value)}
          />
        </div>
        <ScheduleCardList schedulings={schedulings} />
      </div>
    </div>
  );
}
