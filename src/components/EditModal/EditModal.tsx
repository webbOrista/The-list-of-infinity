import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editRepository} from "../../redux/listSlice";
import {Repository} from "../../types";
import styles from "./EditModal.module.scss";

interface EditModalProps {
  repository: Repository ;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ repository, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(repository.name);
  const [description, setDescription] = useState(repository.description);

  const handleSave = () => {
    dispatch(editRepository({ id: repository.id, name, description: description || '' }));
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
      <div>
        <h3 className={styles.modalTitle}>Редактировать</h3>
        <label className={styles.label}>
          Название:
          <input
          className={styles.editText}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Описание:
          <textarea
          className={styles.editText}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className={styles.modalButtonWrapper}>
        <button className={styles.cardButton } onClick={handleSave}>Сохранить</button>
        <button className={styles.cardButton } onClick={onClose}>Отменить</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EditModal;
