export const newIndexCalc = {
  "+": (x, y) => {
    return x + y;
  },
  "-": (x, y) => {
    return x - y;
  },
};

export const formatTime = (time) => {
  return `${Math.floor(time / 60)}:${("0" + Math.floor(time % 60)).slice(-2)}`;
};
