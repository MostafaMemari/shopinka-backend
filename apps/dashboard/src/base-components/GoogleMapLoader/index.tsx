import { createRef, useEffect } from "react";
import { initializeMap, MapConfig } from "./google-map-loader";

export type Init = (
  callback: (
    mapConfig: MapConfig
  ) => ReturnType<typeof initializeMap> | undefined
) => void;

interface GoogleMapLoaderProps extends React.ComponentPropsWithoutRef<"div"> {
  init: Init;
}

function GoogleMapLoader(props: GoogleMapLoaderProps) {
  const mapRef = createRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      props.init((mapConfig) => {
        if (mapRef.current) {
          return initializeMap(mapRef.current, mapConfig);
        }
      });
    }, 1000);
  }, [props.init]);

  return <div ref={mapRef} className={props.className}></div>;
}

GoogleMapLoader.defaultProps = {
  init: () => {},
};

export default GoogleMapLoader;
