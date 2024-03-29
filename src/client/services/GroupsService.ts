/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Group } from '../models/Group';
import type { PatchedGroup } from '../models/PatchedGroup';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GroupsService {
    /**
     * API endpoint that allows groups to be viewed or edited.
     * @returns Group
     * @throws ApiError
     */
    public static groupsList(): CancelablePromise<Array<Group>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/groups/',
        });
    }
    /**
     * API endpoint that allows groups to be viewed or edited.
     * @param requestBody
     * @returns Group
     * @throws ApiError
     */
    public static groupsCreate(
        requestBody: Group,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/groups/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows groups to be viewed or edited.
     * @param id A unique integer value identifying this group.
     * @returns Group
     * @throws ApiError
     */
    public static groupsRetrieve(
        id: number,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/groups/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * API endpoint that allows groups to be viewed or edited.
     * @param id A unique integer value identifying this group.
     * @param requestBody
     * @returns Group
     * @throws ApiError
     */
    public static groupsUpdate(
        id: number,
        requestBody: Group,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/groups/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows groups to be viewed or edited.
     * @param id A unique integer value identifying this group.
     * @param requestBody
     * @returns Group
     * @throws ApiError
     */
    public static groupsPartialUpdate(
        id: number,
        requestBody?: PatchedGroup,
    ): CancelablePromise<Group> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/groups/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows groups to be viewed or edited.
     * @param id A unique integer value identifying this group.
     * @returns void
     * @throws ApiError
     */
    public static groupsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/groups/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
