// function Navbar({ setPage, user, setUser }) {
//   return (
//     <nav className="navbar">
//       <h1>💰 Expenss Tracker</h1>

//       <div>
//         <button onClick={() => setPage("home")}>Home</button>

//         {!user && (
//           <>
//             <button onClick={() => setPage("login")}>Login</button>
//             <button onClick={() => setPage("register")}>Register</button>
//           </>
//         )}

//         <button onClick={() => setPage("dashboard")}>Dashboard</button>
//       </div>

//       {user && (
//         <div className="user">
//           <button onClick={() => setPage("profile")}>
//             {user.name}
//           </button>

//           <button
//             onClick={() => {
//               localStorage.removeItem("user");
//               setUser(null);
//               setPage("home");
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;