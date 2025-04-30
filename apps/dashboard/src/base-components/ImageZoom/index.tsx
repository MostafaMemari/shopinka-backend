import "zoom-vanilla.js/dist/zoom-vanilla.min.js";

type ImageZoomProps = React.ComponentPropsWithoutRef<"img">;

function ImageZoom(props: ImageZoomProps) {
  return <img data-action="zoom" {...props} />;
}

export default ImageZoom;
