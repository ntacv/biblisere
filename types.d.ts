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
