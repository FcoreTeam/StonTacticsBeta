import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Stage, Layer, Line, Text, Arrow, Shape } from "react-konva";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import clsx from "clsx";
import { v4 } from "uuid";

import { setMatchPart } from "../../store/matchPartsSlice/matchPartsSlice";

import Map from "./Map";
import Button from "../button/Button";
import MapsController from "../mapsController/MapsController";
import StrategyController from "../strategyController/StrategyController";
import DrawImage from "./DrawImage";
import DrawText from "./DrawText";
import VideoPopup from "../video-popup/VideoPopup";
import UrlPopup from "../url-popup/UrlPopup";
import GrenadesGroup from "../grenades-group/GrenadesGroup";

import pencil from "../../img/icons/pencil.svg";
import eraser from "../../img/icons/eraser.svg";
import dialog from "../../img/icons/Subtract-7.svg";
import image from "../../img/icons/Union-3.svg";
import video from "../../img/icons/Subtract-8.svg";
import warning from "../../img/icons/warning-fill.svg";
import shield from "../../img/icons/shield.svg";
import bomb from "../../img/icons/Union-4.svg";
import location from "../../img/icons/Subtract-9.svg";
import scope from "../../img/icons/Union-5.svg";
import star from "../../img/icons/Star 3.svg";
import flag from "../../img/icons/Union-6.svg";
import clock from "../../img/icons/clock-fill.svg";
import fullScreen from "../../img/icons/Union-2.svg";
import back from "../../img/icons/Vector (Stroke)-1.svg";
import forward from "../../img/icons/Vector (Stroke).svg";
import trash from "../../img/icons/Subtract-5.svg";
import axis from "../../img/icons/Vector-3.svg";
import folder from "../../img/icons/Subtract-4.svg";
import brushOne from "../../img/icons/burshOne.svg";
import brushTwo from "../../img/icons/BrushTwo.svg";
import brushThree from "../../img/icons/BrushThree.svg";
import brushFour from "../../img/icons/brushFour.svg";
import brushFive from "../../img/icons/brushFive.svg";
import brushSix from "../../img/icons/brushSix.svg";
import points from "../../img/icons/points.svg";

import personOneYellow from "../../img/icons/person_1_yellow.svg";
import personTwoYellow from "../../img/icons/person_2_yellow.svg";
import personThreeYellow from "../../img/icons/person_3_yellow.svg";
import personFourYellow from "../../img/icons/person_4_yellow.svg";
import personFiveYellow from "../../img/icons/person_5_yellow.svg";

import flashbang from "../../img/icons/flash.svg";
import smoke from "../../img/icons/smoke.svg";
import grenade from "../../img/icons/grenade.svg";
import molotov from "../../img/icons/Subtract-10.svg";

import smokeMap from "../../img/icons/smoke_map.svg";
import grenadeMap from "../../img/icons/grenade_map.svg";
import molotovMap from "../../img/icons/molotov_map.svg";

import personOneBlue from "../../img/icons/person_1_blue.svg";
import personTwoBlue from "../../img/icons/person_2_blue.svg";
import personThreeBlue from "../../img/icons/person_3_blue.svg";
import personFourBlue from "../../img/icons/person_4_blue.svg";
import personFiveBlue from "../../img/icons/person_5_blue.svg";

import styles from "./canvas.module.scss";
import buttonStyles from "../button/button.module.scss";
import AcceptPopup from "../accept-popup/AcceptPopup";

const elementImages = {
  warning: warning,
  bomb: bomb,
  location: location,
  star: star,
  flag: flag,
  flashbang: flashbang,
  smoke: smokeMap,
  grenade: grenadeMap,
  molotov: molotovMap,
};

