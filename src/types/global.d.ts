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
