import { useMemo } from 'react';
import useSWR from 'swr';
const API_URL = process.env.REACT_APP_API_URL;
const accessToken = localStorage.getItem("accessToken");

const fetcher = async (key) => {
  console.log('from fetcher');
  return fetch(`${API_URL}${key}`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(r => r.json());
  // const data = await res.json();
  // return data
}

export const useTeamUsers = () => {
  // console.log(useSWR('users', fetcher), "swr user")
  const { data, error } = useSWR('users', fetcher);


  const teamAdmin = useMemo(() => {
    if (!data) return undefined;
    return data.find((user) => user.admin);
  }, [data]);

  return {
    data, error, teamAdmin
  }
}