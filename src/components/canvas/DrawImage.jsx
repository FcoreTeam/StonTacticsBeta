import { useEffect, useRef, useState } from "react";
import { Circle, Image, Rect, Text } from "react-konva";
import { useImage } from "react-konva-utils";

import kt_u from "../../img/icons/KT_up.svg";
import kt_d from "../../img/icons/KT_down.svg";
import kt_1_u from "../../img/icons/KT_1_up.svg";
import kt_1_d from "../../img/icons/KT_1_down.svg";
import kt_2_u from "../../img/icons/KT_2_up.svg";
import kt_2_d from "../../img/icons/KT_2_down.svg";
import kt_3_u from "../../img/icons/KT_3_up.svg";
import kt_3_d from "../../img/icons/KT_3_down.svg";
import kt_4_u from "../../img/icons/KT_4_up.svg";
import kt_4_d from "../../img/icons/KT_4_down.svg";
import kt_5_u from "../../img/icons/KT_5_up.svg";
import kt_5_d from "../../img/icons/KT_5_down.svg";
import t_u from "../../img/icons/T_up.svg";
import t_d from "../../img/icons/T_down.svg";
import t_1_u from "../../img/icons/T_1_up.svg";
import t_1_d from "../../img/icons/T_1_down.svg";
import t_2_u from "../../img/icons/T_2_up.svg";
import t_2_d from "../../img/icons/T_2_down.svg";
import t_3_u from "../../img/icons/T_3_up.svg";
import t_3_d from "../../img/icons/T_3_down.svg";
import t_4_u from "../../img/icons/T_4_up.svg";
import t_4_d from "../../img/icons/T_4_down.svg";
import t_5_u from "../../img/icons/T_5_up.svg";
import t_5_d from "../../img/icons/T_5_down.svg";

const sizes = {
  warning: {
    width: 13,
    height: 13,
  },
  bomb: {
    width: 10,
    height: 15,
  },
  location: {
    width: 11,
    height: 15,
  },
  star: {
    width: 15,
    height: 15,
  },
  flag: {
    width: 11,
    height: 15,
  },
  player: {
    width: 30,
    height: 16,
  },
  flashbang: {
    width: 10,
    height: 16,
  },
  smoke: {
    width: 32,
    height: 30,
  },
  grenade: {
    width: 32,
    height: 30,
  },
  molotov: {
    width: 30,
    height: 30,
  },
};

