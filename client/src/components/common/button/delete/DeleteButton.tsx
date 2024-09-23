import './DeleteButton.css';

interface IDeleteButtonProps {
  action: () => void;
}

const DeleteButton = ({ action }: IDeleteButtonProps) => {
  return (
    <div className='delete-btn_container'>
      <span
        aria-label='Supprimer ce message'
        className='span-action delete-span'
        onClick={action}
      >
        <img
          src='/icons/bdelete.png'
          className='icon-delete'
          alt='poubelle de supression de messages'
        ></img>
      </span>
    </div>
  );
};

export default DeleteButton;
