import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import apiBeyond from '../../config/apiBeyond';
import { syncroGroups, setPermissionsGroup } from '../../config/redux/actions';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//import { Container } from './styles';

export default function UserGroupsSelect(props) {
  const dispatch = useDispatch();
  const groups = useSelector(state => state.groupsReducer.groups.data);
  const [dataUsergroup, setDataUsergroup] = useState({
    external: false
  })
  const { selectGroup } = props.stateSelectedGroup
  useEffect(() => {
    async function loadGroups() {
      try {
        if (groups[groups.length - 1].name == null) {
          const resGroups = await apiBeyond.get('getAllUserGroups');
          dispatch(syncroGroups(resGroups.data.data))
        }
      } catch (error) {
        console.log('print de erro em loadGroups UserGroupsSelect => ', error)
        alert('Problema ao carregar os grupos, atualize a página e tente novamente')
      }
    }
    loadGroups();
  })

  useEffect(() => {
    async function attUsergroup() {
      if ('id' in dataUsergroup) {
        try {
          const resUpUsergroup = await apiBeyond.put('/putUsergroup', dataUsergroup);
          if (resUpUsergroup.data.message.statusCode !== 200) {
            setDataUsergroup({
              ...dataUsergroup,
              external: !dataUsergroup.external
            })
            console.log(resUpUsergroup.data)
            alert(resUpUsergroup.data.message.observation)
          }
        } catch (error) {
          console.log('print de error em attUsergroup => ', error)
          alert('erro em attUsergroup')
        }
      }
    }
    attUsergroup();
  }, [dataUsergroup])

  function showGroups() {
    if (groups.length > 0) {
      return groups.map(group => {
        return (
          <option key={group.id} value={group.id}>{group.name}</option>
        )
      })
    } else {
      return false;
    }
  }

  async function handleSelectedGroup(groupId = null) {
    if (groupId) {
      try {
        const resPermissionsGroup = await apiBeyond.get(`/getPermissionsById/${groupId}`)
        dispatch(setPermissionsGroup(resPermissionsGroup.data))
        setDataUsergroup(resPermissionsGroup.data[0].userGroup[0])
      } catch (error) {
        console.log('print de error em handleSelectedGroup => ', error);
        alert('Problema ao selecionar as permissões do grupo')
      }
    }
  }

  const handleExternalUsergroup = async () => {
    try {
      if ('id' in dataUsergroup) {
        setDataUsergroup({
          ...dataUsergroup,
          external: !dataUsergroup.external
        })
      } else {
        console.log('não validou id')
      }
    } catch (error) {
      console.log('print de erro em handleExternalUsergroup => ', error);
      alert('estamos com problemas tecnicos')
    }
  }
  console.log('print de dataUsergroup => ', dataUsergroup)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '1em', boxShadow: '2px 3px rgba(0.0.0.0,5)' }}>
      <h3>Selecione um grupo de usuário</h3>
      <select disabled={selectGroup.disabled} onChange={(e) => handleSelectedGroup(e.target.value)} style={{ padding: "0.5em", borderRadius: '5px', outline: 0, border: '2px solid' }}>
        <option value={groups[groups.length - 1].name}></option>
        {
          showGroups()
        }
      </select>
      <FormControlLabel
        control={<Switch
          checked={dataUsergroup.external}
          onChange={handleExternalUsergroup}
        />}
        label="Externo"
      />
    </div>
  );
}
