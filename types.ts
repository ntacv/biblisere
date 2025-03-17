export const routes = {
  Homepage: undefined,
  Catalog: undefined,
  User: undefined,
} as const;

export type ApiSchedules = {
  id: number;
  title: string; //"Monday";
  dayNumber: number; //1-7
  closingTime: {
    hours: number;
    minutes: number;
  };
  openingTime: {
    hours: number;
    minutes: number;
  };
  createdAt: string; //ISO8601
  updatedAt: string;
};