const Canvas = () => {
  const dispatch = useDispatch();
  const parts = useSelector((state) => state.matches);

  const { pathname } = useLocation();

  const [part, setPart] = useState("firstPart");

  const [isFullScreen, setIsFullScreen] = useState(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 830,
    height: 570,
    scale: 1,
  });

  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([parts[part]]);
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedTextId, setSelectedTextId] = useState(null);
  const [textValue, setTextValue] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);

  const [selectedMap, setSelectedMap] = useState("rust");

  const [shiftPressed, setShiftPressed] = useState(false);

  const [tool, setTool] = useState(null);

  const [arrowType, setArrowType] = useState(null);
  const [isDash, setIsDash] = useState(null);
  const [color, setColor] = useState(["hsl(0, 0%, 100%)", 0]);
  const [drawWidth, setDrawWidth] = useState(2);
  const [arrowBrightness, setArrowBrightness] = useState(50);

  const [isDragable, setIsDragable] = useState(false);
  const [colorsArray, setColorsArray] = useState([
    "hsl(0, 0%, 100%)",
    "hsl(0,0%, 50%)",
    "hsl(192,100%, 50%)",
    "hsl(209,100%, 50%)",
    "hsl(84,100%, 59%)",
    "hsl(60,100%, 50%)",
    "hsl(39,100%, 50%)",
    "hsl(0,100%, 50%)",
  ]);

  const [bombToTie, setBombToTie] = useState({
    x: null,
    y: null,
    name: null,
    id: null,
    width: null,
    height: null,
  });

  const [addVideoData, setAddVideoData] = useState({
    isPopupOpen: false,
    videoData: {
      playerId: null,
      fromId: null,
      tierId: null,
    },
  });

  const [addingVideoUrl, setAddingVideoUrl] = useState("");
  const [videoPopup, setVideoPopup] = useState({
    isOpen: false,
    url: null,
  });

  const [bombGroup, setBombGroup] = useState({
    name: null,
    count: null,
    x: null,
    y: null,
  });

  const [isAcceptPopupOpen, setIsAcceptPopupOpen] = useState(null);

  // const [scale, setScale] = useState(1);

  const isDrawing = useRef(null);
  const stageRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const removeBtnRef = useRef(null);
  const transformWrapperRef = useRef(null);

  const setCanvasSizes = () => {
    if (window.innerWidth < 1200) {
      // setCanvasSize({
      //   width: 500,
      //   height: 404,
      // })
      // stageRef.current.container().style.scale = "0.75"
    } else if (window.innerHeight < 1600) {
      // setCanvasSize({
      //   width: 830,
      //   height: 570,
      // })
      // stageRef.current.container().style.scale = "1"
    }
  };

  console.log(elements);

  useEffect(() => {
    setElements(history[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    dispatch(
      setMatchPart({ partName: part, partElements: history[currentStep] })
    );
  }, [history, pathname, elements]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.shiftKey && e.key === "Shift") {
        setShiftPressed(true);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (!e.shiftKey && e.key === "Shift") {
        setShiftPressed(false);
      }
    });
    // window.addEventListener('resize', () => {
    //   setCanvasSizes()
    // });
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
        setTool(null);
        setIsDragable(false);
      } else {
        setIsFullScreen(false);
        setCanvasSize({ width: 830, height: 570 });
        setCanvasSizes();
      }
    });
    setElements(parts[part]);
    setCanvasSizes();
  }, []);

  useEffect(() => {
    setElements(parts[part]);
  }, [part]);

  useEffect(() => {
    if (!!tool) {
      setIsDragable(false);
      document.body.style.overflow = "hidden";
    } else if (!tool) {
      document.body.style.overflow = "visible";
    }
  }, [tool]);

  const handleMouseDown = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedTextId(null);
    } else {
      return;
    }
    if (!tool) return;

    setIsDragable(false);
    isDrawing.current = true;
    let pos = e.target.getStage().getPointerPosition();
    const id = v4().slice(0, 8);
    if (tool === "pencil" || tool === "eraser") {
      setElements([
        ...elements,
        {
          tool,
          id: id,
          name: tool,
          x: e.target.x() - 830 / 2,
          y: e.target.y() - 570 / 2,
          points: [pos.x, pos.y],
          strokeColor: color[0],
          drawWidth: drawWidth,
          arrowType: arrowType,
          dash: isDash,
          pointerLength: 15,
          pointerWidth: 20,
        },
      ]);
    } else if (tool === "text") {
      const newValue = window.prompt("Enter new text value");
      // setElements([
      //   ...elements,
      //   {
      //     tool,
      //     id: elements.length,
      //     name: tool,
      //     x: pos.x,
      //     y: pos.y,
      //     text: newValue,
      //     fill: "#e7e7e7",
      //     width: null,
      //     fontSize: 18,
      //   },
      // ]);
      // const newHistory = history.slice(0, currentStep + 1);
      // newHistory.push([
      //   ...elements,
      //   {
      //     tool,
      //     id: elements.length,
      //     name: tool,
      //     x: pos.x,
      //     y: pos.y,
      //     text: newValue,
      //     fill: "#e7e7e7",
      //     width: null,
      //     height: null,
      //     fontSize: 18,
      //   },
      // ]);
      // setHistory(newHistory);
      // setCurrentStep(newHistory.length - 1);
      // setTimeout(() => {
      //   setTool(null);
      //   isDrawing.current = false;
      // }, 100);
    } else if (tool === "arrow") {
      setElements([
        ...elements,
        {
          tool,
          id: id,
          name: tool,
          isDash: isDash,
          arrowType: arrowType,
          points: {
            firstX: pos.x - 830 / 2,
            firstY: pos.y - 570 / 2,
          },
          color: color[0],
          pointerLength: 20,
          pointerWidth: 20,
          drawWidth: drawWidth,
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || !tool) return;
    const point = e.target.getStage().getPointerPosition();
    let lastLine = elements[elements.length - 1];
    if (tool === "pencil" || tool === "eraser") {
      if (!isDrawing.current) {
        return;
      }
      lastLine.points = lastLine?.points?.concat([point.x, point.y]);

      setElements(elements.concat());
    } else if (tool === "arrow") {
      lastLine.points = {
        ...lastLine.points,
        lastX: point.x - 830 / 2,
        lastY: point.y - 570 / 2,
      };

      setElements(elements.concat());
    }
    elements.splice(elements.length - 1, 1, lastLine);
  };

  const handleMouseUp = () => {
    if (!tool) return;
    let newElements = elements.filter((el) => {
      if (
        Object.keys(el.points)?.length < 4 &&
        el.tool === "arrow" &&
        (el.arrowType === "pointer" || el.arrowType === "pointer-stroke")
      ) {
        return;
      } else if (
        el.tool === "arrow" &&
        (el.points.lastX === undefined || el.points.lastY === undefined)
      ) {
        return;
      } else {
        return el;
      }
    });
    if (newElements.length < elements.length) {
      isDrawing.current = false;
      return
    }
    setElements(newElements);
    
    isDrawing.current = false;
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(elements);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRedo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const dragElements = () => {
    setTool(null);
    setIsDragable(!isDragable);
  };

  const checkOverlap = (element) => {
    if (element) {
      const svgPathNodes = Array.from(document.querySelectorAll(".map-rect"));

      const wrapper = stageRef.current.container().getBoundingClientRect();
      const { width, height } = element.attrs;
      const wrapperTop = wrapper.top;
      const wrapperLeft = wrapper.left;
      const { x, y } = element.getClientRect();
      // const elementY = element.getBoundingClientRect();

      const isOnRect = svgPathNodes.filter((rect) => {
        const { top, left, right, bottom } = rect.getBoundingClientRect();

        if (window.innerWidth > 1200) {
          return (
            x + wrapperLeft + width / 4 <= right &&
            x + wrapperLeft + width / 4 >= left &&
            y + wrapperTop + height / 2 <= bottom &&
            y + wrapperTop + height / 2 >= top
          );
        } else if (window.innerWidth <= 1200 && window.innerWidth > 890) {
          return (
            x * 0.73 + wrapperLeft + width / 4 >= left &&
            x * 0.73 + wrapperLeft + width / 4 <= right &&
            y * 0.73 + wrapperTop + height / 2 <= bottom &&
            y * 0.73 + wrapperTop + height / 2 >= top
          );
        } else if (window.innerWidth <= 890) {
          return (
            x * 0.58 + wrapperLeft + width / 4 >= left + 4 &&
            x * 0.58 + wrapperLeft + width / 4 <= right + 4 &&
            y * 0.58 + wrapperTop + height / 2 <= bottom + 4 &&
            y * 0.58 + wrapperTop + height / 2 >= top + 4
          );
        }
      });
      return isOnRect.length !== 0;
    }
  };

  const getTrashOverlap = (clientX, clientY) => {
    if (pathname === "/strategy") {
      const { top, bottom, left, right } =
        removeBtnRef.current.getBoundingClientRect();
      return (
        clientX <= right &&
        clientX >= left &&
        clientY <= bottom &&
        clientY >= top
      );
    }
  };

  const handleObjectDragEnd = (id, e, name, playerLevel = null, count) => {
    const { clientX, clientY } = e.evt;

    const isOverTrash = getTrashOverlap(clientX, clientY);

    var updatedElements;
    var idToRemove;
    if (isOverTrash) {
      updatedElements = elements.filter((el) => el.id !== id);
      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push(updatedElements);
      setHistory(newHistory);
      setCurrentStep(newHistory.length - 1);
      return;
    }
    if (name === "player") {
      updatedElements = elements.map((el) =>
        el.id === id
          ? {
              ...el,
              x: e.target.x(),
              y: e.target.y(),
              level: playerLevel ? "up" : "down",
            }
          : el
      );
    } else if (name === "text") {
      updatedElements = elements.map((el) =>
        el.id === id
          ? {
              ...el,
              x: e.target.x(),
              y: e.target.y(),
              width: e.target.width(),
              height: e.target.height(),
              rotation: e.target.rotation(),
            }
          : el
      );
    } else {
      updatedElements = elements.map((el) => {
        if (
          el.id !== id &&
          el.name === name &&
          el.name !== "player" &&
          count < 4 &&
          el.count < 4 &&
          !el.freezed &&
          el.name !== "warning" &&
          el.name !== "location"
        ) {
          if (
            el.x - 20 < e.target.x() &&
            e.target.x() < el.x + 20 &&
            el.y - 20 < e.target.y() &&
            e.target.y() < el.y + 20
          ) {
            idToRemove = id;
            return {
              ...el,
              x: e.target.x(),
              y: e.target.y(),
              count: count + el.count,
            };
          }
        }
        return el.id === id ? { ...el, x: e.target.x(), y: e.target.y() } : el;
      });
    }

    const newHistory = history.slice(0, currentStep + 1);
    if (idToRemove !== undefined) {
      newHistory.push(
        updatedElements.filter((el) => {
          return el.id !== idToRemove;
        })
      );
    } else {
      newHistory.push(updatedElements);
    }
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const setToolFunc = (toolName) => {
    if (tool === toolName) {
      setTool(null);
    } else if (toolName === "eraser") {
      setArrowType(null);
      setIsDash(null);
      setTool(toolName);
    } else {
      setTool(toolName);
    }
  };

  const setArrowBrightnessFunc = (e) => {
    setArrowBrightness(e.target.value);
    setColorsArray([
      `hsl(0, 0%, 100%)`,
      `hsl(0,0%, ${e.target.value}%)`,
      `hsl(192,100%, ${e.target.value}%)`,
      `hsl(209,100%, ${e.target.value}%)`,
      `hsl(84,100%, ${e.target.value}%)`,
      `hsl(60,100%, ${e.target.value}%)`,
      `hsl(39,100%, ${e.target.value}%)`,
      `hsl(0,100%, ${e.target.value}%)`,
    ]);
    if (!color.includes("hsl(0, 0%, 100%)")) {
      let [start, end] = color[0].split(" ");
      setColor([start + " " + e.target.value + "%)", color[1]]);
    }
  };

  const addElement = (elementName, playerAttrs) => {
    const id = v4().slice(0, 8);
    const newElements = [
      ...elements,
      {
        tool: "image",
        id: id,
        level: "down",
        playerColor: false,
        playerAttrs: playerAttrs,
        file: elementImages[elementName],
        name: elementName,
        count: 1,
        freezed: false,
        x: 0,
        y: 0,
      },
    ];
    setElements(newElements);
    setIsDragable(true);
    setTool(null);
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const addText = () => {
    const id = v4().slice(0, 8);
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push([
      ...elements,
      {
        tool: "text",
        id: id,
        name: "text",
        x: 0,
        y: 0,
        text: textValue,
        fill: "#e7e7e7",
        width: null,
        height: null,
        fontSize: 18,
      },
    ]);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    setShowTextInput(false);
    setTextValue("");
  };

  const deleteAll = () => {
    // setElements([]);
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push([]);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const selectArrow = (type, isDashed) => {
    if (tool !== "arrow" || type !== arrowType || isDashed !== isDash) {
      setTool("arrow");
      setArrowType(type);
      setIsDash(isDashed);
    } else {
      setTool(null);
      setArrowType(null);
      setIsDash(null);
    }
  };

  const sceneFunc = (ctx, shape) => {
    const points = shape.getAttr("points");
    const dash = shape.getAttr("dash");
    ctx.beginPath();
    for (let i = 2; i < points.length; i += 2) {
      ctx.lineTo(points[i], points[i + 1]);
    }
    // ctx.moveTo(points[0], points[1]);
    // ctx.lineTo(points[2], points[3]);
    if (dash) {
      ctx.setLineDash(dash);
    }
    ctx.fillStrokeShape(shape);
    var PI2 = Math.PI * 2;
    var dx = points[points.length - 2] - points[points.length - 12];
    var dy = points[points.length - 1] - points[points.length - 11];
    var radians = (Math.atan2(dy, dx) + PI2) % PI2;
    var length = shape.getAttr("pointerLength");
    var width = shape.getAttr("pointerWidth");
    ctx.save();
    ctx.beginPath();
    ctx.translate(points[points.length - 2], points[points.length - 1]);
    ctx.rotate(radians);
    ctx.moveTo(0, 0);
    ctx.lineTo(-length, width / 2);
    ctx.moveTo(0, 0);
    ctx.lineTo(-length, -width / 2);
    ctx.restore();
    ctx.fillStrokeShape(shape);
  };

  const selectMap = (mapName) => {
    if (selectedMap !== mapName) {
      setSelectedMap(mapName);
    }
  };

  const changePart = (partName) => {
    setPart(partName);
    dispatch(setMatchPart({ partName: part, partElements: elements }));
    setHistory([parts[partName]]);
    setCurrentStep(0);
  };

  const handleFullscreen = () => {
    const stage = canvasWrapperRef.current;

    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        setIsFullScreen(true);
        setCanvasSize({ width: window.innerWidth, height: screen.height });
        stage.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else {
      console.error("Fullscreen not supported by this browser");
    }
  };

  const getCanvasCapture = () => {
    const stage = stageRef.current.getStage();

    // Use toDataURL to get the image data URL
    const dataURL = stage.toDataURL({ pixelRatio: 4 });
    console.log(dataURL);
  };

  const showDrawingMenu = () => {
    let mapInstruments = document.querySelector(".map__instruments");
    mapInstruments.classList.add("show");
  };
  // const handleWheel = (e)  => {
  //   e.evt.preventDefault();

  //   const stage = e.target.getStage();

  //   const oldScale = scale;
  //   const pointerPos = stage.getPointerPosition();
  //   const mousePointTo = {
  //     x: (pointerPos.x - stage.x()) / oldScale,
  //     y: (pointerPos.y - stage.y()) / oldScale,
  //   };

  //   const newScale = Math.min(
  //     Math.max(oldScale * (1 + (-e.evt.deltaY) / 1000), 0.2),
  //     2
  //   );

  //   setScale(newScale);

  //   const newPos = {
  //     x: pointerPos.x - mousePointTo.x * newScale,
  //     y: pointerPos.y - mousePointTo.y * newScale,
  //   };

  //   stage.position(newPos);
  //   stage.scale({ x: newScale, y: newScale });
  //   stage.batchDraw();
  // };

  const selectBombOrPlayer = (image, bombObj) => {
    if (image.name !== "player") {
      if (
        bombObj.count !== 1 &&
        transformWrapperRef.current.instance.transformState.scale === 1
      ) {
        setTimeout(() => {
          setBombGroup(bombObj);
        }, 300);
        return;
      }
      setIsDragable(false);
      setBombToTie({
        x: image.x,
        y: image.y,
        name: image.name,
        id: image.id,
        width: image.width,
        height: image.height,
        playerColor: null,
      });
    } else if (image.name === "player") {
      if (bombToTie.x !== null && bombToTie.y !== null) {
        const id = v4().slice(0, 8);
        let updatedElements = elements
          .map((el) => {
            if (el.id === bombToTie.id) {
              return {
                ...el,
                playerId: image.id,
                tierId: id,
                fromId: bombToTie.id,
                freezed: true,
              };
            } else if (el.id === image.id) {
              return {
                ...el,
                tierId: id,
                fromId: bombToTie.id,
                freezed: true,
              };
            }
            return el;
          })
          .sort((a, b) => {
            if (a.freezed && !b.freezed) {
              return -1;
            } else if (!a.freezed && b.freezed) {
              return 1;
            } else {
              return 0;
            }
          });
        updatedElements.unshift({
          tool: "pencil",
          id: id,
          fromId: bombToTie.id,
          toId: image.id,
          name: "tier",
          points: [
            bombToTie.x + bombToTie.width / 2,
            bombToTie.y + bombToTie.height / 2,
            image.x + image.width / 3,
            image.y + image.height / 2,
          ],
          freezed: true,
          strokeColor: color[0],
          drawWidth: 1,
          arrowType: "no-pointer",
          dash: [1, 2],
        });

        setElements(updatedElements);
        setTool(null);
        const newHistory = history.slice(0, currentStep + 1);
        newHistory.push(updatedElements);
        setHistory(newHistory);
        setCurrentStep(newHistory.length - 1);
      }
    }
  };

  const youtubeParser = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  const addVideo = () => {
    const updatedElements = elements.map((el) => {
      if (el.id === addVideoData.videoData.fromId) {
        setAddVideoData({
          isPopupOpen: false,
          videoData: {
            playerId: el.playerId,
            tierId: el.tierId,
            fromId: el.id,
          },
        });
        return {
          ...el,
          videoId: youtubeParser(addingVideoUrl),
        };
      }
      return el;
    });
    setElements(updatedElements);
    setVideoPopup({ isOpen: true, url: youtubeParser(addingVideoUrl) });
    setAddingVideoUrl("");
    setTool(null);
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(updatedElements);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const removeBind = () => {
    const { playerId, fromId, tierId } = addVideoData.videoData;
    let newElements = elements.filter(
      (el) => el.id !== playerId && el.id !== fromId && el.id !== tierId
    );
    setElements(newElements);
    setTool(null);
    const newHistory = history.slice(0, currentStep + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    setAddVideoData({
      isPopupOpen: false,
      videoData: {
        playerId: null,
        tierId: null,
        fromId: null,
      },
    });
    setVideoPopup({ isOpen: false, url: null });
  };

  return (
    <>
      {isAcceptPopupOpen && (
        <AcceptPopup
          accept={() => {
            removeBind();
            setIsAcceptPopupOpen(false);
          }}
          reject={() => {
            setIsAcceptPopupOpen(false);
          }}
        />
      )}
      <GrenadesGroup
        canvasWrapperRef={canvasWrapperRef}
        bombGroup={bombGroup}
        setBombGroup={setBombGroup}
      />
      {videoPopup.isOpen && (
        <VideoPopup
          setVideoPopup={setVideoPopup}
          videoPopup={videoPopup}
          removeBind={() => setIsAcceptPopupOpen(true)}
          setBombToTie={setBombToTie}
        />
      )}
      {addVideoData.isPopupOpen && (
        <UrlPopup
          setBombToTie={setBombToTie}
          setAddingVideoUrl={setAddingVideoUrl}
          setAddVideoData={setAddVideoData}
          addingVideoUrl={addingVideoUrl}
          addVideo={addVideo}
        />
      )}
      <main>
        {/* {pathname === "/stontactics" && (
        <div className={styles.buttons__mobile}>
          <div className={`${styles.grenades} ${styles.grenades__mobile}`}>
            <Button
              secondClass={styles.player__button}
              ico={flashbang}
              onClick={() => addElement("flashbang")}
            />
            <Button
              secondClass={styles.player__button}
              ico={smoke}
              onClick={() => addElement("smoke")}
            />
            <Button
              secondClass={styles.player__button}
              ico={grenade}
              onClick={() => addElement("grenade")}
            />
            <Button
              secondClass={styles.player__button}
              ico={molotov}
              onClick={() => addElement("molotov")}
            />
          </div>
          <div className={styles.other__buttons}>
            <Button ico={fullScreen} onClick={handleFullscreen} />
            <Button
              ico={back}
              className={styles.mobile__disabled}
              onClick={handleUndo}
              secondClass={currentStep === 0 && "disabled"}
            />
            <Button
              ico={forward}
              onClick={handleRedo}
              secondClass={currentStep === history.length - 1 && "disabled"}
            />
            <button
              ref={removeBtnRef}
              className={clsx(
                buttonStyles.setting__button,
                buttonStyles[elements.length === 0 && "disabled"]
              )}
              onClick={deleteAll}
            >
              <img src={trash} alt="" />
            </button>
            <Button ico={folder} onClick={getCanvasCapture} />
            <Button ico={points} onClick={showDrawingMenu}></Button>
          </div>
        </div>
      )} */}
        <div className={styles.parent__canvas}>
          <div className={styles.parent}>
            <section className={styles.map__instruments}>
              <div className={styles.map__wrapper}>
                <Button
                  ico={pencil}
                  onClick={() => {
                    if (tool === "pencil") {
                      setTool(null);
                    } else {
                      setTool("pencil");
                    }
                  }}
                  secondClass={tool === "pencil" && "active"}
                />
                <Button
                  ico={eraser}
                  onClick={() => setToolFunc("eraser")}
                  secondClass={tool === "eraser" && "active"}
                />
                <Button
                  ico={dialog}
                  onClick={() => setShowTextInput((prev) => !prev)}
                  secondClass={tool === "text" && "active"}
                />
                <Button ico={image} />
                <Button ico={video} />
                <Button ico={warning} onClick={() => addElement("warning")} />
                <Button
                  ico={bomb}
                  onClick={() => addElement("bomb")}
                  secondClass={
                    elements.filter((el) => el.name === "bomb").length !== 0 &&
                    "disabled"
                  }
                />
                <Button ico={location} onClick={() => addElement("location")} />
                <Button ico={clock} />
              </div>
            </section>
            <section className={styles.canvas__wrapper_wrapper}>
              <div
                ref={canvasWrapperRef}
                className={clsx(
                  styles.canvas__wrapper,
                  isFullScreen && styles.transform_fullscreen,
                  isDragable && styles.drag__element,
                  (tool === "pencil" || tool === "arrow") && styles.pencil,
                  tool === "eraser" && styles.eraser,
                  !tool && styles.canvas__drag
                )}
              >
                {showTextInput && (
                  <div className={styles.text__input}>
                    <div className={styles.text__input_container}>
                      <input
                        type="text"
                        required
                        placeholder="type.."
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                      />
                      <button onClick={addText}>Add</button>
                    </div>
                  </div>
                )}
                <TransformWrapper
                  disabled={
                    tool || isDragable || !!selectedTextId || bombGroup.name
                  }
                  className={styles.transform__wrapper}
                  wheel={{ disabled: !shiftPressed }}
                  ref={transformWrapperRef}
                >
                  <TransformComponent
                    disabled={tool || isDragable || !!selectedTextId}
                  >
                    <Map mapName={selectedMap} />
                    <Stage
                      pixelRatio={window.devicePixelRatio}
                      ref={stageRef}
                      width={830}
                      height={570}
                      onMouseDown={handleMouseDown}
                      onTouchStart={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onTouchMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onTouchEnd={handleMouseUp}
                      onMouseLeave={() => (isDrawing.current = false)}
                    >
                      <Layer x={830 / 2} y={570 / 2} antialias={true}>
                        {elements.map((element, i) => {
                          if (
                            element.tool === "pencil" ||
                            element.tool === "eraser"
                          ) {
                            const attrs = {
                              key: i,
                              id: String(element.id),
                              x: element.x,
                              y: element.y,
                              points: element.points,
                              stroke: element.strokeColor,
                              strokeWidth:
                                element.tool === "eraser"
                                  ? 16
                                  : element.drawWidth,
                              tension: 0.1,
                              lineCap: "round",
                              lineJoin: "round",
                              globalCompositeOperation:
                                element.tool === "eraser"
                                  ? "destination-out"
                                  : "source-over",
                              pointerAtEnding: true,
                              pointerLength: element.pointerLength,
                              pointerWidth: element.pointerWidth,
                              scaleY: stageRef.current.width() / 830,
                              scaleX: stageRef.current.width() / 830,
                            };

                            return element.arrowType === "pointer-stroke" ? (
                              <Shape
                                {...attrs}
                                sceneFunc={sceneFunc}
                                dash={element.dash ? [18, 10] : false}
                              />
                            ) : (
                              <Line
                                {...attrs}
                                perfectDrawEnabled={true}
                                dash={
                                  Array.isArray(element.dash)
                                    ? element.dash
                                    : element.dash
                                    ? [7, 7]
                                    : false
                                }
                              />
                            );
                          } else if (element.tool === "arrow") {
                            if (
                              !element.points.lastX ||
                              !element.points.lastY
                            ) {
                              return;
                            }

                            const attrs = {
                              key: i,
                              id: element.id,
                              points: [
                                element.points.firstX,
                                element.points.firstY,
                                element.points.lastX,
                                element.points.lastY,
                              ],
                              fill: element.color,
                              stroke: element.color,
                              strokeWidth: element.drawWidth,
                              pointerLength: element.pointerLength,
                              pointerWidth: element.pointerWidth,
                              lineCap: "round",
                            };

                            return element.arrowType === "pointer-stroke" ? (
                              <Shape
                                {...attrs}
                                sceneFunc={sceneFunc}
                                dash={element.isDash ? [18, 10] : false}
                              />
                            ) : (
                              <Arrow
                                {...attrs}
                                pointerAtEnding={
                                  !(element.arrowType === "no-pointer")
                                }
                                dash={element.isDash ? [7, 7] : false}
                              />
                            );
                          }
                        })}
                      </Layer>
                      <Layer x={830 / 2} y={570 / 2} antialias={true}>
                        {elements !== null &&
                          elements.map((element, i) => {
                            if (element.tool === "text") {
                              return (
                                <DrawText
                                  element={element}
                                  id={element.id}
                                  i={i}
                                  isDragable={isDragable}
                                  elements={elements}
                                  setElements={setElements}
                                  handleObjectDragEnd={handleObjectDragEnd}
                                  setSelectedTextId={(id) => {
                                    if (tool) {
                                      return;
                                    }
                                    setSelectedTextId(id);
                                  }}
                                  selectedTextId={selectedTextId}
                                />
                              );
                            } else if (element.tool === "image") {
                              const attrs = {
                                key: i,
                                id: element.id,
                                tierId: element.tierId,
                                fromId: element.fromId,
                                playerId: element.playerId,
                                name: element.name,
                                level: element.level,
                                playerAttrs: element.playerAttrs,
                                playerColor: element.playerColor,
                                x: element.x,
                                y: element.y,
                                file: element.file,
                                draggable: isDragable,
                                freezed: element.freezed,
                                count: element.count,
                                videoId: element.videoId,
                                bombToTie: bombToTie,
                                handleObjectDragEnd,
                                onDragMove: (e) => checkOverlap(e),
                                onClick: (bomb) => {
                                  if (
                                    element.name !== "warning" &&
                                    element.name !== "location" &&
                                    element.name !== "bomb"
                                  ) {
                                    selectBombOrPlayer(bomb, {
                                      name: element.name,
                                      count: element.count,
                                      x: element.x,
                                      y: element.y,
                                    });
                                  }
                                },
                                setVideoPopup: setVideoPopup,
                                setAddVideoData: setAddVideoData,
                              };

                              return <DrawImage {...attrs} />;
                            }
                          })}
                      </Layer>
                    </Stage>
                  </TransformComponent>
                </TransformWrapper>
              </div>
            </section>
            <section className={styles.other__instruments}>
              <div className={styles.other__wrap}>
                <Button ico={fullScreen} onClick={handleFullscreen} />
                <Button
                  ico={back}
                  onClick={handleUndo}
                  secondClass={currentStep === 0 && "disabled"}
                />
                <Button
                  ico={forward}
                  onClick={handleRedo}
                  secondClass={currentStep === history.length - 1 && "disabled"}
                />
                {/* <Button
                 ico={trash}
                 onClick={deleteAll}
                 secondClass={elements.length === 0 && "disabled"}
                 ref={removeBtnRef}
               /> */}
                <button
                  ref={removeBtnRef}
                  className={clsx(
                    buttonStyles.setting__button,
                    buttonStyles[elements.length === 0 && "disabled"]
                  )}
                  onClick={deleteAll}
                >
                  <img src={trash} alt="" />
                </button>
                <Button
                  ico={axis}
                  onClick={dragElements}
                  secondClass={isDragable && "active"}
                />
                <Button ico={folder} onClick={getCanvasCapture} />
              </div>
            </section>
            <section className={styles.drawing__instruments}>
              <div className={styles.strategy__stages}>
                <p className={styles.stages__title}>этапы стратегии:</p>
                <div className={styles.stages}>
                  <StrategyController
                    number="1"
                    active={part === "firstPart"}
                    onClick={() => changePart("firstPart")}
                  />
                  <StrategyController
                    number="2"
                    active={part === "secondPart"}
                    onClick={() => changePart("secondPart")}
                  />
                  <StrategyController
                    number="3"
                    active={part === "thirdPart"}
                    onClick={() => changePart("thirdPart")}
                  />
                  <StrategyController
                    number="4"
                    active={part === "fourthPart"}
                    onClick={() => changePart("fourthPart")}
                  />
                  <StrategyController
                    number="5"
                    active={part === "fifthPart"}
                    onClick={() => changePart("fifthPart")}
                  />
                  <StrategyController
                    number="6"
                    active={part === "sixthPart"}
                    onClick={() => changePart("sixthPart")}
                  />
                  <StrategyController
                    number="7"
                    active={part === "seventhPart"}
                    onClick={() => changePart("seventhPart")}
                  />
                  <StrategyController
                    number="8"
                    active={part === "eighthPart"}
                    onClick={() => changePart("eighthPart")}
                  />
                </div>
              </div>
              <div className={styles.strategy__maps}>
                <p className={styles.map__title}>карта:</p>
                <div className={styles.maps}>
                  <MapsController
                    map="rust"
                    mapName="rust"
                    secondClass={selectedMap === "rust" && "selected"}
                    selectMap={selectMap}
                  />
                  <MapsController
                    map="province"
                    mapName="province"
                    secondClass={selectedMap === "province" && "selected"}
                    selectMap={selectMap}
                  />
                  <MapsController
                    map="sandstone"
                    mapName="sandstone"
                    secondClass={selectedMap === "sandstone" && "selected"}
                    selectMap={selectMap}
                  />
                  <MapsController
                    map="sakura"
                    mapName="sakura"
                    secondClass={selectedMap === "sakura" && "selected"}
                    selectMap={selectMap}
                  />
                  <MapsController
                    map="dune"
                    mapName="dune"
                    secondClass={selectedMap === "dune" && "selected"}
                    selectMap={selectMap}
                  />
                  <MapsController
                    map="breeze"
                    mapName="breeze"
                    secondClass={selectedMap === "breeze" && "selected"}
                    selectMap={selectMap}
                  />
                  <MapsController
                    map="zone 9"
                    mapName="zone"
                    secondClass={selectedMap === "zone" && "selected"}
                    selectMap={selectMap}
                  />
                </div>
              </div>
              <div className={styles.arrows}>
                <p className={styles.arrows__title}>настройка кисти:</p>
                <div className={styles.arrow__types}>
                  <Button
                    ico={brushOne}
                    onClick={() => {
                      if (
                        tool === "pencil" &&
                        arrowType === "no-pointer" &&
                        !isDash
                      ) {
                        setTool(null);
                      } else {
                        setTool("pencil");
                        setArrowType("no-pointer");
                        setIsDash(false);
                      }
                    }}
                    secondClass={
                      tool === "pencil" &&
                      arrowType === "no-pointer" &&
                      !isDash &&
                      "active"
                    }
                  />
                  <Button
                    ico={brushTwo}
                    onClick={() => {
                      if (
                        tool === "pencil" &&
                        arrowType === "pointer-stroke" &&
                        !isDash
                      ) {
                        setTool(null);
                      } else {
                        setTool("pencil");
                        setArrowType("pointer-stroke");
                        setIsDash(false);
                      }
                    }}
                    secondClass={
                      tool === "pencil" &&
                      arrowType === "pointer-stroke" &&
                      !isDash &&
                      "active"
                    }
                  />
                  <Button
                    ico={brushThree}
                    onClick={() => {
                      if (
                        tool === "pencil" &&
                        arrowType === "no-pointer" &&
                        isDash
                      ) {
                        setTool(null);
                      } else {
                        setTool("pencil");
                        setArrowType("no-pointer");
                        setIsDash(true);
                      }
                    }}
                    secondClass={
                      tool === "pencil" &&
                      arrowType === "no-pointer" &&
                      isDash &&
                      "active"
                    }
                  />
                  <Button
                    ico={brushFour}
                    onClick={() => {
                      if (
                        tool === "pencil" &&
                        arrowType === "pointer-stroke" &&
                        isDash
                      ) {
                        setTool(null);
                      } else {
                        setTool("pencil");
                        setArrowType("pointer-stroke");
                        setIsDash(true);
                      }
                    }}
                    secondClass={
                      tool === "pencil" &&
                      arrowType === "pointer-stroke" &&
                      isDash &&
                      "active"
                    }
                  />
                  <Button
                    ico={brushFive}
                    onClick={() => selectArrow("pointer", false)}
                    secondClass={
                      tool === "arrow" &&
                      arrowType === "pointer" &&
                      !isDash &&
                      "active"
                    }
                  />
                  <Button
                    ico={brushSix}
                    onClick={() => selectArrow("pointer", true)}
                    secondClass={
                      tool === "arrow" &&
                      arrowType === "pointer" &&
                      isDash &&
                      "active"
                    }
                  />
                </div>
                <div className={clsx(styles.arrow__settings, "flex-column")}>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={drawWidth}
                    onChange={(e) => setDrawWidth(Number(e.target.value))}
                  />
                  <input
                    min={20}
                    max={60}
                    type="range"
                    value={arrowBrightness}
                    onChange={setArrowBrightnessFunc}
                  />
                  <div className={styles.colors}>
                    {colorsArray.map((el, i) => {
                      return (
                        <div
                          style={{ background: el }}
                          key={i}
                          className={clsx(
                            styles.color,
                            color[1] === i && styles.active
                          )}
                          onClick={() => color !== el && setColor([el, i])}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section className={styles.players__controlls}>
            <div className={styles.first__team}>
              <Button
                secondClass={clsx(
                  elements.filter(
                    (el) =>
                      el.name === "player" &&
                      el.playerAttrs.pos === 0 &&
                      el.playerAttrs.color === "yellow"
                  ).length !== 0 && "disabled"
                )}
                ico={personOneYellow}
                onClick={() =>
                  addElement("player", { pos: 0, color: "yellow" })
                }
              />
              <Button
                secondClass={clsx(
                  elements.filter(
                    (el) =>
                      el.name === "player" &&
                      el.playerAttrs.pos === 1 &&
                      el.playerAttrs.color === "yellow"
                  ).length !== 0 && "disabled"
                )}
                ico={personTwoYellow}
                onClick={() =>
                  addElement("player", { pos: 1, color: "yellow" })
                }
              />
              <Button
                secondClass={clsx(
                  styles.player,
                  elements.filter(
                    (el) =>
                      el.name === "player" &&
                      el.playerAttrs.pos === 2 &&
                      el.playerAttrs.color === "yellow"
                  ).length !== 0 && "disabled"
                )}
                ico={personThreeYellow}
                onClick={() =>
                  addElement("player", { pos: 2, color: "yellow" })
                }
              />
              <Button
                secondClass={clsx(
                  elements.filter(
                    (el) =>
                      el.name === "player" &&
                      el.playerAttrs.pos === 3 &&
                      el.playerAttrs.color === "yellow"
                  ).length !== 0 && "disabled"
                )}
                ico={personFourYellow}
                onClick={() =>
                  addElement("player", { pos: 3, color: "yellow" })
                }
              />
              <Button
                secondClass={clsx(
                  elements.filter(
                    (el) =>
                      el.name === "player" &&
                      el.playerAttrs.pos === 4 &&
                      el.playerAttrs.color === "yellow"
                  ).length !== 0 && "disabled"
                )}
                ico={personFiveYellow}
                onClick={() =>
                  addElement("player", { pos: 4, color: "yellow" })
                }
              />
            </div>
            <div className={`${styles.grenades} ${styles.grenades__pc}`}>
              <Button
                secondClass={styles.player__button}
                ico={flashbang}
                onClick={() => addElement("flashbang")}
              />
              <Button
                secondClass={styles.player__button}
                ico={smoke}
                onClick={() => addElement("smoke")}
              />
              <Button
                secondClass={styles.player__button}
                ico={grenade}
                onClick={() => addElement("grenade")}
              />
              <Button
                secondClass={styles.player__button}
                ico={molotov}
                onClick={() => addElement("molotov")}
              />
            </div>
            <div className={styles.second__team}>
              <Button
                secondClass={clsx(
                  elements.filter(
                    (el) =>
                      el.name === "player" &&
                      el.playerAttrs.pos === 0 &&
                      el.playerAttrs.color === "blue"
                  ).length !== 0 && "disabled"
                )}
                ico={personOneBlue}
                onClick={() => addElement("player", { pos: 0, color: "blue" })}
              />
              <Button
                secondClass={clsx(
                  elements.filter(
                    (el) =>
                      el.name === "player" &&
                      el.playerAttrs.pos === 1 &&
                      el.playerAttrs.color === "blue"
                  ).length !== 0 && "disabled"
                )}
                ico={personTwoBlue}
                onClick={() => addElement("player", { pos: 1, color: "blue" })}
              />
              <Button
                secondClass={clsx(
                  elements.filter(
                    (el) =>
                      el.name === "player" &&
                      el.playerAttrs.pos === 2 &&
                      el.playerAttrs.color === "blue"
                  ).length !== 0 && "disabled"
                )}
                ico={personThreeBlue}
                onClick={() => addElement("player", { pos: 2, color: "blue" })}
              />
              <Button
                secondClass={clsx(
                  elements.filter(
                    (el) =>
                      el.name === "player" &&
                      el.playerAttrs.pos === 3 &&
                      el.playerAttrs.color === "blue"
                  ).length !== 0 && "disabled"
                )}
                ico={personFourBlue}
                onClick={() => addElement("player", { pos: 3, color: "blue" })}
              />
              <Button
                secondClass={clsx(
                  elements.filter(
                    (el) =>
                      el.name === "player" &&
                      el.playerAttrs.pos === 4 &&
                      el.playerAttrs.color === "blue"
                  ).length !== 0 && "disabled"
                )}
                ico={personFiveBlue}
                onClick={() => addElement("player", { pos: 4, color: "blue" })}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default Canvas;