const DrawImage = ({
  id,
  x,
  y,
  level,
  playerAttrs,
  playerColor,
  file,
  name,
  draggable,
  freezed,
  videoId,
  tierId,
  fromId,
  playerId,
  count,
  bombToTie,
  onClick = null,
  onDragMove,
  setVideoPopup,
  setAddVideoData,
  handleObjectDragEnd,
}) => {
  const [image] = useImage(file);
  const [player_t_u] = useImage(t_u);
  const [player_t_d] = useImage(t_d);
  const [player_t_1_u] = useImage(t_1_u);
  const [player_t_1_d] = useImage(t_1_d);
  const [player_t_2_u] = useImage(t_2_u);
  const [player_t_2_d] = useImage(t_2_d);
  const [player_t_3_u] = useImage(t_3_u);
  const [player_t_3_d] = useImage(t_3_d);
  const [player_t_4_u] = useImage(t_4_u);
  const [player_t_4_d] = useImage(t_4_d);
  const [player_t_5_u] = useImage(t_5_u);
  const [player_t_5_d] = useImage(t_5_d);
  const [player_kt_u] = useImage(kt_u);
  const [player_kt_d] = useImage(kt_d);
  const [player_kt_1_u] = useImage(kt_1_u);
  const [player_kt_1_d] = useImage(kt_1_d);
  const [player_kt_2_u] = useImage(kt_2_u);
  const [player_kt_2_d] = useImage(kt_2_d);
  const [player_kt_3_u] = useImage(kt_3_u);
  const [player_kt_3_d] = useImage(kt_3_d);
  const [player_kt_4_u] = useImage(kt_4_u);
  const [player_kt_4_d] = useImage(kt_4_d);
  const [player_kt_5_u] = useImage(kt_5_u);
  const [player_kt_5_d] = useImage(kt_5_d);
  const imageRef = useRef(null);

  const players = {
    yellow: {
      up: [
        player_t_1_u,
        player_t_2_u,
        player_t_3_u,
        player_t_4_u,
        player_t_5_u,
        player_t_u,
      ],
      down: [
        player_t_1_d,
        player_t_2_d,
        player_t_3_d,
        player_t_4_d,
        player_t_5_d,
        player_t_d,
      ],
    },
    blue: {
      up: [
        player_kt_1_u,
        player_kt_2_u,
        player_kt_3_u,
        player_kt_4_u,
        player_kt_5_u,
        player_kt_u,
      ],
      down: [
        player_kt_1_d,
        player_kt_2_d,
        player_kt_3_d,
        player_kt_4_d,
        player_kt_5_d,
        player_kt_d,
      ],
    },
  };

  const [playerImage, setPlayerImage] = useState(null);
  const [playerLevel, setPlayerLevel] = useState(null);
  const [countPos, setCountPos] = useState({
    x: x,
    y: y,
  });

  useEffect(() => {
    if (
      name === "player" &&
      players[playerAttrs.color][level][playerAttrs.pos] !== undefined
    ) {
      setPlayerImage(players[playerAttrs.color][level][playerAttrs.pos]);
    }
  }, [players]);

  useEffect(() => {
    setCountPos({
      x: x,
      y: y,
    });
  }, [x, y]);

  const attrs = {
    id,
    x,
    y,
    width: sizes[name].width,
    height: sizes[name].height,
    draggable: draggable && !freezed,
    onDragEnd: (e) => handleObjectDragEnd(id, e, name, playerLevel, count),
    onClick: () => {
      console.log(playerId, id, tierId);
      if (name === "player" && freezed) return
      if (name !== "player" && freezed && videoId !== undefined) {
        setAddVideoData({
          isPopupOpen: false,
          videoData: {
            playerId: playerId,
            fromId: id,
            tierId,
          },
        });
        setVideoPopup({ isOpen: true, url: videoId });
        return;
      }
      if (name !== "player" && freezed) {
        setAddVideoData({
          isPopupOpen: true,
          videoData: {
            playerId: playerId,
            fromId: id,
            tierId,
          },
        });
        // return
      }
      if (name === "player" && !freezed) {
        setAddVideoData({
          isPopupOpen: true,
          videoData: {
            playerId: id,
            fromId: bombToTie.id,
            tierId,
          },
        });
      }
      if (playerColor === false || freezed) {
        onClick({
          x,
          y,
          name,
          id,
          width: sizes[name].width,
          height: sizes[name].height,
          playerColor: playerAttrs?.color,
          freezed,
        });
      }
    },
  };

  const checkPlayerOverlap = (e, overlap) => {
    const node = imageRef.current;
    let attrs = {
      width: 30,
      height: 16,
    };
    // if (level === "up") {
    //   node.setAttrs({
    //     image: players[playerAttrs.color].up[playerAttrs.pos],
    //     ...attrs,
    //   });
    // } else {
    //   node.setAttrs({
    //     image: players[playerAttrs.color].down[playerAttrs.pos],
    //     ...attrs,
    //   });
    // }
    // node.setAttrs({
    //   image: players[playerAttrs.color][level][playerAttrs.pos],
    //   ...attrs,
    // });
    if (overlap !== null) {
      if (overlap) {
        node.setAttrs({
          image: players[playerAttrs.color].up[playerAttrs.pos],
          ...attrs,
        });
        setPlayerLevel(overlap);
      } else if (!overlap) {
        node.setAttrs({
          image: players[playerAttrs.color].down[playerAttrs.pos],
          ...attrs,
        });
        setPlayerLevel(overlap);
      }
    }
  };

  return name.includes("player") ? (
    <Image
      {...attrs}
      ref={imageRef}
      image={playerImage}
      onDragMove={(e) => {
        let overlap = onDragMove(e.target);
        checkPlayerOverlap(e, overlap);
      }}
    />
  ) : (
    <>
      <Image
        {...attrs}
        image={image}
        onDragMove={(e) => {
          setCountPos({ x: e.target.x(), y: e.target.y() });
        }}
      />
      {count > 1 && (
        <>
          <Circle
            x={countPos.x + attrs.width - 5}
            y={countPos.y + attrs.height - 5}
            width={12}
            height={12}
            fill="#FFB800"
          />
          <Text
            text={count}
            fill="#000"
            // width={transformedSize.width}
            // height={transformedSize.height}
            x={countPos.x + attrs.width - 5.5}
            y={countPos.y + attrs.height - 5.2}
            offset={{
              x: 2,
              y: 4,
            }}
            fontFamily="sans-serif"
            fontSize={10}
          />
        </>
      )}
    </>
  );
};

