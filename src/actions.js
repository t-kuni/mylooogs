import {MUTATION} from "./mutations";
import {STATE} from "./state";
import router from './router'

export const ACTION = {
    INIT_APP: 'init_app',

    SIGN_IN: 'sign_in',
    SIGN_OUT: 'sign_out',

    SIGN_IN_COMPLETED: 'sign_in_completed',
    SIGN_OUT_COMPLETED: 'sign_out_completed',
};

export default {
    [ACTION.INIT_APP]: ({commit, getters, state, dispatch}, payload) => {

        // Client ID and API key from the Developer Console
        const CLIENT_ID = '1035069854576-bf2s3p1noi2kirt512r1kr3udv4fp8ag.apps.googleusercontent.com';
        const API_KEY = 'AIzaSyA0G142xNhj0yN5NaTKoE5NGGsgVDXq6Sw';

        // Array of API discovery doc URLs for APIs used by the quickstart
        const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

        // Authorization scopes required by the API; multiple scopes can be
        // included, separated by spaces.
        const SCOPES = 'https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata';

        /**
         *  Initializes the API client library and sets up sign-in state
         *  listeners.
         */
        function initClient() {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(function () {
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen(onUpdateSigninStatus);

                // Handle the initial sign-in state.
                onUpdateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            }, function(error) {
            });
        }

        /**
         *  Called when the signed in status changes, to update the UI
         *  appropriately. After a sign-in, the API is called.
         */
        function onUpdateSigninStatus(isSignedIn) {
            if (isSignedIn) {
                dispatch(ACTION.SIGN_IN_COMPLETED);
            } else {
                dispatch(ACTION.SIGN_OUT_COMPLETED);
            }
        }

        gapi.load('client:auth2', initClient);
    },

    [ACTION.SIGN_IN]: ({commit, getters, state}, payload) => {
        return gapi.auth2.getAuthInstance().signIn();
    },

    [ACTION.SIGN_OUT]: ({commit, getters, state}, payload) => {
        return gapi.auth2.getAuthInstance().signOut();
    },

    [ACTION.SIGN_IN_COMPLETED]: ({commit, getters, state}, payload) => {
        router.push('/list');
    },

    [ACTION.SIGN_OUT_COMPLETED]: ({commit, getters, state}, payload) => {
        router.push('/');
    },
}
