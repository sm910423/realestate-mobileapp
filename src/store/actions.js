import axios from "axios";
import profiles from "./../shared/api-static/home_api.json"
import { NavigationActions } from "react-navigation";
import { BASE_URL, setAuthToken } from "./../config/api";

// Types
export const FETCHING_CONTACTS = "FETCH_CONTACTS";
export const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS";
export const FETCHING_PROFILES = "FETCH_PROFILES";
export const FETCH_PROFILES_SUCCESS = "FETCH_PROFILES_SUCCESS";
export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const SAVE_TOKENS = "SAVE_TOKENS";
export const SAVE_GROUPS = "SAVE_GROUPS";
export const UPDATE_GROUPS = "UPDATE_GROUPS";

// Action creators
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

export function loginAction(loginData) {
  return async function(dispatch) {
    dispatch({ type: LOGGING_IN });
    axios
      .post(`${BASE_URL}/auth/sign_in`, loginData)
      .then(response => {
        setAuthToken(
          response.headers["access-token"],
          response.headers["client"],
          response.data.data.uid
        );
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.data });
        dispatch({
          type: SAVE_TOKENS,
          payload: {
            accessToken: response.headers["access-token"],
            client: response.headers["client"],
            uid: response.data.data.uid
          }
        });
        dispatch(NavigationActions.navigate({ routeName: "App" }));
      })
      .catch(error => console.log(error));
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