export default DrawImage;

// import { useState, useRef, useEffect } from "react";
// import clsx from "clsx";
// import { Stage, Layer, Line, Text, Arrow, Shape } from "react-konva";
// import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

// import Map from "./Map";
// import Button from "../button/Button";
// import MapsController from "../mapsController/MapsController";
// import StrategyController from "../strategyController/StrategyController";

// import pencil from "../../img/icons/pencil.svg";
// import eraser from "../../img/icons/eraser.svg";
// import dialog from "../../img/icons/Subtract-7.svg";
// import image from "../../img/icons/Union-3.svg";
// import video from "../../img/icons/Subtract-8.svg";
// import warning from "../../img/icons/warning-fill.svg";
// import shield from "../../img/icons/shield.svg";
// import bomb from "../../img/icons/Union-4.svg";
// import location from "../../img/icons/Subtract-9.svg";
// import scope from "../../img/icons/Union-5.svg";
// import star from "../../img/icons/Star 3.svg";
// import flag from "../../img/icons/Union-6.svg";
// import clock from "../../img/icons/clock-fill.svg";
// import fullScreen from "../../img/icons/Union-2.svg";
// import back from "../../img/icons/Vector (Stroke)-1.svg";
// import forward from "../../img/icons/Vector (Stroke).svg";
// import trash from "../../img/icons/Subtract-5.svg";
// import axis from "../../img/icons/Vector-3.svg";
// import folder from "../../img/icons/Subtract-4.svg";
// import brushOne from "../../img/icons/burshOne.svg";
// import brushTwo from "../../img/icons/BrushTwo.svg";
// import brushThree from "../../img/icons/BrushThree.svg";
// import brushFour from "../../img/icons/brushFour.svg";
// import brushFive from "../../img/icons/brushFive.svg";
// import brushSix from "../../img/icons/brushSix.svg";

// import styles from "./canvas.module.scss";
// import DrawImage from "./DrawImage";

// const elementImages = {
//   warning: warning,
//   bomb: bomb,
//   location: location,
//   star: star,
//   flag: flag,
// };

// const Canvas = () => {
//   const [elements, setElements] = useState([]);
//   const [nextElements, setNextElements] = useState([]);

//   const [tool, setTool] = useState(null);

//   const [arrowType, setArrowType] = useState(null);
//   const [isDash, setIsDash] = useState(null);
//   const [color, setColor] = useState(["hsl(0, 0%, 100%)", 0]);
//   const [drawWidth, setDrawWidth] = useState(2);
//   const [arrowBrightness, setArrowBrightness] = useState(50);

//   const [isDragable, setIsDragable] = useState(false);
//   const [colorsArray, setColorsArray] = useState([
//     "hsl(0, 0%, 100%)",
//     "hsl(0,0%, 50%)",
//     "hsl(192,100%, 50%)",
//     "hsl(209,100%, 50%)",
//     "hsl(84,100%, 59%)",
//     "hsl(60,100%, 50%)",
//     "hsl(39,100%, 50%)",
//     "hsl(0,100%, 50%)",
//   ]);

//   const isDrawing = useRef(false);
//   const stageRef = useRef(null);

//   useEffect(() => {
//     if (!!tool) {
//       setIsDragable(false);
//     }
//     if (tool === "eraser") {
//       setDrawWidth(8);
//     }
//   }, [tool]);

//   const handleMouseDown = (e) => {
//     if (!tool) return;

