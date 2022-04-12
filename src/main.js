import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const myTheme = {
  dark: true,
  colors: {
    primary: '#00cc00',
    secondary: '#00ff00',
  }
}

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme,
    }
  }
})

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
