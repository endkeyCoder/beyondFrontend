import React, { useEffect } from 'react';
import Menu from '../../components/MenuBar';
import CardInfoUser from '../../components/CardInfoUser';
import apiBeyond from '../../config/apiBeyond';
import { useDispatch, useSelector } from 'react-redux';
import { setExternalUsers } from '../../config/redux/actions';

export default function Home() {
    const dispatch = useDispatch();
    const externalUsers = useSelector(state => state.externalUsersReducer.externalUsers)

    async function loadExternalUsers() {
        try {
            const resGetExternalUsers = await apiBeyond.get('/getExternalUsers');
            if (resGetExternalUsers.data.data.length > 0) {
                dispatch(setExternalUsers(resGetExternalUsers.data.data))
            }
        } catch (error) {
            console.log('print de error em getExternalUsers => ', error);
            alert('Problema ao carregar usuários externos')
        }
    }

    useEffect(() => {
        if (externalUsers.length <= 0) {
            loadExternalUsers()
        }
    })
    console.log('print de externalUsers em Home => ', externalUsers)
    return (
        <>
            <Menu />
            <section>
                <CardInfoUser />
            </section>
        </>
    );
}
