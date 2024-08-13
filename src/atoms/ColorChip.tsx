import { Chip, getContrastRatio } from "@mui/material";
import { ColorValueHex } from "../types/types";

export type ColorChipProps = { color: ColorValueHex; label: string };

export const ColorChip = (props: ColorChipProps) => {
  return (
    <Chip
      sx={{
        textAlign: "center",
        backgroundColor: props.color,
        minWidth: 90,
        color: getContrastRatio(props.color, "#FFF") > 3 ? "#FFF" : "#111",
      }}
      label={props.label}
    />
  );
};
