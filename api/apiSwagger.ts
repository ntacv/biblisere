import { baseUrl } from 'baseurl';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';

import Logger from 'utils/Logger';

/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export const AuthParams = (store) => {
	return {
		headers: {
			Authorization: `Bearer ${store.token}`,
		},
	};
};

export interface Time {
	hours: number;
	minutes: number;
}

export interface Schedule {
	/** @example 1 */
	id: number;
	/** @example "Monday" */
	title: string;
	/** @example 1 */
	dayNumber: number;
	/** @example {"hours":18,"minutes":30} */
	closingTime: Time;
	/** @example {"hours":8,"minutes":30} */
	openingTime: Time;
	/** @format date-time */
	createdAt: string;
	/** @format date-time */
	updatedAt: string;
}

export interface Category {
	id: number;
	name: string;
}

export interface Tag {
	id: number;
	name: string;
}

export interface Book {
	id: number;
	title: string;
	description: string;
	author: string;
	pages: number;
	imageUrl: string;
	/** @format date-time */
	publicationDate: string;
	quantity: number;
	/** @format date-time */
	createdAt: string;
	/** @format date-time */
	updatedAt: string;
	categories: Category[];
	tags: Tag[];
}

export interface LoginDto {
	/** @format email */
	email: string;
	/** @minLength 4 */
	password: string;
}

export interface Login {
	access_token: string;
}

export interface CreateUserDto {
	/** @format email */
	email: string;
	/** @minLength 4 */
	password: string;
	firstName: string;
	lastName: string;
}

export interface User {
	/** @example 1 */
	id: number;
	/** @example "john@doe.com" */
	email: string;
	canBorrow: boolean;
	books: Book[];
	firstName: string | null;
	lastName: string | null;
	role: 'ADMIN' | 'CUSTOMER';
	/** @format date-time */
	createdAt: string;
	/** @format date-time */
	updatedAt: string;
}

export interface UpdateUserDto {
	/** @format email */
	email?: string;
	firstName?: string;
	lastName?: string;
	/** @minLength 8 */
	password?: string;
}

export interface CreateBookDto {
	title: string;
	author: string;
	publicationDate: any;
	description: string;
	/** @format uri */
	imageUrl: string;
	/**
	 * @min 0
	 * @exclusiveMin false
	 */
	quantity?: number;
	categories?: string[];
	tags?: string[];
}

export interface UpdateBookDto {
	title?: string;
	author?: string;
	publicationDate?: any;
	description?: string;
	/** @format uri */
	imageUrl?: string;
	/**
	 * @min 0
	 * @exclusiveMin false
	 */
	quantity?: number;
	categories?: string[];
	tags?: string[];
}

export enum Role {
	admin = 'ADMIN',
	customer = 'CUSTOMER',
}

export interface AdminUpdateUserDto {
	/** @format email */
	email?: string;
	role?: Role;
	firstName?: string;
	lastName?: string;
	canBorrow?: boolean;
}

