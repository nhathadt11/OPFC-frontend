export const FETCH_SERVICE_LOCATION_MANY_REQUEST = 'FETCH_SERVICE_LOCATION_MANY_REQUEST';
export const FETCH_SERVICE_LOCATION_MANY_SUCCESS = 'FETCH_SERVICE_LOCATION_MANY_SUCCESS';
export const FETCH_SERVICE_LOCATION_MANY_FAILURE = 'FETCH_SERVICE_LOCATION_MANY_FAILURE';

export const UPDATE_SERVICE_LOCATION_MANY_REQUEST = 'UPDATE_SERVICE_LOCATION_MANY_REQUEST';
export const UPDATE_SERVICE_LOCATION_MANY_SUCCESS = 'UPDATE_SERVICE_LOCATION_MANY_SUCCESS';
export const UPDATE_SERVICE_LOCATION_MANY_FAILURE = 'UPDATE_SERVICE_LOCATION_MANY_FAILURE';

export const UPDATE_BRAND_INFORMATION_REQUEST = 'UPDATE_BRAND_INFORMATION_REQUEST';
export const UPDATE_BRAND_INFORMATION_SUCCESS = 'UPDATE_BRAND_INFORMATION_SUCCESS';
export const UPDATE_BRAND_INFORMATION_FAILURE = 'UPDATE_BRAND_INFORMATION_FAILURE';

export const fetchServiceLocationManyRequest = () => ({
  type: FETCH_SERVICE_LOCATION_MANY_REQUEST,
});

export const fetchServiceLocationManySuccess = serviceLocationIds => ({
  type: FETCH_SERVICE_LOCATION_MANY_SUCCESS,
  payload: {
    serviceLocationIds,
  },
});

export const fetchServiceLocationManyFailure = error => ({
  type: FETCH_SERVICE_LOCATION_MANY_FAILURE,
  payload: {
    error,
  },
});

export const updateServiceLocationManyRequest = serviceLocationIds => ({
  type: UPDATE_SERVICE_LOCATION_MANY_REQUEST,
  payload: {
    serviceLocationIds,
  },
});

export const updateServiceLocationManySuccess = () => ({
  type: UPDATE_SERVICE_LOCATION_MANY_SUCCESS,
});

export const updateServiceLocationManyFailure = error => ({
  type: UPDATE_SERVICE_LOCATION_MANY_FAILURE,
  payload: {
    error,
  },
});

export const updateBrandInformationRequest = brand => ({
  type: UPDATE_BRAND_INFORMATION_REQUEST,
  payload: {
    brand,
  },
});

export const updateBrandInformationSuccess = () => ({
  type: UPDATE_BRAND_INFORMATION_SUCCESS,
});

export const updateBrandInformationFailure = error => ({
  type: UPDATE_BRAND_INFORMATION_FAILURE,
  payload: {
    error,
  },
});
