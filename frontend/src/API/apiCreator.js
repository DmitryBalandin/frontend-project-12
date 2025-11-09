// // api/interceptors.js
// import axios from 'axios';
// // import store from '../store';
// import { logout, refreshToken, setToken } from '../slices/authSlice';
// import { setErrorNetwork, clearErrorNetwork } from '../slices/errorsNetworkSlice';
// import { setLoading, clearLoading } from '../slices/loadingSlice';

// // Создаем экземпляр axios
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Счетчик для отслеживания активных запросов
// let activeRequests = 0;

// // Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Увеличиваем счетчик активных запросов
//     activeRequests++;

//     // Показываем индикатор загрузки если это первый запрос
//     if (activeRequests === 1) {
//     //   store.dispatch(setLoading());
//     }

//     // Добавляем токен авторизации если есть
//     // const token = store.getState().auth.token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Логируем запрос в development
//     if (process.env.NODE_ENV === 'development') {
//       console.log(`🟡 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
//     }

//     return config;
//   },
//   (error) => {
//     // Уменьшаем счетчик при ошибке запроса
//     activeRequests = Math.max(0, activeRequests - 1);
//     if (activeRequests === 0) {
//     //   store.dispatch(clearLoading());
//     }

//     // store.dispatch(setErrorNetwork({ error: 'errors.requestFailed' }));
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => {
//     // Уменьшаем счетчик активных запросов
//     activeRequests = Math.max(0, activeRequests - 1);
//     if (activeRequests === 0) {
//     //   store.dispatch(clearLoading());
//     }

//     // Очищаем ошибки сети при успешном ответе
//     // store.dispatch(clearErrorNetwork());

//     // Логируем успешный ответ в development
//     if (process.env.NODE_ENV === 'development') {
//       console.log(`🟢 API Response: ${response.status} ${response.config.url}`, response.data);
//     }

//     return response;
//   },
//   async (error) => {
//     // Уменьшаем счетчик при ошибке ответа
//     activeRequests = Math.max(0, activeRequests - 1);
//     if (activeRequests === 0) {
//     //   store.dispatch(clearLoading());
//     }

//     // Логируем ошибку в development
//     if (process.env.NODE_ENV === 'development') {
//       console.log(`🔴 API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data);
//     }

//     return handleResponseError(error);
//   }
// );

// // Обработчик ошибок ответа
// const handleResponseError = async (error) => {
//   const originalRequest = error.config;

//   // Обработка сетевых ошибок
//   if (error.code === 'ERR_NETWORK') {
//     // store.dispatch(setErrorNetwork({ error: 'errors.network' }));
//     return Promise.reject(error);
//   }

//   // Обработка ошибок сервера
//   if (error.response?.status >= 500) {
//     // store.dispatch(setErrorNetwork({ error: 'errors.server' }));
//     return Promise.reject(error);
//   }

//   // Обработка 401 Unauthorized (истекший токен)
//   if (error.response?.status === 401 && !originalRequest._retry) {
//     return handleUnauthorizedError(originalRequest, error);
//   }

//   // Обработка 403 Forbidden
//   if (error.response?.status === 403) {
//     // store.dispatch(setErrorNetwork({ error: 'errors.forbidden' }));
//     return Promise.reject(error);
//   }

//   // Обработка 404 Not Found
//   if (error.response?.status === 404) {
//     // store.dispatch(setErrorNetwork({ error: 'errors.notFound' }));
//     return Promise.reject(error);
//   }

//   // Обработка других ошибок
// //   store.dispatch(setErrorNetwork({ error: 'errors.unknown' }));
//   return Promise.reject(error);
// };

// // Обработчик 401 ошибки (refresh token логика)
// const handleUnauthorizedError = async (originalRequest, error) => {
//   originalRequest._retry = true;

//   try {
//     // const refreshTokenValue = store.getState().auth.refreshToken;

//     // Делаем запрос для обновления токена
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_URL}/auth/refresh`,
//       { refreshToken: refreshTokenValue }
//     );

//     const { token: newToken, refreshToken: newRefreshToken } = response.data;

//     // Сохраняем новые токены в store
//     // store.dispatch(setToken({ token: newToken, refreshToken: newRefreshToken }));

//     // Обновляем заголовок авторизации и повторяем оригинальный запрос
//     originalRequest.headers.Authorization = `Bearer ${newToken}`;
//     return api(originalRequest);

//   } catch (refreshError) {
//     // Если refresh не удался - разлогиниваем пользователя
//     // store.dispatch(logout());
//     // store.dispatch(setErrorNetwork({ error: 'errors.sessionExpired' }));
//     return Promise.reject(refreshError);
//   }
// };

// export default api;
