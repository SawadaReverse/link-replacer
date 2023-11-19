type LogLevel = 'DEBUG' | 'INFO' | 'ERROR';
type LogFormat = {
  level: LogLevel;
  message: string;
  processingDate: string;
};

export class Logger {
  static error(message: string) {
    const log: LogFormat = {
      level: 'ERROR',
      message,
      processingDate: new Date().toISOString(),
    };
    console.error(log);
  }

  static info(message: string) {
    const log: LogFormat = {
      level: 'INFO',
      message,
      processingDate: new Date().toISOString(),
    };
    console.info(log);
  }

  static debug(message: string) {
    const log: LogFormat = {
      level: 'DEBUG',
      message,
      processingDate: new Date().toISOString(),
    };
    console.debug(log);
  }
}