export interface UpdateScheduleDto {
	title: string;
	dayNumber: number;
	openingTime: {
		hours: number;
		minutes: number;
	};
	closingTime: {
		hours: number;
		minutes: number;
	};
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** request cancellation token */
	cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
	securityWorker?: (
		securityData: SecurityDataType | null,
	) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = baseUrl;
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
		return keys
			.map((key) =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key),
			)
			.join('&');
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : '';
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === 'object' || typeof input === 'string')
				? JSON.stringify(input)
				: input,
		[ContentType.Text]: (input: any) =>
			input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
							? JSON.stringify(property)
							: `${property}`,
				);
				return formData;
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	};

	protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken);
			if (abortController) {
				return abortController.signal;
			}
			return void 0;
		}

		const abortController = new AbortController();
		this.abortControllers.set(cancelToken, abortController);
		return abortController.signal;
	};

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken);

		if (abortController) {
			abortController.abort();
			this.abortControllers.delete(cancelToken);
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter = this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;

		return this.customFetch(
			`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
			{
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
				},
				signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
				body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
			},
		).then(async (response) => {
			const r = response.clone() as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then((data) => {
							if (r.ok) {
								r.data = data;
							} else {
								r.error = data;
							}
							return r;
						})
						.catch((e) => {
							r.error = e;
							return r;
						});

			if (cancelToken) {
				this.abortControllers.delete(cancelToken);
			}

			if (!response.ok) throw data;
			return data;
		});
	};
}

/**
 * @title Plongeoir API
 * @version 1.0
 * @baseUrl http://localhost:8000
 * @contact
 *
 * API for the Library
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	health = {
		/**
		 * No description
		 *
		 * @tags Health
		 * @name HealthControllerCheck
		 * @summary Endpoint to check health
		 * @request GET:/health
		 */
		healthControllerCheck: (params: RequestParams = {}) =>
			this.request<
				{
					/** @example "ok" */
					status?: string;
					/** @example {"database":{"status":"up"}} */
					info?: Record<
						string,
						{
							status: string;
							[key: string]: any;
						}
					>;
					/** @example {} */
					error?: Record<
						string,
						{
							status: string;
							[key: string]: any;
						}
					>;
					/** @example {"database":{"status":"up"}} */
					details?: Record<
						string,
						{
							status: string;
							[key: string]: any;
						}
					>;
				},
				{
					/** @example "error" */
					status?: string;
					/** @example {"database":{"status":"up"}} */
					info?: Record<
						string,
						{
							status: string;
							[key: string]: any;
						}
					>;
					/** @example {"redis":{"status":"down","message":"Could not connect"}} */
					error?: Record<
						string,
						{
							status: string;
							[key: string]: any;
						}
					>;
					/** @example {"database":{"status":"up"},"redis":{"status":"down","message":"Could not connect"}} */
					details?: Record<
						string,
						{
							status: string;
							[key: string]: any;
						}
					>;
				}
			>({
				path: `/health`,
				method: 'GET',
				format: 'json',
				...params,
			}),
	};
	schedules = {
		/**
		 * No description
		 *
		 * @tags Schedules
		 * @name SchedulesControllerFindAllSchedules
		 * @summary Endpoint to retrieve schedules
		 * @request GET:/schedules
		 */
		schedulesControllerFindAllSchedules: (params: RequestParams = {}) =>
			this.request<Schedule[], void>({
				path: `/schedules`,
				method: 'GET',
				format: 'json',
				...params,
			}),
	};
	books = {
		/**
		 * No description
		 *
		 * @tags Books
		 * @name BooksControllerFindAll
		 * @summary Endpoint to retrieve a list of books
		 * @request GET:/books
		 */
		booksControllerFindAll: (
			query?: {
				categories?: string;
				q?: string;
				sort?: 'title' | 'author' | 'pages' | 'publicationDate' | 'id' | 'quantity' | 'updatedAt';
				order?: 'asc' | 'desc';
			},
			params: RequestParams = {},
		) =>
			this.request<Book[], void>({
				path: `/books`,
				method: 'GET',
				query: query,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Books
		 * @name BooksControllerFindOne
		 * @summary Endpoint to retrieve a book
		 * @request GET:/books/{id}
		 */
		booksControllerFindOne: (id: any, params: RequestParams = {}) =>
			this.request<Book, void>({
				path: `/books/${id}`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Books
		 * @name BooksControllerBorrow
		 * @summary Endpoint to borrow a book
		 * @request POST:/books/{id}/borrow
		 * @secure
		 */
		booksControllerBorrow: (id: any, params: RequestParams = {}) =>
			this.request<void, void>({
				path: `/books/${id}/borrow`,
				method: 'POST',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Books
		 * @name BooksControllerReturn
		 * @summary Endpoint to return a book
		 * @request POST:/books/{id}/return
		 * @secure
		 */
		booksControllerReturn: (id: any, params: RequestParams = {}) =>
			this.request<void, void>({
				path: `/books/${id}/return`,
				method: 'POST',
				secure: true,
				...params,
			}),
	};
	login = {
		/**
		 * No description
		 *
		 * @tags Authentication
		 * @name AuthControllerLogin
		 * @summary Endpoint for login
		 * @request POST:/login
		 */
		authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
			this.request<Login, void>({
				path: `/login`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),
	};
	users = {
		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerCreate
		 * @summary Endpoint to create a new user
		 * @request POST:/users
		 */
		usersControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
			this.request<User, void>({
				path: `/users`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerGetMe
		 * @summary Endpoint to get the current user
		 * @request GET:/users/me
		 * @secure
		 */
		usersControllerGetMe: (params: RequestParams = {}) =>
			this.request<User, void>({
				path: `/users/me`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerUpdate
		 * @summary Endpoint to update my account
		 * @request PATCH:/users/me
		 * @secure
		 */
		usersControllerUpdate: (data: UpdateUserDto, params: RequestParams = {}) =>
			this.request<void, void>({
				path: `/users/me`,
				method: 'PATCH',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Users
		 * @name UsersControllerRemove
		 * @summary Endpoint to delete my account
		 * @request DELETE:/users/me
		 * @secure
		 */
		usersControllerRemove: (params: RequestParams = {}) =>
			this.request<void, void>({
				path: `/users/me`,
				method: 'DELETE',
				secure: true,
				...params,
			}),
	};
	admin = {
		/**
		 * No description
		 *
		 * @tags Admin
		 * @name AdminControllerCreateBook
		 * @summary Endpoint to create a book
		 * @request POST:/admin/books
		 * @secure
		 */
		adminControllerCreateBook: (data: CreateBookDto, params: RequestParams = {}) =>
			this.request<Book, void>({
				path: `/admin/books`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Admin
		 * @name AdminControllerUpdateBook
		 * @summary Endpoint to update a book
		 * @request PATCH:/admin/books/{id}
		 * @secure
		 */
		adminControllerUpdateBook: (id: any, data: UpdateBookDto, params: RequestParams = {}) =>
			this.request<void, void>({
				path: `/admin/books/${id}`,
				method: 'PATCH',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Admin
		 * @name AdminControllerDeleteBook
		 * @summary Endpoint to delete a book
		 * @request DELETE:/admin/books/{id}
		 * @secure
		 */
		adminControllerDeleteBook: (id: any, params: RequestParams = {}) =>
			this.request<void, void>({
				path: `/admin/books/${id}`,
				method: 'DELETE',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Admin
		 * @name AdminControllerFindAllUsers
		 * @summary Endpoint to retrieve a list of users
		 * @request GET:/admin/users
		 * @secure
		 */
		adminControllerFindAllUsers: (params: RequestParams = {}) =>
			this.request<User[], void>({
				path: `/admin/users`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Admin
		 * @name AdminControllerFindOneUser
		 * @summary Endpoint to retrieve a user
		 * @request GET:/admin/users/{id}
		 * @secure
		 */
		adminControllerFindOneUser: (id: any, params: RequestParams = {}) =>
			this.request<User, void>({
				path: `/admin/users/${id}`,
				method: 'GET',
				secure: true,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Admin
		 * @name AdminControllerUpdateUser
		 * @summary Endpoint to update a user
		 * @request PATCH:/admin/users/{id}
		 * @secure
		 */
		adminControllerUpdateUser: (id: any, data: AdminUpdateUserDto, params: RequestParams = {}) =>
			this.request<void, void>({
				path: `/admin/users/${id}`,
				method: 'PATCH',
				body: data,
				secure: true,
				type: ContentType.Json,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Admin
		 * @name AdminControllerDeleteUser
		 * @summary Endpoint to delete a user
		 * @request DELETE:/admin/users/{id}
		 * @secure
		 */
		adminControllerDeleteUser: (id: any, params: RequestParams = {}) =>
			this.request<void, void>({
				path: `/admin/users/${id}`,
				method: 'DELETE',
				secure: true,
				...params,
			}),

		/**
		 * No description
		 *
		 * @tags Admin
		 * @name AdminControllerCreateSchedule
		 * @summary Endpoint to upsert a schedule
		 * @request POST:/admin/schedules
		 * @secure
		 */
		adminControllerCreateSchedule: (data: UpdateScheduleDto, params: RequestParams = {}) =>
			this.request<Schedule, void>({
				path: `/admin/schedules`,
				method: 'POST',
				body: data,
				secure: true,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),
	};
}

export const MAX_BOOKS = 10;
export const api = new Api();

export const userStore = {
	update: () => {
		const token = StoreUser.store.getState().token;
		api.users
			.usersControllerGetMe({
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				StoreUser.actions.setUser(response.data);
			})
			.catch((error) => {
				Logger.warn('Error fetching user data:', error);
			});
	},
};
export const bookStore = {
	update: () => {
		api.books
			.booksControllerFindAll({ sort: 'publicationDate', order: 'desc' })
			.then((response) => {
				StoreBooks.actions.setBooks(response.data);
				Logger.info('Books fetched');
			})
			.catch((error) => {
				Logger.warn('Error fetching books:', error);
			});
	},
	borrowBook: (bookId: number, update?: boolean) => {
		const token = StoreUser.store.getState().token;

		api.books
			.booksControllerBorrow(bookId, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				api.books.booksControllerFindOne(bookId).then((response) => {
					const newBook = response.data;
					StoreBooks.actions.updateBook(newBook);
					StoreUser.actions.borrowBook(newBook);
				});
			})
			.catch((error) => {
				Logger.warn('Error borrowing book:', error);
			});

		if (update) bookStore.update();
	},

	returnBook: (bookId: number, update?: boolean) => {
		const token = StoreUser.store.getState().token;

		api.books
			.booksControllerReturn(bookId, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				api.books.booksControllerFindOne(bookId).then((response) => {
					const newBook = response.data;
					StoreBooks.actions.updateBook(newBook);
					StoreUser.actions.returnBook(newBook);
				});
			})
			.catch((error) => {
				Logger.warn('Error returning book:', error);
			});
		if (update) bookStore.update();
	},

	deleteBook: (bookId: number) => {
		const token = StoreUser.store.getState().token;

		api.admin
			.adminControllerDeleteBook(bookId, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				bookStore.update();
			})
			.catch((error) => {
				Logger.warn('Error deleting book:', error);
			});
	},
};

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