//     setIsDragable(false);
//     isDrawing.current = true;
//     let pos = e.target.getStage().getPointerPosition();

//     if (tool === "pencil" || tool === "eraser") {
//       setElements([
//         ...elements,
//         {
//           tool,
//           id: elements.length,
//           name: tool,
//           x: e.target.x(),
//           y: e.target.y(),
//           points: [pos.x, pos.y],
//           strokeColor: color[0],
//           drawWidth: drawWidth,
//           arrowType: arrowType,
//           dash: isDash,
//           pointerLength: 15,
//           pointerWidth: 20,
//         },
//       ]);
//     } else if (tool === "text") {
//       const newValue = window.prompt("Enter new text value");
//       setElements([
//         ...elements,
//         {
//           tool,
//           id: elements.length,
//           name: tool,
//           x: pos.x,
//           y: pos.y,
//           text: newValue,
//           fill: "#e7e7e7",
//           width: 50,
//           fontSize: 24,
//         },
//       ]);
//       setTool(null);
//     } else if (tool === "arrow") {
//       setElements([
//         ...elements,
//         {
//           tool,
//           id: elements.length,
//           name: tool,
//           isDash: isDash,
//           arrowType: arrowType,
//           points: {
//             firstX: pos.x,
//             firstY: pos.y,
//           },
//           color: color[0],
//           pointerLength: 20,
//           pointerWidth: 20,
//           drawWidth: drawWidth,
//         },
//       ]);
//     }
//     if (nextElements.length !== 0) {
//       setNextElements([]);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing.current || !tool) return;
//     const point = e.target.getStage().getPointerPosition();
//     let lastLine = elements[elements.length - 1];
//     if (tool === "pencil" || tool === "eraser") {
//       if (!isDrawing.current) {
//         return;
//       }
//       lastLine.points = lastLine?.points?.concat([point.x, point.y]);

//       setElements(elements.concat());
//     } else if (tool === "arrow") {
//       lastLine.points = { ...lastLine.points, lastX: point.x, lastY: point.y };

//       setElements(elements.concat());
//     }
//     elements.splice(elements.length - 1, 1, lastLine);
//   };

//   const handleMouseUp = () => {
//     if (!tool) return;
//     // if (tool === "arrow") {
//     let newElements = elements.filter((el) => {
//       if (el.tool === "arrow" && (!el.points.lastX || !el.points.lastY)) {
//         return;
//       } else {
//         return el;
//       }
//     });
//     setElements(newElements);
//     // }
//     isDrawing.current = false;
//   };

//   const undoDraw = () => {
//     if (Array.isArray(nextElements[0])) {
//       setElements(nextElements[0]);
//       let deletedFirst = nextElements.slice(1);
//       setNextElements(deletedFirst);
//     } else {
//       if (elements.length === 0) return;
//       let linesLastLine = elements[elements.length - 1];
//       let prevLines = elements.slice(0, -1);
//       setElements(prevLines);
//       setNextElements([linesLastLine, ...nextElements]);
//     }
//   };

//   const forwardDraw = () => {
//     if (nextElements.length === 0) return;
//     let firstNextLine = nextElements[0];
//     let deletedFirst = nextElements.slice(1);
//     setNextElements(deletedFirst);
//     setElements([...elements, firstNextLine]);
//   };

//   const dragElements = () => {
//     setTool(null);
//     setIsDragable(!isDragable);
//   };

//   const checkOverlap = (element) => {
//     // check
//     if (element) {
//       const svgPathNodes = Array.from(document.querySelectorAll(".map-rect"));

//       const wrapper = stageRef.current.container().getBoundingClientRect();
//       const wrapperTop = wrapper.top;
//       const wrapperLeft = wrapper.left;
//       const { x, y } = element.getClientRect();

//       const isOnRect = svgPathNodes.filter(rect => {
//         const { top, left, right, bottom } = rect.getBoundingClientRect();
//         const overlaps =
//           x + wrapperLeft <= right &&
//           x + wrapperLeft >= left &&
//           y + wrapperTop <= bottom &&
//           y + wrapperTop >= top;

//         return overlaps;
//       })
//       return isOnRect.length !== 0
//     }
//   };

