import './AddSectionButton.css';

interface AddButtonProps {
  action: () => void;
}

const AddButton = ({ action }: AddButtonProps) => {
  return (
    <div className='add-btn_container'>
      <img
        src='/icons/add-new.png'
        alt='Croix ajouter'
        className='add-section_img'
        onClick={action}
      />
    </div>
  );
};

export default AddButton;
