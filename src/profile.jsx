function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}

export default Profile;