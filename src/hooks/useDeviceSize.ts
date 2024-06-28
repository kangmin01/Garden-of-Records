import useMediaQuery from "@mui/material/useMediaQuery";

export default function useDeviceSize() {
  const isMobile = useMediaQuery("(min-width: 768px)");

  return { isMobile };
}
