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
