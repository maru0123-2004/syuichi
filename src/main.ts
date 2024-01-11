/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import VueKonva from 'vue-konva'

const app = createApp(App)
app.use(VueKonva)

registerPlugins(app)

app.mount('#app')
