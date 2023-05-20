import React, { useContext, useState } from 'react';
import { api } from '../../api';
import { useParams } from 'react-router-dom';

import { useGoBack } from '../../hooks/useGoBack';
import { AuthContext } from '../../context/auth.context';

import './SettingsPage.css';

const SettingsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { goBack } = useGoBack();
  const [isEditionEnabled, setIsEditionEnabled] = useState(false);

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
      <div>
        <h1>Settings Page</h1>
        <br />
        <div>
          <h3>Here display our graphs</h3>
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

// import { useEffect, useState, useParams } from 'react';
// // import { api } from '../../api';
// import { useGoBack } from '../../hooks/useGoBack';
// import './SettingsPage.css';
// import { VictoryPie, VictoryChart, VictoryBar } from 'victory';

// const SettingsPage = () => {
//   const [graph, setGraph] = useState([]);
//   const { goBack } = useGoBack();

//   useEffect(() => {
//     const graphData = data.map((item) => {
//       return {
//         x: item.username,
//         y: Number(item.views),
//       };
//     });

//     setGraph(graphData);
//   }, []);

//   return (
//     <div>
//       <div>
//         <h1 className='title'>Settings</h1>
//       </div>
//       <div>{post.views}</div>
//       <div>
//         <VictoryPie
//           data={graph}
//           innerRadius={50}
//           padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
//           style={{
//             data: {
//               fillOpacity: 0.9,
//               stroke: '#fff',
//               strokeWidth: 2,
//             },
//             labels: {
//               fontSize: 4,
//               fill: '#333',
//             },
//           }}
//         />
//       </div>
//       <div>
//         <VictoryChart>
//           <VictoryBar alignment='start' data={graph}></VictoryBar>
//         </VictoryChart>
//       </div>
//       <button onClick={goBack} className='back-button'>
//         Back
//       </button>
//     </div>
//   );
// };

// export default SettingsPage;
