import useMediaQuery from "@mui/material/useMediaQuery";

export default function useDeviceSize() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return { isDesktop };
}
