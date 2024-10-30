import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRepositoriesAsync, resetList } from "../../redux/listSlice";
import { RootState } from "../../redux/store";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./List.module.scss";
import RepositoryCard from "../Card/Card";
import { TappDispatch } from "../../types";

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const RepositoryList = () => {
  const dispatch = useDispatch<TappDispatch>();
  const { items, loading, currentPage, hasMore } = useSelector(
    (state: RootState) => state.list
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastRepoRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    dispatch(
      fetchRepositoriesAsync({
        query: "javascript",
        page: currentPage,
        token: accessToken,
      })
    );

    return () => {
      dispatch(resetList());
    };
  }, [dispatch, currentPage]);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting && hasMore && !loading) {
      dispatch(
        fetchRepositoriesAsync({ query: "javascript", page: currentPage + 1 })
      );
    }
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    const currentLastRepo = lastRepoRef.current;

    if (currentLastRepo) {
      observerRef.current.observe(currentLastRepo);
    }

    return () => {
      if (observerRef.current && currentLastRepo) {
        observerRef.current.unobserve(currentLastRepo);
      }
    };
  }, [items]);

  return (
    <div className={styles.listItem}>
      {loading && <CircularProgress size={50} color="inherit" />}
      <ul>
        {items.map((repo, index) => {
          const isLastRepo = index === items.length - 1;
          return (
            <RepositoryCard
              repository={repo}
              ref={isLastRepo ? lastRepoRef : null}
            />
          );
        })}
      </ul>
      {loading && <p>Секундочку, загружаем...</p>}
    </div>
  );
};

export default RepositoryList;
