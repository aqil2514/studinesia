import dayjs from "dayjs";
import "dayjs/locale/id";

export function formatDateWithDay(dateString: string) {
  return dayjs(dateString)
    .locale("id")
    .format("dddd, DD MMMM YYYY");
}
