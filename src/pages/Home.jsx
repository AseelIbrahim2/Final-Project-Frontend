// import { useContext } from 'react'
// // import { AuthContext } from '../context/AuthContext'
// import { Link } from 'react-router-dom'



// const Home = () => {
//   const { isAuthenticated, userRole, Logout, user } = useContext(AuthContext)

//   return (
  
//     <div className="home">
//       <h1>Welcome</h1>
//       {isAuthenticated ? (
//         <>
//           <p>Logged in as {user?.name} ({userRole})</p>
//           <button onClick={Logout}>Logout</button>
//           {userRole === 'admin' && (
//             <Link to="/admin">Go to Admin Dashboard</Link>
//           )}
//         </>
//       ) : (
//         <Link to="/login">Please login</Link>
//       )}
//     </div>
//   )
// }

// export default Home