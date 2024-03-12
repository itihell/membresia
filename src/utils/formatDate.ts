//import * as dayjs from "dayjs";
import dayjs from "dayjs";

export const formatDate = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const formatDateTime = (date: string) => {
  return dayjs(date).format("DD-MM-YYYY HH:mm:ss ");
};
