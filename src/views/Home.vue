<template>
<v-card title="ログイン">
    <v-form @submit="onSubmit" validate-on="blur">
        <v-card-item>
            <v-text-field 
                label="ユーザ名" 
                type="username"
                :rules="[rules.required]"
                v-model="username"
            />
            <v-text-field
                label="パスワード" 
                :type="passwdShow ? 'text' : 'password'"  
                :append-icon="passwdShow ? 'mdi-eye' : 'mdi-eye-off'" 
                @click:append="passwdShow = !passwdShow"
                :rules="[rules.required]"
                v-model="passwd"
            />
        </v-card-item>
        <v-card-actions>
            <v-btn type="submit">ログイン</v-btn>
        </v-card-actions>
    </v-form>
</v-card>
</template>

<script lang="ts" setup>
import { MachinesService, OpenAPI, TokenService } from '@/client';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { SubmitEventPromise } from 'vuetify/lib/framework.mjs';
import { loadFromCookie, saveToCookie, checkAuthorized} from '../utils/AuthUtils'

const router=useRouter()

const passwdShow = ref(false)
const username = ref("")
const passwd = ref("")

onMounted(async ()=>{
    // if ("Authorization" in (OpenAPI.HEADERS??{})){
    //     if(OpenAPI.HEADERS??{Authorization:''}.Authorization){
    //         router.push("Workspace")
    //     }
    // }
    if(await loadFromCookie() && await checkAuthorized()) {
        return router.push("Workspace")
    }
})

const rules = {
    required: (value:String) => {
        if (value) return true
        else return "入力は必須です"
    },
}

const onSubmit = async (e:SubmitEventPromise) => {
    e.preventDefault()
    if (!(await e).valid) {
        return
    }
    const token=await TokenService.tokenCreate({
        username: username.value,
        password: passwd.value,
        token: crypto.randomUUID().toString()
    })
    
    saveToCookie(token.token)
    router.push("Workspace")
}
</script>