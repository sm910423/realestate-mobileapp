import {
  LOGGING_IN,
  LOGIN_SUCCESS,
  FETCHING_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCHING_PROFILES,
  FETCH_PROFILES_SUCCESS,
  SAVE_TOKENS,
  SAVE_GROUPS,
  UPDATE_GROUPS
} from "./actions";

const initialState = {
  contacts: [],
  isFetchingContacts: false,
  profiles: [],
  isFetchingProfiles: false,
  isFetchingGroups: true,
  accessToken: "",
  client: "",
  uid: "",
  user: {},
  groups: []
};

export default function appReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
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
    case LOGGING_IN:
      break;
    case LOGIN_SUCCESS:
      newState = { ...state, user: action.payload };
      break;
    case SAVE_TOKENS:
      newState = {
        ...state,
        accessToken: action.payload.accessToken,
        client: action.payload.client,
        uid: action.payload.uid
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
