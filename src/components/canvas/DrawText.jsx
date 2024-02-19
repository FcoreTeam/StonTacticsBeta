import { memo, useEffect, useRef, useState } from "react";
import { Circle, Rect, Text, Transformer } from "react-konva";

const DrawText = ({
  element,
  i,
  id,
  isDragable,
  elements,
  setElements,
  handleObjectDragEnd,
  setSelectedTextId,
  selectedTextId,
}) => {
  const textRef = useRef(null);
  const trRef = useRef(null);
  const rectRef = useRef(null);
  const wrapperRectRef = useRef(null);

  const [transformedSize, setTransformedSize] = useState({
    width: element.width !== null ? element.width : element.text.length * 10,
    height: element.height !== null ? element.height : 70,
    rotation: element.rotation,
    x: element.x,
    y: element.y,
  });
  
  useEffect(() => {
    setTransformedSize({
      width: element.width !== null ? element.width : element.text.length * 10,
      height: element.height !== null ? element.height : 70,
      rotation: element.rotation,
      x: element.x,
      y: element.y,
    });
  }, [element]);

  
  const handleSelect = () => {
    setSelectedTextId(id);
  };
  
  useEffect(() => {
    if (selectedTextId === id) {
      trRef.current.nodes([wrapperRectRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedTextId])

  const handleChange = () => {
    const node = wrapperRectRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const rotation = node.rotation();
    const x = node.x();
    const y = node.y();
    node.scaleX(1);
    node.scaleY(1);
    rectRef.current.x(x);
    rectRef.current.y(y);
    rectRef.current.getLayer().batchDraw();
    setTransformedSize({
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: rotation,
      x: x,
      y: y,
    });
  };

  return (
    <>
      <Rect
        ref={wrapperRectRef}
        width={transformedSize.width}
        height={transformedSize.height}
        x={element.x}
        y={element.y}
        fill="#101214"
        rotation={transformedSize.rotation}
        cornerRadius={15}
        offset={{
          x: 0,
          y: 25,
        }}
        draggable={isDragable}
        onDragEnd={(e) => handleObjectDragEnd(element.id, e, "text")}
        onTransformEnd={(e) => handleObjectDragEnd(element.id, e, "text")}
        onDragMove={() => handleChange()}
        onClick={handleSelect}
        onTransform={(e) => handleChange()}
      />
      <Rect
        ref={rectRef}
        width={transformedSize.width}
        height={transformedSize.height - 20}
        x={transformedSize.x}
        y={transformedSize.y}
        rotation={transformedSize.rotation}
        fill="#22262F"
        cornerRadius={15}
        offset={{
          x: 0,
          y: 5,
        }}
      />
      <Circle
        ref={rectRef}
        // visible={false}
        radius={5}
        x={transformedSize.x}
        y={transformedSize.y}
        fill="#22262F"
        rotation={transformedSize.rotation}
        offset={{
          x: -transformedSize.width / 2,
          y: 15,
        }}
      />
      <Circle
        ref={rectRef}
        radius={5}
        x={transformedSize.x}
        y={transformedSize.y}
        fill="#22262F"
        rotation={transformedSize.rotation}
        offset={{
          x: -transformedSize.width / 2 + 15,
          y: 15,
        }}
      />
      <Circle
        ref={rectRef}
        radius={5}
        x={transformedSize.x}
        y={transformedSize.y}
        fill="#22262F"
        rotation={transformedSize.rotation}
        offset={{
          x: -transformedSize.width / 2 - 15,
          y: 15,
        }}
      />
      <Text
        key={i}
        ref={textRef}
        padding={10}
        id={element.id}
        text={element.text}
        fill={element.fill}
        width={transformedSize.width}
        height={transformedSize.height}
        x={transformedSize.x}
        y={transformedSize.y}
        rotation={transformedSize.rotation}
        offset={{
          x: 0,
          y: 0,
        }}
        fontFamily="sans-serif"
        fontSize={element.fontSize}
        perfectDrawEnabled={false}
        onDblClick={() => {
          const newTexts = [...elements];
          const index = newTexts.findIndex((item) => item.id === element.id);
          const newValue = window.prompt(
            "Enter new text value",
            element.initialText
          );
          if (newValue !== null) {
            newTexts[index] = {
              ...newTexts[index],
              text: newValue,
            };
            setElements(newTexts); // Update the state with the new texts array
          }
        }}
        onTransform={(e) => {
          handleChange();
        }}
      />
      {selectedTextId === id && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 70 || newBox.height < 40) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default memo(DrawText);
