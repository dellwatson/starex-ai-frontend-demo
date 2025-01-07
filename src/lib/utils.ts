import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}

// utils.js

export const formatViewCount = (count) => {
  const num = Number(count);
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k";
  }
  return count; // Return original if less than 1k
};

export const formatPublishedDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const intervalCount = Math.floor(seconds / interval.seconds);
    if (intervalCount > 0) {
      return `${intervalCount} ${interval.label}${
        intervalCount > 1 ? "s" : ""
      } ago`;
    }
  }

  return "just now"; // For very recent posts
};

export function shortenEthAddress(address) {
  if (!address.startsWith("0x")) {
    throw new Error("Invalid Ethereum address");
  }

  if (address.length === 42) {
    return address.substring(0, 8) + "..." + address.substring(38);
  } else if (address.length === 65 || address.length === 66) {
    return (
      address.substring(0, 8) + "..." + address.substring(address.length - 8)
    );
  } else {
    return "Invalid Address";
  }
}
export function shortenEthAddressMobile(address) {
  if (!address.startsWith("0x")) {
    throw new Error("Invalid Ethereum address");
  }

  if (address.length === 42) {
    return address.substring(0, 8) + "...";
  } else if (address.length === 65 || address.length === 66) {
    return address.substring(0, 8) + "...";
  } else {
    return "Invalid Address";
  }
}

export function shortenString(inputString, maxLength) {
  if (inputString.length <= maxLength) {
    return inputString;
  } else {
    return inputString.substring(0, maxLength);
  }
}

export function getDisplayName(username = "", maxLength = 20) {
  if (!username) {
    return "Unknown";
  }

  if (username.startsWith("0x")) {
    return shortenEthAddress(username);
  }

  return shortenString(username, maxLength);
}

export const extractUsername = (username) => {
  return username.startsWith("@") ? username.slice(1) : username;
};

export const GravatarUrl = (eth_address = "", png = true) =>
  `https://effigy.im/a/${eth_address}.${png ? "png" : "svg"}`;
