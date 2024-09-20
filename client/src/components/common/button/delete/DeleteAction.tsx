interface IDeleteActionProps {
  handleCancel: () => void;
  handleDelete: () => void;
}
const DeleteAction = ({ handleCancel, handleDelete }: IDeleteActionProps) => {
  return (
    <div>
      <div className='modal-btn_container'>
        <button className='modal-btn modal-btn_cancel' onClick={handleCancel}>
          Annuler
        </button>
        <button className='modal-btn modal-btn_delete' onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default DeleteAction;
