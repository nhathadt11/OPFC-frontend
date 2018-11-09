import axios from 'axios';
import { map } from 'lodash';
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_CLOUD_NAME } from '../constants/AppConstants';

// Elastic search
const esAxios = axios.create({
  baseURL: process.env.REACT_APP_ES_BASE_URL,
});

const fetchMenuManyEs = (text, criteria) => {
  const matchEventTypeNames = map(criteria.eventTypeNames, e => ({ match: { eventTypeNames: e } }));
  const matchCategoryNames = map(criteria.categoryNames, c => ({ match: { categoryNames: c } })); // eslint-disable-line

  if (!text) {
    return esAxios.get('menus/_search', {
      params: {
        source: JSON.stringify({
          from: criteria.page,
          size: 20,
          query: {
            bool: {
              must: [
                ...matchEventTypeNames,
                ...matchCategoryNames,
                { range: { price: { gte: criteria.priceFrom, lte: criteria.priceTo } } },
                { range: { servingNumber: { gte: criteria.servingNumberFrom, lte: criteria.servingNumberTo } } }, // eslint-disable-line
              ],
            },
          },
        }),
        source_content_type: 'application/json',
      },
    });
  }

  return esAxios.get('menus/_search', {
    params: {
      source: JSON.stringify({
        from: criteria.page,
        size: 20,
        query: {
          bool: {
            must: [
              ...matchEventTypeNames,
              ...matchCategoryNames,
              { range: { price: { gte: criteria.priceFrom, lte: criteria.priceTo } } },
              { range: { servingNumber: { gte: criteria.servingNumberFrom, lte: criteria.servingNumberTo } } }, // eslint-disable-line
              {
                multi_match: {
                  query: text,
                  type: 'cross_fields',
                  fields: ['menuName', 'description', 'eventTypeNames', 'mealNames', 'mealDescriptions', 'categoryNames', 'brandName'],
                  operator: 'and',
                },
              },
            ],
          },
        },
      }),
      source_content_type: 'application/json',
    },
  });
};

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const createBrand = (userAndBrand) => {
  const user = {
    username: userAndBrand.username,
    password: userAndBrand.password,
    avatar: userAndBrand.avatar,
    gender: userAndBrand.gender,
    dateOfBirth: userAndBrand.dateOfBirth,
    phone: userAndBrand.privatePhone,
    email: userAndBrand.privateEmail,
    userRoleId: 2,
  };
  const brand = {
    description: userAndBrand.description,
    participantNumber: userAndBrand.participantNumber,
    city: userAndBrand.city,
    district: userAndBrand.district,
    ward: userAndBrand.ward,
    brandName: userAndBrand.brandName,
    phone: userAndBrand.publicPhone,
    email: userAndBrand.publicEmail,
    serviceLocationIds: userAndBrand.serviceLocationIds,
  };

  return axios.post('/Brand/CreateCaterer', {
    user,
    brand,
  });
};

const uploadImage = (file) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('timestamp', Date.now() / 1000);

  return fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: formData,
  }).then(response => response.json())
    .then(data => ({ data })); // match axios response schema
};

const createEvent = (userId, _event) => {
  const event = {
    event: {
      eventName: _event.eventName,
      description: _event.description,
      date: _event.date.toISOString(),
      startAt: _event.startAt.toISOString(),
      endAt: _event.endAt.toISOString(),
      budget: _event.budget,
      servingNumber: _event.servingNumber,
      cityId: _event.cityDistrict[0],
      districtId: _event.cityDistrict[1],
      address: _event.address,
      eventTypeId: _event.eventTypeId,
      categoryIds: _event.categoryIds,
      userId,
    },
  };

  return axios.post(`/Event/User/${userId}`, event);
};

const updateEvent = (userId, _event) => {
  const event = {
    event: {
      ..._event,
      eventName: _event.eventName,
      description: _event.description,
      date: _event.date.toISOString(),
      startAt: _event.startAt.toISOString(),
      endAt: _event.endAt.toISOString(),
      budget: _event.budget,
      servingNumber: _event.servingNumber,
      cityId: _event.cityDistrict[0],
      districtId: _event.cityDistrict[1],
      address: _event.address,
      eventTypeId: _event.eventTypeId,
      categoryIds: _event.categoryIds,
      userId,
      id: _event.id,
    },
  };

  return axios.put(`/Event/User/${userId}/${_event.id}`, event);
};

