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

const UserIcons = ({ peerList }) => {
  return (
    <div className='users-list_container'>
      {peerList.map((el, index) => {
        return (
          <li key={index} className='user-icon_list'>
            <div className='user-icon_container'>
              <img
                src='/icons/utilisateur.png'
                alt='Une personne'
                className='user-icon'
              />
            </div>
            <div className='user-name'> {el}</div>
          </li>
        );
      })}
    </div>
  );
};

export default UserIcons;
