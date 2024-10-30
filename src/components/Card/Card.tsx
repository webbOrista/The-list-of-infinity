import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";

import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeRepository } from "../../redux/listSlice";
import EditModal from "../EditModal/EditModal";
import styles from "./Card.module.scss";

interface RepositoryCardProps {
  repository: any;
}

const RepositoryCard = forwardRef<HTMLLIElement, RepositoryCardProps>(
  ({ repository }, ref) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
      dispatch(removeRepository(repository.id));
      setIsEditing(false);
    };

    return (
      <li ref={ref} key={repository.id} className={styles.card}>
        <div>
          <h4>{repository.name}</h4>
          <p>{repository.description}</p>
          <button
            onClick={() => setIsEditing(true)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <EditIcon style={{ marginRight: "4px" }} />
            Редактировать
          </button>
          <button
            onClick={handleDelete}
            style={{ display: "flex", alignItems: "center" }}
          >
            <DeleteIcon style={{ marginRight: "4px" }} />
            Удалить
          </button>
        </div>
        {isEditing && (
          <EditModal
            repository={repository}
            onClose={() => setIsEditing(false)}
          />
        )}
      </li>
    );
  }
);

export default RepositoryCard;
