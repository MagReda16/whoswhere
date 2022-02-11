import UserInfo from './UserInfo';

const UserList = ({ data }) => {
  return (
    <div>
      {data &&
        data.members.map((user) => {
          return <UserInfo key={user._id} user={user} />;
        })}
    </div>
  )
}

export default UserList;