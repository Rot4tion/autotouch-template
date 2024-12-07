declare type Rectangle = {
  topLeft: {
    x: number;
    y: number;
  };
  topRight: {
    x: number;
    y: number;
  };
  bottomLeft: {
    x: number;
    y: number;
  };
  bottomRight: {
    x: number;
    y: number;
  };
};

declare var onStop: (error: any) => void;
declare function alert(
  message?: any,
  ...optionalParams: any[]
): void;
declare function assert(...params: any[]);
declare function dispatch_after(
  arg0: number,
  arg1: () => void
);
declare function dispatch_async_main(
  arg0: () => void
);

declare function use_jsbridge(arg0: string): any;

declare function block(
  a: string,
  callback: () => void
);
