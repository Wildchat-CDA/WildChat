import './UserIcons.css';
const testUserArray = [
  {
    name: 'Bob',
  },
  {
    name: 'Julie',
  },
  { name: 'Pop' },
];

const UserIcons = ({ users = testUserArray }) => {
  return (
    <div className='users-list_container'>
      {users.map((user, index) => {
        return (
          <li key={index} className='user-icon_list'>
            <div className='user-icon_container'>
              <img
                src='/icons/utilisateur.png'
                alt='Une personne'
                className='user-icon'
              />
            </div>
            <div className='user-name'> {user.name}</div>
          </li>
        );
      })}
    </div>
  );
};

export default UserIcons;
