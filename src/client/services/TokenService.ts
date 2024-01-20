/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthToken } from '../models/AuthToken';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TokenService {
    /**
     * @param formData
     * @returns AuthToken
     * @throws ApiError
     */
    public static tokenCreate(
        formData: AuthToken,
    ): CancelablePromise<AuthToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/token/',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }
}
