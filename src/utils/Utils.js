import {
  find, isArray, isObject, map, uniq,
} from 'lodash';
import axios from 'axios';
import fire from './Firebase';

const tags = [
  { id: 1, name: 'Wedding' },
  { id: 2, name: 'Birthday' },
  { id: 3, name: 'Family' },
];

export const tagById = (id) => {
  const found = find(tags, tag => tag.id === id);

  return found ? found.name : undefined;
};

export const parseErrorMessage = (error) => {
  if (error instanceof Error) {
    const errorData = error.response.data;
    if (isArray(errorData)) {
      return uniq(errorData).reduce((acc, err) => `${acc}\n${err}`, '');
    }

    if (isObject(errorData)) {
      return uniq(map(errorData, err => err))
        .reduce((acc, err) => `${acc}\n${err}`, '');
    }
  } else if (error instanceof String) {
    return error;
  }

  return 'Unexpected error has ocurred.';
};

export const persistAuthentication = (authentication) => {
  localStorage.setItem('authentication', JSON.stringify(authentication));
};

export const unpersistAuthentication = () => {
  localStorage.removeItem('authentication');
};

export const getAuthentication = () => localStorage.getItem('authentication');

export const configAxiosAuthHeader = (authToken) => {
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
};

export const registerUserFirebaseNotification = userId => ({ onChildAdded }) => {
  /* Create reference to messages in Firebase Database */
  const messagesRef = fire.database().ref().child('users').child(userId);

  messagesRef.on('child_added', (snapshot) => {
    onChildAdded({ key: snapshot.key, val: snapshot.val() });
  });
  messagesRef.on('value', spanshot => console.log(spanshot.val()));
};

export const cascaderFilter = (inputValue, path) => path.some(
  option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
);
