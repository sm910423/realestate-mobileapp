import axios from "axios";
export const BASE_URL = "https://virtualspirit.tech/api/v1";

export function setAuthToken(accessToken, client, uid) {
  if (accessToken && client && uid) {
    axios.defaults.headers.common = {
      "access-token": accessToken,
      client: client,
      uid: uid
    };
  }
}

export function getMessages(recipientId) {
  return axios.get(`${BASE_URL}/messages/${recipientId}`);
}

export function register(name, email, password, passwordConfirmation) {
  return axios.post(`${BASE_URL}/auth`, {
    user: {
      email: email,
      name: name,
      password: password,
      password_confirmation: passwordConfirmation
    }
  });
}

/**
 * Upload a file
 *
 * @param {id of conversation} conversation_id
 * @param {message to send} content
 * @param {file to upload} file
 */
export function uploadFile(conversation_id, content, file) {
  const data = new FormData();
  data.append("message[conversation_id]", conversation_id);
  data.append("message[file]", {
    name: file.fileName,
    type: file.type,
    uri: file.uri,
    size: file.fileSize
  });

  return axios.post(`${BASE_URL}/attachments.json`, data);
}
