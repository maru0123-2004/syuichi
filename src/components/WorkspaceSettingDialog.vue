<template>
    <v-dialog v-if="showing" v-model="showing" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ title }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                            <v-col v-for="(item, index) in items" :key="index" cols="12">
                                <v-text-field v-if="item.type == 'string'"
                                :label="item.label"
                                v-model="values[item.id]"></v-text-field>
                                <v-select v-else-if="item.type == 'enum'"
                                :items="item.enumSelects"
                                :label="item.label"
                                v-model="values[item.id]"></v-select>
                            </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn
                color="blue darken-1"
                @click="showing = false">
                    キャンセル
                </v-btn>
                <v-btn
                color="blue darken-1"
                @click="onClickOK">
                    適応
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showing = ref(false)
const title = ref("")
const items = ref<{
    label: string,
    id: string,
    type: "string" | "enum",
    enumSelects?: string[],
    defaultValue?: string
}[]>()
const values = ref<any>()
let cb: ((result: any) => void) | undefined = undefined

const onClickOK = () => {
    showing.value = false
    if(cb)
        cb(values.value)
}

const show = (_cb: (result: any) => void) => {
    showing.value = true
    cb = _cb
}

const setItems = (_items: typeof items.value) => {
    items.value = _items

    values.value = {} as any
    items.value?.forEach((item) => {
        const defaultValue = item.defaultValue ?? ""
        values.value[item.id] = defaultValue
    })
}

const setValue = (_values: any) => {
    items.value?.forEach((item) => {
        if(item.id in _values)
            values.value[item.id] = _values[item.id]
    })
}

const setTitle = (_title: string) => {
    title.value = _title
}

defineExpose({
    show,
    setItems,
    setTitle,
    setValue
})

</script>