export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Generate last 24 hours labels
export const last24Hours: string[] = Array.from({ length: 24 }, (_, i) => {
  const hour = new Date();
  hour.setHours(hour.getHours() - (23 - i));
  return `${hour.getHours().toString().padStart(2, "0")}:00`;
});

const generateSmoothData = (
  length: number,
  min: number,
  max: number,
  start?: number
) => {
  const data: number[] = [];
  let base = start ?? Math.floor((min + max) / 2);
  for (let i = 0; i < length; i++) {
    base += Math.floor(Math.random() * 5) - 2;
    if (base < min) base = min;
    if (base > max) base = max;
    data.push(base);
  }
  return data;
};

// 24h activity data
export const hourlyActiveLogins: number[] = generateSmoothData(24, 20, 80, 50);

// Other data (simulate growth or natural variations)
export const uniqueVisitors: number[] = generateSmoothData(12, 100, 1200, 150);
export const trialSignups: number[] = generateSmoothData(12, 1, 90, 5);
export const trialSignupConvRate: number[] = generateSmoothData(
  12,
  0.005,
  0.08,
  0.01
).map((v) => parseFloat(v.toFixed(4)));
export const paidSubscriptions: number[] = generateSmoothData(12, 0, 20, 1);
export const newMRR = [14, 0, 0, 0, 0, 0, 39, 76, 129, 196, 265, 356];

export const currentMRR = [
  116, 116, 116, 116, 116, 191, 230, 306, 435, 632, 897, 1253,
];

export const currentARR = [
  1392, 1392, 1392, 1392, 1392, 2292, 2764, 3671, 5221, 7578, 10758, 15036,
];
