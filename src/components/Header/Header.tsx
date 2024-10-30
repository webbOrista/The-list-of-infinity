import React from "react";
import { useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import { fetchRepositoriesAsync, setSortOrder } from "../../redux/listSlice";
import styles from "./Header.module.scss";
import { TappDispatch } from "../../types";

const Header: React.FC = () => {
  const dispatch = useDispatch<TappDispatch>();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = e.target.value;
    dispatch(setSortOrder(sortType));
    dispatch(fetchRepositoriesAsync({ query: "javascript", page: 1 }));
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <StarIcon className={styles.titleStar} />
        <h1 className={styles.title}>Список звезд среди репозиториев</h1>
        <StarIcon className={styles.titleStar} />
      </div>
      <label>
        Сортировать по:
        <select onChange={handleSortChange}>
          <option value="stars">количеству звезд</option>
          <option value="updated">дате обновления</option>
        </select>
      </label>
    </div>
  );
};

export default Header;
