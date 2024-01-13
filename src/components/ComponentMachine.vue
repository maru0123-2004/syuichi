<template>
    <v-group :config="{
            x: model.x,
            y: model.y,
            draggable: true
        }">
            <v-rect :config="{
                width: SIZE,
                height: SIZE,
                fill: 'black'
            }"></v-rect>
            <v-text :config="{
                x: 0,
                y: SIZE + 10,
                width: SIZE,
                text: model.id,
                align: 'center'
            }">
            </v-text>
        </v-group>
</template>

<script lang="ts" setup>
import { Machine } from '../models/Machine'

const model = defineModel({ type: Machine, required: true })

const SIZE = 50
</script>