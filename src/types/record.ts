export interface recordInfoType {
  amount: number;
  event_date: string;
  event_id: string;
  is_attended: number;
  is_invited: number;
  name: string;
  relation: string;
  user_id: string;
  link: string;
}

export type FormValues = {
  tab: string;
  name: string;
  relation: string;
  mobileLink: string;
  date: string;
  time: string;
  attendance: boolean;
  amount: string;
};

export type PayloadType = {
  event_id?: string | undefined;
  is_invited: string;
  name: string;
  event_date: string;
  is_attended: number;
  expense: number;
  relation?: string;
  link?: string;
};

export type FocusState = {
  [key in keyof FormValues]?: boolean;
};

export type InvalidState = {
  [key in keyof FormValues]?: boolean;
};

export interface totalAmountType {
  expense_count: number;
  is_invited: string;
  total_expense: number;
}