const fetchEventMany = () => axios.get('/Event');

const fetchEventManyByUserId = id => axios.get(`/Event/User/${id}`);

const createMeal = (meal, brandId) => {
  const toBeCreatedMeal = {
    meal,
  };

  return axios.post(`/Meal/Brand/${brandId}`, toBeCreatedMeal);
};

const updateMeal = (id, meal) => {
  const toBeUpdatedMeal = {
    meal,
  };

  return axios.put(`/Meal/${id}`, toBeUpdatedMeal);
};

const deleteMeal = id => axios.delete(`/Meal/${id}`);

const fetchMealMany = () => axios.get('/Meal');

const createMenu = (brandId, menu) => axios.post(`/Menu/Brand/${brandId}`, menu);

const updateMenu = (brandId, menuId, menu) => axios.put(`/Menu/Brand/${brandId}/${menuId}`, menu);

const deleteMenu = id => axios.delete(`/Menu/${id}`);

const createAccount = account => axios.post('/User', account);

const updateAccount = (id, account) => axios.put(`/User/${id}`, { user: { ...account } });

const loginAccount = (username, password) => axios.post('/User/Authenticate', { username, password });

const fetchEventTypeMany = () => axios.get('/EventType');

const fetchCategoryMany = () => axios.get('/Category');

const fetchBrandDetail = id => axios.get(`/Brand/${id}`);

const fetchBrandMenuMany = id => axios.get(`/Menu/Brand/${id}`);

const fetchBrandMealMany = id => axios.get(`/Meal/Brand/${id}`);

const fetchCityMany = () => axios.get('/City');

const fetchDistrictMany = () => axios.get('/District');

const fetchMenuManyAndLimit = () => axios.get('/Menu/Limit');

const fetchMenuDetail = id => axios.get(`/Menu/${id}`);

const createOrder = (userId, eventId, menuIds) => axios.post('/Paypal/CreatePayment', {
  userId,
  eventId,
  requestMenuList: map(menuIds, m => ({ menuId: m, quantity: 1, note: 'Menu note content' })),
});

const fetchMenuRatingMany = menuId => axios.get(`/Rating/Menu/${menuId}`);

const createMenuRating = (menuId, userId, rating) => axios.post(`/Rating/Menu/${menuId}/User/${userId}`, rating);

const fetchOrderMany = brandId => axios.get(`/Order/Brand/${brandId}`);

const fetchEventPlannerOrderMany = userId => axios.get(`/Order/EventPlanner/User/${userId}`);

const fetchEventPlannerDetail = orderId => axios.get(`/Order/EventPlanner/${orderId}`);

const fetchSuggestedMenuMany = (userId, eventId) => axios.get(`/Event/GetSuggestion/${eventId}`);

const bookmark = (userId, menuId) => axios.post(`/BookMark/User/${userId}/Menu/${menuId}`);

const cancelBrandOrder = orderLineId => axios.post(`/Paypal/Refund/${orderLineId}`);

const approveBrandOrder = orderLineId => axios.post(`/Order/Brand/Approve/${orderLineId}`);

const markAsCompleted = orderLineId => axios.post(`/Order/MarkAsCompleted/${orderLineId}`);

const fetchEventDetail = eventId => axios.get(`/Event/${eventId}`);

export default {
  createBrand,
  uploadImage,
  createEvent,
  updateEvent,
  fetchEventMany,
  createMeal,
  updateMeal,
  deleteMeal,
  fetchMealMany,
  // fetchMenuMany,
  createMenu,
  updateMenu,
  deleteMenu,
  createAccount,
  updateAccount,
  loginAccount,
  fetchEventTypeMany,
  fetchCategoryMany,
  fetchEventManyByUserId,
  fetchBrandDetail,
  fetchBrandMenuMany,
  fetchBrandMealMany,
  fetchCityMany,
  fetchDistrictMany,
  fetchMenuManyAndLimit,
  fetchMenuDetail,
  createOrder,
  fetchMenuRatingMany,
  createMenuRating,
  fetchOrderMany,
  fetchEventPlannerOrderMany,
  fetchEventPlannerDetail,
  fetchSuggestedMenuMany,
  bookmark,
  cancelBrandOrder,
  approveBrandOrder,
  markAsCompleted,
  fetchEventDetail,
  // Elastic search
  fetchMenuManyEs,
};
