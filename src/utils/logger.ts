// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoggerFunction = (...data: any[]) => void;

export interface AppLogger {
  group: LoggerFunction;
  groupEnd: LoggerFunction;
  info: LoggerFunction;
  debug: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
}

// ----------------------------------------------------------------------

export class ProdLogger implements AppLogger {
  group(): void {}

  groupEnd(): void {}

  info(): void {}

  debug(): void {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(...data: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    console.warn(...data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(...data: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    console.error(...data);
  }
}

export class DevLogger extends ProdLogger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group(...data: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    console.group(...data);
  }

  groupEnd(): void {
    console.groupEnd();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(...data: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    console.info(...data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(...data: any[]): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    console.debug(...data);
  }
}
