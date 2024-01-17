/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttachNetwork } from '../models/AttachNetwork';
import type { DettachNetwork } from '../models/DettachNetwork';
import type { Machine } from '../models/Machine';
import type { PatchedMachine } from '../models/PatchedMachine';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MachinesService {
    /**
     * API endpoint that allows machines to be viewed or edited.
     * @returns Machine
     * @throws ApiError
     */
    public static machinesList(): CancelablePromise<Array<Machine>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/machines/',
        });
    }
    /**
     * API endpoint that allows machines to be viewed or edited.
     * @param requestBody
     * @returns Machine
     * @throws ApiError
     */
    public static machinesCreate(
        requestBody: Machine,
    ): CancelablePromise<Machine> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/machines/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows machines to be viewed or edited.
     * @param id A UUID string identifying this machine.
     * @returns Machine
     * @throws ApiError
     */
    public static machinesRetrieve(
        id: string,
    ): CancelablePromise<Machine> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/machines/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * API endpoint that allows machines to be viewed or edited.
     * @param id A UUID string identifying this machine.
     * @param requestBody
     * @returns Machine
     * @throws ApiError
     */
    public static machinesUpdate(
        id: string,
        requestBody: Machine,
    ): CancelablePromise<Machine> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/machines/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows machines to be viewed or edited.
     * @param id A UUID string identifying this machine.
     * @param requestBody
     * @returns Machine
     * @throws ApiError
     */
    public static machinesPartialUpdate(
        id: string,
        requestBody?: PatchedMachine,
    ): CancelablePromise<Machine> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/machines/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows machines to be viewed or edited.
     * @param id A UUID string identifying this machine.
     * @returns void
     * @throws ApiError
     */
    public static machinesDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/machines/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * API endpoint that allows machines to be viewed or edited.
     * @param id A UUID string identifying this machine.
     * @param requestBody
     * @returns AttachNetwork
     * @throws ApiError
     */
    public static machinesAttachNetworkCreate(
        id: string,
        requestBody: AttachNetwork,
    ): CancelablePromise<AttachNetwork> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/machines/{id}/attach_network/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * API endpoint that allows machines to be viewed or edited.
     * @param id A UUID string identifying this machine.
     * @param requestBody
     * @returns DettachNetwork
     * @throws ApiError
     */
    public static machinesDettachNetworkCreate(
        id: string,
        requestBody: DettachNetwork,
    ): CancelablePromise<DettachNetwork> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/machines/{id}/dettach_network/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
