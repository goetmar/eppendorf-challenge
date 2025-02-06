import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeviceTable } from "../components/DeviceTable";
import { Device } from "../types/types";

const mockDevices: Device[] = [
  {
    id: 0,
    location: "someLocation",
    type: "centrifuge",
    deviceHealth: 0,
    lastUsed: new Date("12/12/2020"),
    price: 10,
    color: "#FFFFFF",
  },
  {
    id: 1,
    location: "someOtherLocation",
    type: "centrifuge",
    deviceHealth: 1,
    lastUsed: new Date("12/12/2019"),
    price: 20,
    color: "#FFF000",
  },
  {
    id: 2,
    location: "someFunLocation",
    type: "shaker",
    deviceHealth: 2,
    lastUsed: new Date("12/12/2018"),
    price: 30,
    color: "#000000",
  },
];

describe("DeviceTable", () => {
  test("show placeholder when given no data", () => {
    render(<DeviceTable rows={[]} />);
    expect(screen.getByText("No Data")).toBeDefined();
  });
  test("show no placeholder row if number of rows are less than rows per page on first page", () => {
    render(<DeviceTable rows={mockDevices} />);
    expect(screen.getAllByRole("row").length).toBe(4); // 3 mock rows + 1 head row
  });
});
