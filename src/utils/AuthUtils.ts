import { MachinesService, OpenAPI } from "@/client"
import Cookies from "js-cookie"

const KEY_AUTHORIZATION = "Authorization"

export async function checkAuthorized() {
    if(!OpenAPI.HEADERS ||
        KEY_AUTHORIZATION in OpenAPI.HEADERS
    ) {
        return false
    }
    const result = await MachinesService.machinesList().then(() =>{
        return true
    }, () => {
        return false
    })
    return result
}

export async function loadFromCookie() {
    if(Cookies.get(KEY_AUTHORIZATION)) {
        OpenAPI.HEADERS = {
            [KEY_AUTHORIZATION]: "Token " + Cookies.get(KEY_AUTHORIZATION)
        }
        return true
    }
    return false
}

export async function saveToCookie(auth: string) {
    OpenAPI.HEADERS = {
        [KEY_AUTHORIZATION]: "Token " + auth
    }
    Cookies.set(KEY_AUTHORIZATION, auth, {
        // keep for 1 day
        expires: 1
    })
}