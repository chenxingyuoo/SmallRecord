//vuex 日志
import createLogger from 'vuex/dist/logger';

export default process.env.NODE_ENV !== 'production'
  ? [createLogger()]
  : [];
