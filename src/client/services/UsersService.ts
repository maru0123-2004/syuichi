/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PatchedUser } from '../models/PatchedUser';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * API endpoint that allows users to be viewed or edited.
     * @returns User
     * @throws ApiError
     */
    public static usersList(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/',
        });
    }
    /**
     * API endpoint that allows users to be viewed or edited.
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static usersCreate(
        requestBody: User,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows users to be viewed or edited.
     * @param id A unique integer value identifying this user.
     * @returns User
     * @throws ApiError
     */
    public static usersRetrieve(
        id: number,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * API endpoint that allows users to be viewed or edited.
     * @param id A unique integer value identifying this user.
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static usersUpdate(
        id: number,
        requestBody: User,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows users to be viewed or edited.
     * @param id A unique integer value identifying this user.
     * @param requestBody
     * @returns User
     * @throws ApiError
     */
    public static usersPartialUpdate(
        id: number,
        requestBody?: PatchedUser,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows users to be viewed or edited.
     * @param id A unique integer value identifying this user.
     * @returns void
     * @throws ApiError
     */
    public static usersDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/users/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
