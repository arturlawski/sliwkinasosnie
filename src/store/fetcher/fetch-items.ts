import useSWR from "swr";

const fetcher = async (uri: string) => {
  const response = await fetch(uri);
  const responseData = await response.json();
  if (!response.ok) {
    // Make SWR catch the failed response.
    throw new Error(responseData.message);
  }
  return responseData;
};

type revalidateOptions = {
  revalidateOnFocus: boolean;
  revalidateIfStale: boolean;
  revalidateOnReconnect: boolean;
};

export default function FetchItems<T>(
  uri: string,
  arr: T[],
  options: revalidateOptions
): {
  items: T[];
  isLoading: false;
  isError: Error | undefined;
} {
  const { data, error } = useSWR<T[], Error>(uri, fetcher, options);
  console.log(uri,"uri");
  arr = data ? data : arr;
  console.log(arr,"arr");
  console.log(error,"error");

  return {
    items: arr,
    isLoading: !error && !data, // There is no error and data is still being fetched.
    isError: error,
  };
}
