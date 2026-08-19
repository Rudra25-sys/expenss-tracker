import "./styles/Profile.css";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!user) {
    return (
      <div>
        <h2>Profile</h2>
        <p>No user logged in.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Profile</h2>

      <p>
        Name: {user.username}
      </p>

      <p>
        Email: {user.email}
      </p>
    </div>
  );
}

export default Profile;