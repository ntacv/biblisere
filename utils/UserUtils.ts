export const initialUserFull = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
};
export const initialUserLogin = {
	email: '',
	password: '',
};

export const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
