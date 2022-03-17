import { useMemo } from "react";
import apiService from "../utils/ApiService";
import useSWR from "swr";
const API_URL = process.env.REACT_APP_API_URL;


const fetcher = async (key) => {
  const res = await fetch(`${API_URL}${key}`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  const data = await res.json();
  return data;
}

export const useTeam = () => {

  const { data, error, mutate } = useSWR("team", fetcher);

  const teamAdmin = useMemo(() => {
    if (!data) return undefined;
    return data.members.find((user) => user.admin);
  }, [data]);

  const updateTeam = async (formData) => {
    await apiService.addTask(formData)
    mutate();
  } 

  return {
    data,
    error,
    isLoading: !data && !error,
    teamAdmin,
    updateTeam
  };
};
