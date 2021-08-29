const User = ({ loading, users, error }) => {
  if (loading) {
    return <div>User Loading...</div>;
  }

  if (error) {
    return <div>Error on User</div>;
  }

  return (
    <div>
      <ul>
        {users && users.map((user) => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
};

export default User;
