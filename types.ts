export type StackParamList = {
  Homepage: undefined;
  User: undefined;
};

export type ApiHealth = {
  status: string;
  info: {
    database: {
      status: string;
    };
  };
};

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
