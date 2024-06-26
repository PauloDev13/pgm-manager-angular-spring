export type TSearchQuery = {
  query: string;
  status: boolean;
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

export type TDataSnackbar = {
  displayMsg: string;
  cssType: 'delete-snackbar' | 'finish-snackbar';
};
