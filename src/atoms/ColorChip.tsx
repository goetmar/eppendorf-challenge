import { Chip, getContrastRatio } from "@mui/material";

export const ColorChip = (props: { color: string; label: string }) => {
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
