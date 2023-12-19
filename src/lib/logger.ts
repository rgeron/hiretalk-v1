import { Logger } from 'tslog';
import { env } from './env';

export const logger = new Logger({
  name: 'AppLogger',
  minLevel: env.NODE_ENV === 'production' ? 3 : 0,
});
