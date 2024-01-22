/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Network } from '../models/Network';
import type { PatchedNetwork } from '../models/PatchedNetwork';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NetworksService {
    /**
     * API endpoint that allows networks to be viewed or edited.
     * @returns Network
     * @throws ApiError
     */
    public static networksList(): CancelablePromise<Array<Network>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/networks/',
        });
    }
    /**
     * API endpoint that allows networks to be viewed or edited.
     * @param requestBody
     * @returns Network
     * @throws ApiError
     */
    public static networksCreate(
        requestBody: Network,
    ): CancelablePromise<Network> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/networks/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows networks to be viewed or edited.
     * @param id A UUID string identifying this network.
     * @returns Network
     * @throws ApiError
     */
    public static networksRetrieve(
        id: string,
    ): CancelablePromise<Network> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/networks/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * API endpoint that allows networks to be viewed or edited.
     * @param id A UUID string identifying this network.
     * @param requestBody
     * @returns Network
     * @throws ApiError
     */
    public static networksUpdate(
        id: string,
        requestBody: Network,
    ): CancelablePromise<Network> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/networks/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows networks to be viewed or edited.
     * @param id A UUID string identifying this network.
     * @param requestBody
     * @returns Network
     * @throws ApiError
     */
    public static networksPartialUpdate(
        id: string,
        requestBody?: PatchedNetwork,
    ): CancelablePromise<Network> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/networks/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows networks to be viewed or edited.
     * @param id A UUID string identifying this network.
     * @returns void
     * @throws ApiError
     */
    public static networksDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/networks/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * API endpoint that allows networks to be viewed or edited.
     * @param id A UUID string identifying this network.
     * @returns any No response body
     * @throws ApiError
     */
    public static networksAvailableRetrieve(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/networks/{id}/available/',
            path: {
                'id': id,
            },
        });
    }
}
