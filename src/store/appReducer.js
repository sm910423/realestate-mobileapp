import {
  LOGGING_IN_BY_EMAIL,
  LOGGING_IN_BY_FACEBOOK,
  LOGGING_IN_BY_GOOGLE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SAVE_TOKENS,
  SENDING_RESET_EMAIL,
  SEND_RESET_EMAIL_SUCCESS,
  SEND_RESET_EMAIL_FAILURE,
  FETCHING_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCHING_PROFILES,
  FETCH_PROFILES_SUCCESS,
  SAVE_GROUPS,
  UPDATE_GROUPS,
} from "./actions";

const initialState = {
  loadingEmail: false,
  loadingFacebook: false,
  loadingFacebook: false,
  userid: "",
  loadingCode: false,
  contacts: [],
  isFetchingContacts: false,
  profiles: [],
  isFetchingProfiles: false,
  isFetchingGroups: true,
  user: {},
  groups: [],
};

export default function appReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOGGING_IN_BY_EMAIL:
      newState = { ...state, loadingEmail: true}
      break;
    case LOGGING_IN_BY_FACEBOOK:
      newState = { ...state, loadingFacebook: true}
      break;
    case LOGGING_IN_BY_GOOGLE:
      newState = { ...state, loadingGoogle: true}
      break;
    case LOGIN_SUCCESS:
      newState = { ...state, userid: action.payload.uid, loadingEmail: false, loadingGoogle: false, loadingFacebook: false };
      break;
    case LOGIN_FAILURE:
      newState = { ...state, loadingEmail: false, loadingGoogle: false, loadingFacebook: false };
      break;
    case SAVE_TOKENS:
      newState = { ...state, email: action.payload.email, uid: action.payload.uid };
      break;
    case SENDING_RESET_EMAIL:
      newState = { ...state, loadingCode: true };
      break;
    case SEND_RESET_EMAIL_SUCCESS:
      newState = { ...state, loadingCode: false };
      break;
    case SEND_RESET_EMAIL_FAILURE:
      newState = { ...state, loadingCode: false };
      break;
    case FETCHING_CONTACTS:
      newState = { ...state, isFetchingContacts: true };
      break;
    case FETCH_CONTACTS_SUCCESS:
      newState = {
        ...state,
        contacts: action.payload,
        isFetchingContacts: false
      };
      break;
    case FETCHING_PROFILES:
      newState = { ...state, isFetchingProfiles: true };
      break;
    case FETCH_PROFILES_SUCCESS:
      newState = {
        ...state,
        profiles: action.payload,
        isFetchingProfiles: false
      };
      break;
    case SAVE_GROUPS:
      newState = {
        ...state,
        groups: action.payload,
        isFetchingGroups: false
      };
      break;
    case UPDATE_GROUPS:
      console.log(state.groups);
      newState = {
        ...state,
        groups: updateObjectInArray(state.groups, action.payload),
        isFetchingGroups: false
      };
      console.log(newState.groups);
      break;
    default:
      return state;
  }
  return newState || state;
}

function updateObjectInArray(prevArray, newObject) {
  // check if group is new
  const groupInArray = prevArray.find(group => group.id === newObject.id);

  // If group exists, update the array
  if (groupInArray) {
    return prevArray.map((item, index) => {
      if (item.id !== newObject.id) {
        return item;
      }

      return {
        ...item,
        ...newObject
      };
    });
  } else {
    // add to array;
    return [...prevArray, newObject];
  }
}
