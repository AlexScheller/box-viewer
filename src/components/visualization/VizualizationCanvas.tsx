import { useEffect, useRef } from "react";
import { TVanishingPoints } from "state/scene/typedefs";
import { TPoint } from "geometry/typedefs";
import { degreesToRadians } from "geometry/utils";
import { useSelector } from "state/utils";
import * as uiSelectors from "state/ui/selectors";
import * as sceneSelectors from "state/scene/selectors";
import styles from "./canvas.module.scss";

type TStateProps = Readonly<{
  width: number;
  height: number;
  vanishingPoints: TVanishingPoints;
}>;

type TComponentProps = TStateProps;

function clearCanvas(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function centerOrigin(ctx: CanvasRenderingContext2D) {
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
}

function prepCanvas(ctx: CanvasRenderingContext2D) {
  clearCanvas(ctx);
  centerOrigin(ctx);
}

// Move to renderer file.
function drawPoint(
  ctx: CanvasRenderingContext2D,
  reference: TPoint,
  radius: number = 2
) {
  ctx.beginPath();
  ctx.arc(reference.x, reference.y, radius, 0, degreesToRadians(360));
  ctx.closePath();
  ctx.fill();
}

function VisualizationCanvas({
  width,
  height,
  vanishingPoints,
}: TComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Prepare canvas
  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported!");
      prepCanvas(ctx);
    }
  }, []);
  // Render points
  useEffect(() => {
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) throw new Error("Canvas not supported!");
      drawPoint(ctx, vanishingPoints.vp1);
      drawPoint(ctx, vanishingPoints.vp2);
      drawPoint(ctx, vanishingPoints.vp3);
    }
  }, [vanishingPoints]);
  return (
    <canvas
      className={styles.visualization_canvas}
      ref={canvasRef}
      width={width}
      height={height}
    ></canvas>
  );
}

function ConnectedVisualizationCanvas() {
  const stateProps: TStateProps = {
    ...useSelector(uiSelectors.getCanvasDimensions),
    vanishingPoints: useSelector(sceneSelectors.getVanishingPoints),
  };
  return <VisualizationCanvas {...stateProps} />;
}

export { ConnectedVisualizationCanvas as VisualizationCanvas };
