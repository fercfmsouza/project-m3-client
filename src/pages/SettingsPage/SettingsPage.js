import { useEffect, useState, useParams } from 'react';
import { api } from '../../api';
import { useGoBack } from '../../hooks/useGoBack';
import './SettingsPage.css';

const SettingsPage = () => {
  // const { id } = useParams();
  // const [user, setUser] = useState();
   const { goBack } = useGoBack();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await api.get(`/users/${id}/settings`);

  //       setUser(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  return (
    <div>
      <div>
        <h1 className='title'>Settings</h1>
      </div>
      <button onClick={goBack} className='back-button'>
        Back
      </button>
    </div>
  );
};

export default SettingsPage;
