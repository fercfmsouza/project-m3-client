import React, { useContext, useState, useEffect } from 'react';
import { api } from '../../api';
import { useParams } from 'react-router-dom';

import { useGoBack } from '../../hooks/useGoBack';
import { AuthContext } from '../../context/auth.context';

import { VictoryPie } from 'victory';

import './SettingsPage.css';

const SettingsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { goBack } = useGoBack();
  const [isEditionEnabled, setIsEditionEnabled] = useState(false);
  const [userStatistics, setUserStatistics] = useState({
    userTotalViews: 0,
    userTotalLikes: 0,
  });
  const [generalStatistics, setGeneralStatistics] = useState({
    averageViews: 0,
    averageLikes: 0,
  });

  const getUserStatistics = async () => {
    try {
      const { data } = await api.get('users/settings/statistics');
      const { averageViews, averageLikes, userTotalViews, userTotalLikes } =
        data;

      setUserStatistics({ userTotalViews, userTotalLikes });
      setGeneralStatistics({ averageViews, averageLikes });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserStatistics();
  }, []);

  async function getUser() {
    const response = await api.get(`/users/${user._id}`);

    response.data = user;
    console.log(response.data);
  }

  function toggleEditionMode() {
    setIsEditionEnabled((previousState) => !previousState);
  }

  async function handleEdition(e) {
    e.preventDefault();

    const email = e.target.email;

    try {
      const response = await api.put(`/users/${id}`, email);

      if (response.status === 200) {
        getUser();
        setIsEditionEnabled(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) return null;

  return (
    <>
      <div className='container'>
        <h1 className='title'>Settings Page</h1>
        <br />
        <div className='graph'>
          <div className='graphItem'>
            <h2>User Statistics</h2>
            <VictoryPie
              colorScale={['#f1b252', '#f9d16b']}
              data={[
                {
                  x: `Views: ${userStatistics.userTotalViews}`,
                  y: userStatistics.userTotalViews,
                },
                {
                  x: `Likes: ${userStatistics.userTotalLikes}`,
                  y: userStatistics.userTotalLikes,
                },
              ]}
              innerRadius={50}
              padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: '#fff',
                  strokeWidth: 2,
                },
                labels: {
                  fontSize: 14,
                  fill: '#333',
                },
              }}
            />
          </div>
          <div className='graphItem'>
            <h2>All Users Average Statistics</h2>
            <VictoryPie
              data={[
                {
                  x: `Views: ${generalStatistics.averageViews}`,
                  y: generalStatistics.averageViews,
                },
                {
                  x: `Likes: ${generalStatistics.averageLikes}`,
                  y: generalStatistics.averageLikes,
                },
              ]}
              innerRadius={50}
              padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
              style={{
                data: {
                  fillOpacity: 0.9,
                  stroke: '#fff',
                  strokeWidth: 2,
                },
                labels: {
                  fontSize: 14,
                  fill: '#333',
                },
              }}
            />
          </div>
        </div>

        <br />
        <button className='btn-edit' onClick={toggleEditionMode}>
          Edit
        </button>
        {isEditionEnabled && (
          <form
            className='edit-form'
            onSubmit={handleEdition}
            style={{ display: 'flex' }}
          >
            <input type='text' name='description' placeholder={user.email} />
            <button className='btn-edit'>Save</button>
          </form>
        )}
        <ul>
          <li>Edit your profile</li>
          <li>Switch theme</li>
          <li>Change language</li>
        </ul>
        <br />
        <button>Delete profile</button>
        <button onClick={goBack} className='back-button'>
          Back
        </button>
      </div>
    </>
  );
};

export default SettingsPage;
