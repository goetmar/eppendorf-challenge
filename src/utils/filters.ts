import { Device } from "../types/types";

// TODO potentially use these to implement filters for the data table later on
function composeExactMatchFilter(key: keyof Device) {
  return (devices: Device[], value: string) => {
    return devices.filter((device) => {
      return device[key].toString() === value;
    });
  };
}

export const filterType = composeExactMatchFilter("type");
export const filterHealth = composeExactMatchFilter("deviceHealth");
export const filterColor = composeExactMatchFilter("color");
export const filterPrice = (
  devices: Device[],
  minValue: number,
  maxValue: number
) => {
  return devices.filter((device) => {
    return device["price"] >= minValue && device["price"] <= maxValue;
  });
};
export const filterDate = (devices: Device[], minDate: Date, maxDate: Date) => {
  return devices.filter((device) => {
    return device["lastUsed"] >= minDate && device["lastUsed"] <= maxDate;
  });
};
export const filterLocation = (devices: Device[], value: string) => {
  return devices.filter((device) => {
    return device["location"].includes(value);
  });
};
