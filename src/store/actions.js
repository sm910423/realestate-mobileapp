import axios from "axios";
import profiles from "./../shared/api-static/home_api.json"
import { NavigationActions } from "react-navigation";
import { BASE_URL } from "./../config/api";

import * as fb from "../helpers/firebase";
import * as alert from "../helpers/alert";

// Types
export const LOGGING_IN_BY_EMAIL = "LOGGING_IN_BY_EMAIL";
export const LOGGING_IN_BY_FACEBOOK = "LOGGING_IN_BY_FACEBOOK";
export const LOGGING_IN_BY_GOOGLE = "LOGGING_IN_BY_GOOGLE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SAVE_TOKENS = "SAVE_TOKENS";
export const SENDING_RESET_EMAIL = "SENDING_RESET_EMAIL";
export const SEND_RESET_EMAIL_SUCCESS = "SEND_RESET_EMAIL_SUCCESS";
export const SEND_RESET_EMAIL_FAILURE = "SEND_RESET_EMAIL_FAILURE";

export const FETCHING_CONTACTS = "FETCH_CONTACTS";
export const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS";
export const FETCHING_PROFILES = "FETCH_PROFILES";
export const FETCH_PROFILES_SUCCESS = "FETCH_PROFILES_SUCCESS";
export const SAVE_GROUPS = "SAVE_GROUPS";
export const UPDATE_GROUPS = "UPDATE_GROUPS";

// Action creators
export function loginAction(loginData) {
  return async function(dispatch) {
    if (loginData.method === 'email') {
      dispatch({ type: LOGGING_IN_BY_EMAIL });

      fb.fbEmailLogin(loginData.email, loginData.password, result => {
        if (result.status === 'success') {
          dispatch(NavigationActions.navigate({ routeName: "App" }));
          dispatch({ type: LOGIN_SUCCESS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
          dispatch({ type: SAVE_TOKENS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
        } else {
          dispatch({ type: LOGIN_FAILURE });
          alert.showErrorMessage(result.message);
        }
      });
    } else if (loginData.method === 'google') {
      dispatch({ type: LOGGING_IN_BY_GOOGLE });

      fb.fbGoogleLogin(result => {
        if (result.status === 'success') {
          dispatch(NavigationActions.navigate({ routeName: "App" }));
          dispatch({ type: LOGIN_SUCCESS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
          dispatch({ type: SAVE_TOKENS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
        } else {
          dispatch({ type: LOGIN_FAILURE });
          alert.showErrorMessage(result.message);
        }
      });
    } else if (loginData.method === 'facebook') {
      dispatch({ type: LOGGING_IN_BY_FACEBOOK });

      fb.fbFacebookLogin(result => {
        if (result.status === 'success') {
          dispatch(NavigationActions.navigate({ routeName: "App" }));
          dispatch({ type: LOGIN_SUCCESS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
          dispatch({ type: SAVE_TOKENS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
        } else {
          dispatch({ type: LOGIN_FAILURE });
          alert.showErrorMessage(result.message);
        }
      });
    }
  };
}

export function signupAction(signupData) {
  return async function(dispatch) {
    if (signupData.method === 'email') {
      dispatch({ type: LOGGING_IN_BY_EMAIL });

      fb.fbEmailSignup(signupData.email, signupData.password, signupData.firstname, signupData.lastname, result => {
        if (result.status === 'success') {
          dispatch(NavigationActions.navigate({ routeName: "App" }));
          dispatch({ type: LOGIN_SUCCESS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
          dispatch({ type: SAVE_TOKENS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
        } else {
          dispatch({ type: LOGIN_FAILURE });
          alert.showErrorMessage(result.message);
        }
      });
    } else if (signupData.method === 'google') {
      dispatch({ type: LOGGING_IN_BY_GOOGLE });

      fb.fbGoogleLogin(result => {
        if (result.status === 'success') {
          dispatch(NavigationActions.navigate({ routeName: "App" }));
          dispatch({ type: LOGIN_SUCCESS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
          dispatch({ type: SAVE_TOKENS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
        } else {
          dispatch({ type: LOGIN_FAILURE });
          alert.showErrorMessage(result.message);
        }
      });
    } else if (signupData.method === 'facebook') {
      dispatch({ type: LOGGING_IN_BY_FACEBOOK });

      fb.fbFacebookLogin(result => {
        if (result.status === 'success') {
          dispatch(NavigationActions.navigate({ routeName: "App" }));
          dispatch({ type: LOGIN_SUCCESS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
          dispatch({ type: SAVE_TOKENS, payload: { email: result.data.user.email, uid: result.data.user.uid } });
        } else {
          dispatch({ type: LOGIN_FAILURE });
          alert.showErrorMessage(result.message);
        }
      });
    }
  };
}

export function sendResetEmailAction(sendingData) {
  return async function(dispatch) {
    dispatch({ type: SENDING_RESET_EMAIL });

    fb.fbResetEmailSend(sendingData.email, result => {
      if (result.status === 'success') {
        dispatch({ type: SEND_RESET_EMAIL_SUCCESS });
        alert.showToastMessage('Please check your email.');
      } else {
        dispatch({ type: SEND_RESET_EMAIL_FAILURE });
        alert.showErrorMessage(result.message);
      }
    });
  };
}




export function fetchContactsAction() {
  return async function(dispatch) {
    dispatch({ type: FETCHING_CONTACTS });
    axios
      .get(`${BASE_URL}/contacts`)
      .then(response => {
        dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: response.data });
      })
      .catch(error => console.log(error));
  };
}

export function fetchProfilesAction(page_number) {
  return async function(dispatch) {
    dispatch({ type: FETCHING_PROFILES });
    // axios
    //   .get('/home_api.json')
    //   .then(response => {
    //     dispatch({ type: FETCH_PROFILES_SUCCESS, payload: response.data });
    //   })
    //   .catch(error => console.log(error));
    number_per_page = 4;
    dispatch({ type: FETCH_PROFILES_SUCCESS, payload: profiles.filter(profile => profile.id > page_number * number_per_page && profile.id <= (page_number + 1) * number_per_page) });
  };
}

export function navigateToGroupScreenAction() {
  return async function(dispatch) {
    dispatch(NavigationActions.navigate({ routeName: "Main" }));
  };
}

export function navigateToChatScreenAction(contact) {
  return async function(dispatch) {
    dispatch(
      NavigationActions.navigate({ routeName: "Chat", params: { contact } })
    );
  };
}

export function saveGroupsAction(groups) {
  return async function(dispatch) {
    dispatch({ type: SAVE_GROUPS, payload: groups });
  };
}

export function updateGroupsAction(groups) {
  return async function(dispatch) {
    dispatch({ type: UPDATE_GROUPS, payload: groups });
  };
}
