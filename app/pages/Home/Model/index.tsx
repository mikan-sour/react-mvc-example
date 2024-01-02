import React, { useEffect, useMemo, useState } from "react";
import { IHomeModel, TGenericPost } from "../types";
import { useError, useFetch } from "~/hooks";
import { getRandomValue } from "../Utils";

class BlogPost {
  id: number;
  title: string;
  userId: number;

  constructor({ id, userId, title }: TGenericPost) {
    this.id = id;
    this.userId = userId;
    this.title = title;
  }
}

export default function useHomeModel(): IHomeModel {
  const { err, handleError, ErrorComponent } = useError();
  const { get } = useFetch();

  const [results, setResults] = useState<TGenericPost>();
  const [postId, setPostId] = useState<string | number>(1);

  const handleClick = () => {
    const newId = getRandomValue(postId);
    setPostId(newId);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await get<TGenericPost>(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        if (res instanceof Error) {
          throw res;
        }
        setResults(new BlogPost(res));
      } catch (error) {
        handleError(error);
      }
    })();
  }, [postId]);

  return useMemo(() => {
    return {
      error: {
        err,
        ErrorComponent,
      },
      loading: {
        isLoading: false,
        LoadingComponent: () => <></>,
      },
      state: {
        results,
      },
      actions: {
        handleClick,
      },
    }
  }, [err, results]);
}
