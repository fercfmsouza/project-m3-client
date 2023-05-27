import React, { useContext, useState, useEffect } from 'react';
import { api } from '../../api';
import { useParams, Link } from 'react-router-dom';

import { useGoBack } from '../../hooks/useGoBack';
import { AuthContext } from '../../context/auth.context';

import { VictoryPie } from 'victory';

import './SettingsPage.css';

const SettingsPage = () => {
  const { id } = useParams();
  const { user, logOutUser } = useContext(AuthContext);
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
  const [profileUser, setProfileUser] = useState({});

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

  async function getUser() {
    try {
      const { response } = await api.get(`/users/${user._id}`);
      const { email, image, likedPosts } = response;

      console.log(response)
  
      setProfileUser({ email, likedPosts });
      console.log(response); 
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getUserStatistics();
    getUser();
  }, []);


  function toggleEditionMode() {
    setIsEditionEnabled((previousState) => !previousState);
  }

  async function handleEdition(e) {
    e.preventDefault();

    const email = e.target.value;
    
    try {
      const response = await api.put(`/users/${id}`, email);
      if (response.status === 200) {

        setIsEditionEnabled(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) return null;

  return (
    <>
      <div className='settings-intro'>
        <h1 className='title'>Settings</h1>
        <img
              className='back'
              onClick={goBack}
              src='../../../goback-arrow.svg'
              alt='back-arrow'
            />
      </div>

      <div className='settings-container'>
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

        <div className='settings-edition'>
          <button className='btn-edit' onClick={toggleEditionMode}>
            Edit your profile
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
            <li>Switch theme</li>
            <li>Change language</li>
          </ul>
        </div>

        <div className='settings-liked'>
          <h2>Liked posts</h2>
          {user.likedPosts && <p>{user.likedPosts[0].description}</p>
          }
        </div>

      </div>

      <div className='settings-delete'>
        <button className='btn-delete' onClick={logOutUser}>Delete profile</button>
      </div>
    </>
  );
};

export default SettingsPage;
