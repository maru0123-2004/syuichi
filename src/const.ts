import { MachineTypeEnum } from "@/client";

export const components ={
    [MachineTypeEnum.WEB]: {name: 'Web Server', icon: 'mdi-web', iconCode:0xF059F},
    [MachineTypeEnum.DNS]: {name: 'DNS Server', icon: 'mdi-domain', iconCode:0xF01D7},
    [MachineTypeEnum.SMTP]: {name: 'Mail Server', icon: 'mdi-mail', iconCode:0xF0EBB},
    'NETWORK': {name: 'Nerwork', icon: 'mdi-lan', iconCode:0xF0317}
}