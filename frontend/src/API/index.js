// // api/index.js
// import api from './apiCreator';

// // Channels API
// export const channelsAPI = {
//   getAll: () => api.get('/api/v1/channels'),
//   getById: (id) => api.get(`/channels/${id}`),
//   create: (data) => api.post('/channels', data),
//   update: (id, data) => api.patch(`/channels/${id}`, data),
//   remove: (id) => api.delete(`/channels/${id}`),
// };

// // Messages API
// export const messagesAPI = {
//   getByChannel: (channelId) => api.get(`/channels/${channelId}/messages`),
//   send: (channelId, message) => api.post(`/channels/${channelId}/messages`, { message }),
//   update: (messageId, message) => api.patch(`/messages/${messageId}`, { message }),
//   remove: (messageId) => api.delete(`/messages/${messageId}`),
// };

// // Auth API
// export const authAPI = {
//   login: (credentials) => api.post('/auth/login', credentials),
//   register: (userData) => api.post('/auth/register', userData),
//   logout: () => api.post('/auth/logout'),
//   me: () => api.get('/auth/me'),
// };

// // Upload API
// export const uploadAPI = {
//   file: (formData, onUploadProgress) =>
//     api.post('/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       onUploadProgress,
//     }),
// };
