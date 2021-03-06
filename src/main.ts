import Vue from 'vue'
//@ts-ignore
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
//@ts-ignore
import {ACTION} from './actions';
import Buefy from 'buefy'
import '@fortawesome/fontawesome-free/js/all';
import './scss/app.scss';

Vue.use(Buefy)
Vue.use(VueMaterial)

Vue.config.productionTip = false;

const vue = new Vue({
  router,
  store,
  render: h => h(App),
});

const CLIENT_ID = '1035069854576-bf2s3p1noi2kirt512r1kr3udv4fp8ag.apps.googleusercontent.com';
const API_KEY   = 'AIzaSyA0G142xNhj0yN5NaTKoE5NGGsgVDXq6Sw';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata';

function initClient() {
  // @ts-ignore
  gapi.client.init({
    apiKey       : API_KEY,
    clientId     : CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope        : SCOPES
  }).then(function () {
    // @ts-ignore
    gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
      store.dispatch(isSignedIn ? ACTION.SIGN_IN_COMPLETED : ACTION.SIGN_OUT_COMPLETED);
    });

    // 起動時のログイン状態
    // @ts-ignore
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      if (router.currentRoute.name === 'top') {
        router.push('/list');
      }
    } else {
      router.push('/');
    }

    vue.$mount('#app');
  });
}

// @ts-ignore
gapi.load('client:auth2', initClient);
