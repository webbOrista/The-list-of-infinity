import React from "react";
import { useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import { setSortOrder } from "../../redux/listSlice";
import { fetchRepositoriesAsync } from "../../redux/asyncAction";
import { AppDispatch } from "../../types";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = e.target.value;
    dispatch(setSortOrder(sortType));
    dispatch(fetchRepositoriesAsync({ query: "javascript", page: 1 }));
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <StarIcon className={styles.titleStar} />
        <h1 className={styles.title}>Звездные репозитории</h1>
        <StarIcon className={styles.titleStar} />
      </div>
      <div className={styles.sortingWrapper}>
      <label  className={styles.label}>
        Сортировать по:
        <select className={styles.select} onChange={handleSortChange}>
          <option className={styles.option} value="stars">количеству звезд</option>
          <option className={styles.option} value="updated">дате обновления</option>
        </select>
      </label>
      </div>
    </div>
  );
};

export default Header;
