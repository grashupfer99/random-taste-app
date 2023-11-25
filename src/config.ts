export const OFFICE_COORDS = {
  LAT: 37.5037655,
  LNG: 127.0234669,
};

export const DEFAULT_DISTANCE = 500;

export const CATEGORIES = {
  ALL: { label: "All", color: "primary" },
  KOREAN_FOOD: { label: "Korean Food", color: "secondary" },
  WESTERN: { label: "Western Food", color: "info" },
  CHINESE: { label: "Chinese Food", color: "success" },
  JAPANESE: { label: "Japanese Food", color: "warning" },
  FAST_FOOD: { label: "Fast Food", color: "error" },
  CAFE: { label: "Cafe", color: "accent" },
  SNACK: { label: "Snack", color: "neutral" },
  ETC: { label: "Other", color: "ghost" },
};

export const DISTANCE = [
  { label: "500m", value: 500 },
  { label: "1km", value: 1000 },
  { label: "2km or more", value: 2000 },
];

export const MAP_QUERY = {
  NAVER: "https://map.naver.com/p/search/",
  GOOGLE: "http://maps.google.com/?q=",
};

export const COLOR_MAPS = {
  primary: "badge-primary",
  secondary: "badge-secondary",
  info: "badge-info",
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
  accent: "badge-accent",
  neutral: "badge-neutral",
  ghost: "badge-ghost",
};
