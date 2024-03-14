export type TSearchQuery = {
  query: string;
  page: number;
  size: number;
};

export type TPageAndSize = {
  page: number;
  size: number;
};

export type TUtilState = {
  originalBadges: string[];
  availableBadges: string[];
  err: string | null;
};
