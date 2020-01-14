import {
  useNewComponent,
  useEntityName,
  Position,
  Vec2,
  useDraw,
  useUpdate,
  Pointer,
  Label,
  useType,
} from "@hex-engine/2d";
import useGameFont from "../Hooks/useGameFont";

export default function Button({
  calcPosition,
  text,
  onClick,
}: {
  calcPosition: (bounds: Vec2) => Vec2;
  text: string;
  onClick: () => void;
}) {
  useType(Button);
  useEntityName(`Button - ${text}`);

  const font = useGameFont();
  const label = useNewComponent(() => Label({ text, font }));

  const position = useNewComponent(Position);

  const padding = 3;
  function calcSize() {
    const metrics = font.measureText(label.text);
    return new Vec2(metrics.width, metrics.height).add(padding * 2);
  }
  const size = calcSize();

  const pointer = useNewComponent(() => Pointer({ bounds: size }));

  pointer.onClick(onClick);

  useUpdate(() => {
    size.replace(calcSize());
    position.replace(calcPosition(size));
  });

  useDraw((context) => {
    context.fillStyle =
      pointer.isPressing && pointer.isInsideBounds
        ? "#aaa"
        : pointer.isInsideBounds
        ? "#ddd"
        : "#eee";
    const rect = size.round();
    context.fillRect(0, 0, rect.x, rect.y);
    label.drawLabel({ context, x: padding, y: padding });
  });
}