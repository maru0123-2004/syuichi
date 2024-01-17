/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MachineTypeEnum } from './MachineTypeEnum';
export type PatchedMachine = {
    readonly id?: string;
    readonly container_id?: string;
    machine_type?: MachineTypeEnum;
    name?: string;
    description?: string;
    readonly owner?: number;
};