//   const handleObjectDragMove = (e) => {
//     console.log(checkOverlap(e.target));
//   };

//   const handleObjectDragEnd = (id, e) => {
//     let updatedElements = elements.map((el) =>
//       el.id === id ? { ...el, x: e.target.x(), y: e.target.y() } : el
//     );
//     setElements(updatedElements);
//   };

//   const setToolFunc = (toolName) => {
//     if (tool === toolName) {
//       setTool(null);
//     } else {
//       setTool(toolName);
//     }
//   };

//   const setArrowBrightnessFunc = (e) => {
//     setArrowBrightness(e.target.value);
//     setColorsArray([
//       `hsl(0, 0%, 100%)`,
//       `hsl(0,0%, ${e.target.value}%)`,
//       `hsl(192,100%, ${e.target.value}%)`,
//       `hsl(209,100%, ${e.target.value}%)`,
//       `hsl(84,100%, ${e.target.value}%)`,
//       `hsl(60,100%, ${e.target.value}%)`,
//       `hsl(39,100%, ${e.target.value}%)`,
//       `hsl(0,100%, ${e.target.value}%)`,
//     ]);
//     if (!color.includes("hsl(0, 0%, 100%)")) {
//       let [start, end] = color[0].split(" ");
//       setColor([start + " " + e.target.value + "%)", color[1]]);
//     }
//   };

//   const addElement = (elementName) => {
//     setElements([
//       ...elements,
//       {
//         tool: "image",
//         id: elements.length,
//         file: elementImages[elementName],
//         name: elementName,
//         x: stageRef.current.attrs.width / 2,
//         y: stageRef.current.attrs.height / 2,
//       },
//     ]);
//     setIsDragable(true);
//     setTool(null)
//   };

//   const deleteAll = () => {
//     setNextElements([elements]);
//     setElements([]);
//   };

//   const selectArrow = (type, isDashed) => {
//     if (tool !== "arrow" || type !== arrowType || isDashed !== isDash) {
//       setTool("arrow");
//       setArrowType(type);
//       setIsDash(isDashed);
//     } else {
//       setTool(null);
//       setArrowType(null);
//       setIsDash(null);
//     }
//   };

//   const sceneFunc = (ctx, shape) => {
//     const points = shape.getAttr("points");
//     const dash = shape.getAttr("dash")
//     ctx.beginPath();
//     for (let i = 2; i < points.length; i += 2) {
//       ctx.lineTo(points[i], points[i + 1]);
//     }
//     // ctx.moveTo(points[0], points[1]);
//     // ctx.lineTo(points[2], points[3]);
//     if (dash) {
//       ctx.setLineDash(dash);
//     }
//     ctx.fillStrokeShape(shape);
//     var PI2 = Math.PI * 2;
//     var dx = points[points.length - 2] - points[points.length - 12];
//     var dy = points[points.length - 1] - points[points.length - 11];
//     var radians = (Math.atan2(dy, dx) + PI2) % PI2;
//     var length = shape.getAttr("pointerLength");
//     var width = shape.getAttr("pointerWidth");
//     ctx.save();
//     ctx.beginPath();
//     ctx.translate(points[points.length - 2], points[points.length - 1]);
//     ctx.rotate(radians);
//     ctx.moveTo(0, 0);
//     ctx.lineTo(-length, width / 2);
//     ctx.moveTo(0, 0);
//     ctx.lineTo(-length, -width / 2);
//     ctx.restore();
//     ctx.fillStrokeShape(shape);
//   };

//   // const sceneFunc = (ctx, shape) => {

//   //   const points = shape.getAttr("points");
//   //   ctx.beginPath();
//   //   ctx.moveTo(points[0], points[1]);
//   //   ctx.lineTo(points[2], points[3]);
//   //   ctx.fillStrokeShape(shape);
//   //   var PI2 = Math.PI * 2;
//   //   var dx = points[2] - points[0];
//   //   var dy = points[3] - points[1];
//   //   var radians = (Math.atan2(dy, dx) + PI2) % PI2;
//   //   var length = shape.getAttr("pointerLength");
//   //   var width = shape.getAttr("pointerWidth");
//   //   ctx.save();
//   //   ctx.beginPath();
//   //   ctx.translate(points[2], points[3]);
//   //   ctx.rotate(radians);
//   //   ctx.moveTo(0, 0);
//   //   ctx.lineTo(-length, width / 2);
//   //   ctx.moveTo(0, 0);
//   //   ctx.lineTo(-length, -width / 2);
//   //   ctx.restore();
//   //   ctx.fillStrokeShape(shape);
//   // };

