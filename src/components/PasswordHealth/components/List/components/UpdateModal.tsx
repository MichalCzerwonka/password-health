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
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)}
        />
        <div className="pt-12px text-center">
          <button className="button" onClick={handleUpdate}>Change
          </button>
          <button className="button ml-12px" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}

export default UpdateModal;