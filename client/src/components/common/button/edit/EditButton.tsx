import './EditButton.css';

interface IEditButtonProps {
  action: () => void;
}

const EditButton = ({ action }: IEditButtonProps) => {
  return (
    <div className='edit-btn_container'>
      <img
        src='/icons/ecrou.png'
        className='edit-btn_img'
        alt='écrou pour modifier'
        onClick={action}
      />
    </div>
  );
};

export default EditButton;
