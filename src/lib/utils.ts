import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   const now = new Date();
//   const timeDifference = now.getTime() - date.getTime();
//   const seconds = Math.floor(timeDifference / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);

//   if (days > 1) {
//     return `${days} days ago`;
//   } else if (hours > 1) {
//     return `${hours} hours ago`;
//   } else if (minutes > 1) {
//     return `${minutes} minutes ago`;
//   } else {
//     const formattedDate = `${date.getFullYear()}-${String(
//       date.getMonth() + 1
//     ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
//       date.getHours()
//     ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(
//       date.getSeconds()
//     ).padStart(2, "0")}`;
//     return formattedDate;
//   }
// }

/**
 * function to convert a file to url
 * @param file
 * @returns FileUrl
 */
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

/**
 * Function to format a date
 * @param dateString
 * @returns A formatted date
 */
export const formatDate = (dateString: string = ""): string => {
  const timestampNum = Math.round(new Date(dateString).getTime() / 1000);
  const date: Date = new Date(timestampNum * 1000);
  const now: Date = new Date();

  const diff: number = now.getTime() - date.getTime();
  const diffInSeconds: number = diff / 1000;
  const diffInMinutes: number = diffInSeconds / 60;
  const diffInHours: number = diffInMinutes / 60;
  const diffInDays: number = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(dateString);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} day ago`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} hours ago`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} minutes ago`;
    default:
      return "Just now";
  }
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
