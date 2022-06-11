import { useEffect, useState } from 'react';

export type UsePromiseData<T> = {
  loading: boolean;
  error?: string;
  result?: T;
};

export function usePromise<T>(getPromise: () => Promise<T>, deps: Array<any> = []): UsePromiseData<T> {
  const [data, setData] = useState<UsePromiseData<T>>({
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    setData({
      ...data,
      loading: true,
    });

    getPromise()
      .then((result) => {
        if (isMounted) {
          setData({
            loading: false,
            result,
          });
        }
      })
      .catch((error: Error) => {
        if (isMounted) {
          setData({
            loading: false,
            error: error.message,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return data;
}
