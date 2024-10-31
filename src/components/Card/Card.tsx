import { forwardRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeRepository} from "../../redux/listSlice";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import {Repository} from "../../types"
import EditModal from "../EditModal/EditModal";
import styles from "./Card.module.scss";


interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard = forwardRef<HTMLLIElement, RepositoryCardProps>(
  ({ repository }, ref) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
      dispatch(removeRepository(repository.id));
      setIsEditing(false);
    };

    const formattedDate = format(
      new Date(repository.updated_at),
      "dd.MM.yyyy HH:mm"
    );

    return (
      <li ref={ref} key={repository.id} className={styles.card}>
        <div>
        <StarIcon/>
          <h4 className={styles.cardTitle}>{repository.name}</h4>
          <p className={styles.cardDescription}>{repository.description}</p>
          <div>
            <p className={styles.inscription}>Количество звезд:</p>
            <p className={styles.value}>{repository.stargazers_count}</p>
          </div>
          <p className={styles.inscription}>Обновлен:</p>
          <p className={styles.value}>{formattedDate}</p>
          <a href={repository.html_url} className={styles.cardLink} target="_blank">
            Перейти в репозиторий
          </a>
          <div  className={styles.buttonWrapper}>
          <button
          className={styles.cardButton}
            onClick={() => setIsEditing(true)}
            style={{ display: "flex", alignItems: "center" }}
          >
            <EditIcon style={{ marginRight: "4px" }} />
            Редактировать
          </button>
          <button
            className={styles.cardButton}
            onClick={handleDelete}
            style={{ display: "flex", alignItems: "center" }}
          >
            <DeleteIcon style={{ marginRight: "4px" }} />
            Удалить
          </button>
          </div>
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
