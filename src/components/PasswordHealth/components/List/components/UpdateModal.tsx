import { FC, useState } from "react";
import Modal from 'react-modal';
import { useItemsContext } from "~/components/ItemsContext";
import updateItem from "~/services/updateItem";
import { IItem } from "~/services/getUserItems";

interface IUpdateModal {
  item: IItem;
}

const UpdateModal: FC<IUpdateModal> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState('');
  const { refetch } = useItemsContext();

  const closeModal = () => {
    setNewPass('');
    setShowModal(false);
  }

  const handleUpdate = async () => {
    await updateItem({
      ...item,
      password: newPass,
    })
    await refetch();

    closeModal();
  }

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)} data-testid="update-modal-open">
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
        appElement={document.getElementById('app')}
      >
        <h1 data-testid="update-modal-title">Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          data-testid="update-modal-password"
          onChange={(event) => setNewPass(event.target.value)}
        />
        <div className="pt-12px text-center">
          <button
            className="button"
            onClick={handleUpdate}
            data-testid="update-modal-submit"
            disabled={newPass.length <= 0}
          >
            Change
          </button>
          <button
            className="button ml-12px"
            onClick={closeModal}
            data-testid="update-modal-cancel"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default UpdateModal;