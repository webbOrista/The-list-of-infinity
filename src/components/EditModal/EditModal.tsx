import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editRepository } from "../../redux/listSlice";
import styles from "./EditModal.module.scss";

interface EditModalProps {
  repository: any;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ repository, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(repository.name);
  const [description, setDescription] = useState(repository.description);

  const handleSave = () => {
    dispatch(editRepository({ id: repository.id, name, description }));
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div>
        <h3>Редактировать</h3>
        <label>
          Название:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Описание:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={onClose}>Отменить</button>
      </div>
    </div>
  );
};

export default EditModal;