//   return (
//     <>
//       <section className={styles.map__instruments}>
//         <div className={styles.map__wrapper}>
//           <Button
//             ico={pencil}
//             onClick={() => {
//               if (tool === "pencil") {
//                 setTool(null);
//               } else {
//                 setTool("pencil");
//               }
//             }}
//             secondClass={tool === "pencil" && "active"}
//           />
//           <Button
//             ico={eraser}
//             onClick={() => setToolFunc("eraser")}
//             secondClass={tool === "eraser" && "active"}
//           />
//           <Button
//             ico={dialog}
//             onClick={() => setToolFunc("text")}
//             secondClass={tool === "text" && "active"}
//           />
//           <Button ico={image} />
//           <Button ico={video} />
//           <Button ico={warning} onClick={() => addElement("warning")} />
//           <Button ico={shield} />
//           <Button ico={bomb} onClick={() => addElement("bomb")} secondClass={elements.filter(el => el.name === "bomb").length !== 0 && "disabled"} />
//           <Button ico={location} onClick={() => addElement("location")} />
//           <Button ico={scope} />
//           <Button ico={star} onClick={() => addElement("star")} />
//           <Button ico={flag} onClick={() => addElement("flag")} />
//           <Button ico={clock} />
//         </div>
//       </section>
//       <section
//         className={clsx(
//           styles.canvas__wrapper,
//           isDragable && styles.drag__element,
//           (tool === "pencil" || tool === "arrow") && styles.pencil,
//           tool === "eraser" && styles.eraser,
//           !tool && styles.canvas__drag
//         )}
//       >
//         <TransformWrapper disabled={tool || isDragable}>
//           <TransformComponent>
//             <Map mapName={"rust"} />
//             <Stage
//               ref={stageRef}
//               width={760}
//               height={570}
//               onMouseDown={handleMouseDown}
//               onMousemove={handleMouseMove}
//               onMouseup={handleMouseUp}
//             >
//               <Layer>
//                 {elements.map((element, i) => {
//                   if (element.tool === "pencil" || element.tool === "eraser") {
//                     const attrs = {
//                       key: i,
//                       id: element.id,
//                       x: element.x,
//                       y: element.y,
//                       points: element.points,
//                       stroke: element.strokeColor,
//                       strokeWidth: element.drawWidth,
//                       tension: 0.5,
//                       lineCap: "round",
//                       globalCompositeOperation:
//                         element.tool === "eraser"
//                           ? "destination-out"
//                           : "source-over",
//                       onDragEnd: (e) => handleObjectDragEnd(element.id, e),
//                       pointerAtEnding: true,
//                       pointerLength: element.pointerLength,
//                       pointerWidth: element.pointerWidth,
//                     };

//                     return element.arrowType === "pointer-stroke" ? (
//                       <Shape
//                         {...attrs}
//                         sceneFunc={sceneFunc}
//                         dash={element.dash ? [18, 10] : false}
//                       />
//                     ) : (
//                       <Line {...attrs} dash={element.dash ? [7, 7] : false} />
//                     );
//                   }
//                 })}
//               </Layer>
//               <Layer>
//                 {elements !== null &&
//                   elements.map((element, i) => {
//                     if (element.tool === "text") {
//                       return (
//                         <Text
//                           key={i}
//                           id={element.id}
//                           x={element.x}
//                           y={element.y}
//                           draggable={isDragable}
//                           text={element.text}
//                           fill={element.fill}
//                           fontFamily="sans-serif"
//                           fontSize={element.fontSize}
//                           perfectDrawEnabled={false}
//                           width={100}
//                           // onTransform={handleResize}
//                           // onClick={clickOnText}
//                           // onTap={clickOnText}
//                           onDragEnd={(e) => handleObjectDragEnd(element.id, e)}
//                           onDblClick={() => {
//                             const newTexts = [...elements];
//                             const index = newTexts.findIndex(
//                               (item) => item.id === element.id
//                             );
//                             const newValue = window.prompt(
//                               "Enter new text value",
//                               element.initialText
//                             );
//                             if (newValue !== null) {
//                               newTexts[index] = {
//                                 ...newTexts[index],
//                                 text: newValue,
//                               };
//                               setElements(newTexts); // Update the state with the new texts array
//                             }
//                           }}
//                           // onDblClick={onDoubleClick}
//                           // onDblTap={onDoubleClick}
//                           // width={width}
//                         />
//                       );
//                     } else if (element.tool === "arrow") {
//                       if (!element.points.lastX || !element.points.lastY) {
//                         return;
//                       }

