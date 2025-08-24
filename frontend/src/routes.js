
const routes = {
  login: () => '/api/v1/login',
  signup: () => '/api/v1/signup',
  channels: {
    allChannels: () => '/api/v1/channels',
    channelId: id => `/api/v1/channels/${id}`,
  },
  messages: {
    allMessages: () => '/api/v1/messages',

  },
}

export default routes
