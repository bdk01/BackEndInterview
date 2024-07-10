import logger from "pino";
import dayjs from "dayjs";

const log = logger({
 level: process.env.PINO_LOG_LEVEL || 'info',
base: {
    pid: false,
  },
   transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