//                       const attrs = {
//                         key: i,
//                         id: element.id,
//                         points: [
//                           element.points.firstX,
//                           element.points.firstY,
//                           element.points.lastX,
//                           element.points.lastY,
//                         ],
//                         fill: element.color,
//                         stroke: element.color,
//                         strokeWidth: element.drawWidth,
//                         pointerLength: element.pointerLength,
//                         pointerWidth: element.pointerWidth,
//                         lineCap: "round",
//                         draggable: isDragable,
//                         onDragEnd: (e) => {
//                           handleObjectDragEnd(element.id, e);
//                         },
//                       };

//                       return element.arrowType === "pointer-stroke" ? (
//                         <Shape
//                           {...attrs}
//                           sceneFunc={sceneFunc}
//                           dash={element.isDash ? [18, 10] : false}
//                         />
//                       ) : (
//                         <Arrow
//                           {...attrs}
//                           pointerAtEnding={
//                             !(element.arrowType === "no-pointer")
//                           }
//                           dash={element.isDash ? [7, 7] : false}
//                         />
//                       );
//                     } else if (element.tool === "image") {
//                       return (
//                         <DrawImage
//                           key={i}
//                           id={element.id}
//                           name={element.name}
//                           x={element.x}
//                           y={element.y}
//                           file={element.file}
//                           draggable={isDragable}
//                           handleObjectDragEnd={handleObjectDragEnd}
//                           onDragMove={(e) => handleObjectDragMove(e)}
//                         />
//                       );
//                     }
//                   })}
//               </Layer>
//             </Stage>
//           </TransformComponent>
//         </TransformWrapper>
//       </section>
//       <section className={styles.other__instruments}>
//         <div className={styles.other__wrap}>
//           <Button ico={fullScreen} />
//           {!Array.isArray(nextElements[0]) ? (
//             <Button
//               ico={back}
//               onClick={undoDraw}
//               secondClass={elements.length === 0 && "disabled"}
//             />
//           ) : (
//             <Button
//               ico={back}
//               onClick={undoDraw}
//               secondClass={!Array.isArray(nextElements[0]) && "disabled"}
//             />
//           )}
//           <Button
//             ico={forward}
//             onClick={forwardDraw}
//             secondClass={
//               (nextElements.length === 0 || Array.isArray(nextElements[0])) &&
//               "disabled"
//             }
//           />
//           <Button
//             ico={trash}
//             onClick={deleteAll}
//             secondClass={elements.length === 0 && "disabled"}
//           />
//           <Button
//             ico={axis}
//             onClick={dragElements}
//             secondClass={isDragable && "active"}
//           />
//           <Button ico={folder} />
//         </div>
//       </section>
//       <section className={styles.drawing__instruments}>
//         <div className={styles.strategy__stages}>
//           <p className={styles.stages__title}>этапы стратегии:</p>
//           <div className={styles.stages}>
//             <StrategyController number="1" status={styles.first} />
//             <StrategyController number="2" />
//             <StrategyController number="3" />
//             <StrategyController number="4" />
//             <StrategyController number="5" />
//             <StrategyController number="6" />
//             <StrategyController number="7" />
//             <StrategyController number="8" />
//           </div>
//         </div>
//         <div className={styles.strategy__maps}>
//           <p className={styles.map__title}>карта:</p>
//           <div className={styles.maps}>
//             <MapsController map={styles.rust} mapName="rust" />
//             <MapsController map={styles.province} mapName="province" />
//             <MapsController map={styles.sandstone} mapName="sandstone" />
//             <MapsController map={styles.sakura} mapName="sakura" />
//             <MapsController map={styles.dune} mapName="dune" />
//             <MapsController map={styles.breeze} mapName="breeze" />
//             <MapsController map={styles.zone} mapName="zone 9 " />
//           </div>
//         </div>
//         <div className={styles.arrows}>
//           <p className={styles.arrows__title}>настройка кисти:</p>
//           <div className={styles.arrow__types}>
//             <Button
//               ico={brushOne}
//               onClick={() => {
//                 if (
//                   tool === "pencil" &&
//                   arrowType === "no-pointer" &&
//                   !isDash
//                 ) {
//                   setTool(null);
//                 } else {
//                   setTool("pencil");
//                   setArrowType("no-pointer");
//                   setIsDash(false);
//                 }
//               }}
//               secondClass={
//                 tool === "pencil" &&
//                 arrowType === "no-pointer" &&
//                 !isDash &&
//                 "active"
//               }
//             />
//             <Button
//               ico={brushTwo}
//               onClick={() => {
//                 if (
//                   tool === "pencil" &&
//                   arrowType === "pointer-stroke" &&
//                   !isDash
//                 ) {
//                   setTool(null);
//                 } else {
//                   setTool("pencil");
//                   setArrowType("pointer-stroke");
//                   setIsDash(false);
//                 }
//               }}
//               secondClass={
//                 tool === "pencil" &&
//                 arrowType === "pointer-stroke" &&
//                 !isDash &&
//                 "active"
//               }
//             />
//             <Button
//               ico={brushThree}
//               onClick={() => {
//                 if (tool === "pencil" && arrowType === "no-pointer" && isDash) {
//                   setTool(null);
//                 } else {
//                   setTool("pencil");
//                   setArrowType("no-pointer");
//                   setIsDash(true);
//                 }
//               }}
//               secondClass={
//                 tool === "pencil" &&
//                 arrowType === "no-pointer" &&
//                 isDash &&
//                 "active"
//               }
//             />
//             <Button
//               ico={brushFour}
//               onClick={() => {
//                 if (
//                   tool === "pencil" &&
//                   arrowType === "pointer-stroke" &&
//                   isDash
//                 ) {
//                   setTool(null);
//                 } else {
//                   setTool("pencil");
//                   setArrowType("pointer-stroke");
//                   setIsDash(true);
//                 }
//               }}
//               secondClass={
//                 tool === "pencil" &&
//                 arrowType === "pointer-stroke" &&
//                 isDash &&
//                 "active"
//               }
//             />
//             <Button
//               ico={brushFive}
//               onClick={() => selectArrow("pointer", false)}
//               secondClass={
//                 tool === "arrow" &&
//                 arrowType === "pointer" &&
//                 !isDash &&
//                 "active"
//               }
//             />
//             <Button
//               ico={brushSix}
//               onClick={() => selectArrow("pointer", true)}
//               secondClass={
//                 tool === "arrow" &&
//                 arrowType === "pointer" &&
//                 isDash &&
//                 "active"
//               }
//             />
//           </div>
//           <div className={clsx(styles.arrow__settings, "flex-column")}>
//             <input
//               type="range"
//               min={1}
//               max={8}
//               value={drawWidth}
//               onChange={(e) => setDrawWidth(Number(e.target.value))}
//             />
//             <input
//               min={20}
//               max={60}
//               type="range"
//               value={arrowBrightness}
//               onChange={setArrowBrightnessFunc}
//             />
//             <div className={styles.colors}>
//               {colorsArray.map((el, i) => {
//                 return (
//                   <div
//                     style={{ background: el }}
//                     key={i}
//                     className={clsx(
//                       styles.color,
//                       color[1] === i && styles.active
//                     )}
//                     onClick={() => color !== el && setColor([el, i])}
//                   ></div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };
// export default Canvas;
