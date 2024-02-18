import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Stage, Layer, Line, Text, Arrow, Shape } from "react-konva";
import clsx from "clsx";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { v4 as uuid } from "uuid";

import { setMatchPart } from "../../store/matchPartsSlice/matchPartsSlice";

import MapsController from "../mapsController/MapsController";
import Button from "../button/Button";
import Map from "../canvas/Map";
import DrawImage from "../canvas/DrawImage";
import VideoPopup from "../video-popup/VideoPopup";
import UrlPopup from "../url-popup/UrlPopup";

import smokeMap from "../../img/icons/smoke_map.svg";
import grenadeMap from "../../img/icons/grenade_map.svg";
import molotovMap from "../../img/icons/molotov_map.svg";

import flashbang from "../../img/icons/flash.svg";
import smoke from "../../img/icons/smoke.svg";
import grenade from "../../img/icons/grenade.svg";
import molotov from "../../img/icons/Subtract-10.svg";
import personT from "../../img/icons/person-fill-t.svg";
import personCT from "../../img/icons/person-fill-ct.svg";

import axis from "../../img/icons/Vector-3.svg";
import fullScreen from "../../img/icons/Union-2.svg";

import styles from "./grenades.module.scss";
import GrenadesGroup from "../grenades-group/GrenadesGroup";

const elementImages = {
  flashbang: flashbang,
  smoke: smokeMap,
  grenade: grenadeMap,
  molotov: molotovMap,
};

const Grenades = () => {
  const [grenadeRadio, setGrenadeRadio] = useState("terside");

  const [isFullScreen, setIsFullScreen] = useState(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 830,
    height: 570,
    scale: 1,
  });

  const [elements, setElements] = useState([]);

  const [selectedTextId, setSelectedTextId] = useState(null);

  const [selectedMap, setSelectedMap] = useState("rust");

  const [shiftPressed, setShiftPressed] = useState(false);

  const [tool, setTool] = useState(null);

  const [isDragable, setIsDragable] = useState(false);

  const [bombToTie, setBombToTie] = useState({
    x: null,
    y: null,
    name: null,
    id: null,
    width: null,
    height: null,
    playerColor: null,
  });

  const [addVideoData, setAddVideoData] = useState({
    isPopupOpen: false,
    playerData: {
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

  const stageRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const transformWrapperRef = useRef(null);

  useEffect(() => {
    // dispatch(
    //   setMatchPart({ partName: part, partElements: history[currentStep] })
    // );
  }, [history, elements]);

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
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
        setTool(null);
        setIsDragable(false);
      } else {
        setIsFullScreen(false);
        setCanvasSize({ width: 830, height: 570 });
      }
    });
  }, []);

  useEffect(() => {
    if (!!tool) {
      setIsDragable(false);
      document.body.style.overflow = "hidden";
    } else if (!tool) {
      document.body.style.overflow = "visible";
    }
  }, [tool]);

  const dragElements = () => {
    setTool(null);
    setIsDragable(!isDragable);
  };

  const handleObjectDragEnd = (id, e, name, playerLevel = null, count) => {
    var updatedElements;
    var idToRemove;
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
          !el.freezed
        ) {
          if (
            el.x - 20 < e.target.x() &&
            e.target.x() < el.x + 20 &&
            el.y - 20 < e.target.y() &&
            e.target.y() < el.y + 20
          ) {
            idToRemove = id;
            return {
              // ...elements.filter((ele) => ele.id === el.id)[0],
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
    if (idToRemove !== undefined) {
      setElements(
        updatedElements.filter((el) => {
          return el.id !== idToRemove;
        })
      );
    } else {
      setElements(updatedElements);
    }
  };

  const addElement = (elementName, playerAttrs) => {
    const id = uuid();
    const newElements = [
      ...elements,
      {
        tool: "image",
        id: elements.length + "",
        level: "down",
        playerAttrs: playerAttrs,
        playerColor: false,
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
  };

  const selectMap = (mapName) => {
    if (selectedMap !== mapName) {
      setSelectedMap(mapName);
    }
  };

  const selectBombOrPlayer = (image, bombObj) => {
    if (image.name !== "player" && image.name !== "bomb") {
      if (image.freezed) return;
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
        let updatedElements = elements.map((el) => {
          if (el.id === image.id || el.id === bombToTie.id) {
            return {
              ...el,
              tierId: elements.length + "",
              fromId: bombToTie.id,
              freezed: true,
              playerColor: image.playerColor,
            };
          }
          return el;
        });
        updatedElements.unshift({
            tool: "pencil",
            id: elements.length + "",
            fromId: bombToTie.id,
            toId: image.id,
            name: "tier",
            points: [
              bombToTie.x + bombToTie.width / 2,
              bombToTie.y + bombToTie.height / 2,
              image.x + image.width / 3,
              image.y + image.height / 2,
            ],
            strokeColor: "#FFFFFF",
            drawWidth: 1,
            arrowType: "no-pointer",
            dash: [1, 2],
            playerColor: image.playerColor,
          },
        );

        setTool(null);
        setElements(updatedElements);
        setBombToTie({
          x: null,
          y: null,
          name: null,
          id: null,
        });
        // setAddVideoData({ isPopupOpen: true, playerId: image.id });
      } else {
        setBombToTie({
          x: null,
          y: null,
          name: null,
          id: null,
        });
      }
    }
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

  const youtubeParser = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  const addVideo = () => {
    const updatedElements = elements.map((el) => {
      if (el.id === addVideoData.playerData.playerId || el.id === addVideoData.playerData.fromId) {
        setAddVideoData({
          isPopupOpen: false,
          playerData: {
            playerId: el.id,
            tierId: el.tierId,
            fromId: el.fromId,
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
  };

  const removeBind = () => {
    const { playerId, fromId, tierId } = addVideoData.playerData;
    console.log(playerId, fromId, tierId)
    let newElements = elements.filter(
      (el) => el.id !== playerId && el.id !== fromId && el.id !== tierId
    );
    setElements(newElements);
    setTool(null);
    setAddVideoData({
      isPopupOpen: false,
      playerData: {
        playerId: null,
        tierId: null,
        fromId: null,
      },
    });
    setVideoPopup({ isOpen: false, url: null });
  };

  return (
    <>
      <GrenadesGroup
        canvasWrapperRef={canvasWrapperRef}
        bombGroup={bombGroup}
        setBombGroup={setBombGroup}
      />
      {videoPopup.isOpen && (
        <VideoPopup setVideoPopup={setVideoPopup} videoPopup={videoPopup} removeBind={removeBind} />
      )}
      {addVideoData.isPopupOpen && (
        <UrlPopup
          setAddingVideoUrl={setAddingVideoUrl}
          setAddVideoData={setAddVideoData}
          addingVideoUrl={addingVideoUrl}
          addVideo={addVideo}
        />
      )}
      <main>
        <div className={styles.content}>
          <section className={styles.grenades}>
            <div className={styles.grenades__wrapper}>
              <div className={styles.strategy__maps}>
                <p className={styles.map__title}>карта</p>
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
              <section className={styles.canvas__wrapper_wrapper}>
                <div
                  ref={canvasWrapperRef}
                  className={clsx(
                    styles.canvas__wrapper,
                    isDragable && styles.drag__element,
                    !tool && styles.canvas__drag
                  )}
                >
                  <TransformWrapper
                    disabled={
                      tool || isDragable || !!selectedTextId || bombGroup.name
                    }
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
                      >
                        <Layer x={830 / 2} y={570 / 2} antialias={true}>
                          {elements.map((element, i) => {
                            if (element.tool === "pencil") {
                              const attrs = {
                                key: i,
                                id: String(element.id),
                                x: element.x,
                                y: element.y,
                                dash: [1, 2],
                                points: element.points,
                                stroke: element.strokeColor,
                                strokeWidth:
                                  element.tool === "eraser"
                                    ? 16
                                    : element.drawWidth,
                                tension: 0.1,
                                lineCap: "round",
                                lineJoin: "round",
                                scaleY: stageRef.current.width() / 830,
                                scaleX: stageRef.current.width() / 830,
                                perfectDrawEnabled: true,
                              };

                              if (
                                element?.playerColor === "yellow" &&
                                grenadeRadio === "terside"
                              ) {
                                return <Line {...attrs} />;
                              } else if (
                                element?.playerColor === "blue" &&
                                grenadeRadio === "ctside"
                              ) {
                                return <Line {...attrs} />;
                              } else if (grenadeRadio === "duoside") {
                                return <Line {...attrs} />;
                              }
                            }
                          })}
                        </Layer>
                        <Layer x={830 / 2} y={570 / 2} antialias={true}>
                          {elements !== null &&
                            elements.map((element, i) => {
                              if (element.tool === "image") {
                                const attrs = {
                                  id: element.id,
                                  name: element.name,
                                  level: element.level,
                                  playerAttrs: element.playerAttrs,
                                  playerColor: element.playerColor,
                                  x: element.x,
                                  y: element.y,
                                  count: element.count,
                                  tierId: element.tierId,
                                  fromId: element.fromId,
                                  file: element.file,
                                  draggable: isDragable,
                                  freezed: element.freezed,
                                  videoId: element.videoId,
                                  bombToTie: bombToTie,
                                  handleObjectDragEnd,
                                  onDragMove: (e) => checkOverlap(e),
                                  onClick: (bomb) =>
                                    selectBombOrPlayer(bomb, {
                                      name: element.name,
                                      count: element.count,
                                      x: element.x,
                                      y: element.y,
                                    }),
                                  setAddVideoData: setAddVideoData,
                                  setVideoPopup: setVideoPopup,
                                };

                                if (grenadeRadio === "duoside") {
                                  return <DrawImage {...attrs} />;
                                } else if (
                                  element?.playerAttrs?.color === "yellow" &&
                                  grenadeRadio === "terside"
                                ) {
                                  return <DrawImage {...attrs} />;
                                } else if (
                                  element?.playerAttrs?.color === "blue" &&
                                  grenadeRadio === "ctside"
                                ) {
                                  return <DrawImage {...attrs} />;
                                } else if (
                                  element.name === "grenade" ||
                                  element.name === "molotov" ||
                                  element.name === "smoke" ||
                                  element.name === "flashbang"
                                ) {
                                  return <DrawImage {...attrs} />;
                                }
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
                  {/* <Button
                 ico={trash}
                 onClick={deleteAll}
                 secondClass={elements.length === 0 && "disabled"}
                 ref={removeBtnRef}
               /> */}
                  {/* <button
                    ref={removeBtnRef}
                    className={clsx(
                      buttonStyles.setting__button,
                      buttonStyles[elements.length === 0 && "disabled"]
                    )}
                    onClick={deleteAll}
                  >
                    <img src={trash} alt="" />
                  </button> */}
                  <Button
                    ico={axis}
                    onClick={dragElements}
                    secondClass={isDragable && "active"}
                  />
                  {/* <Button ico={folder} onClick={getCanvasCapture} /> */}
                </div>
              </section>
              <div className={styles.instruments__wrap}>
                <p className={styles.section__name}>Раскид</p>
                <div
                  className={`${styles.select__grenade} ${styles.select__first}`}
                >
                  <Button
                    secondClass="selector"
                    ico={flashbang}
                    onClick={() => addElement("flashbang")}
                    grenadename="Флешки"
                  />
                  <Button
                    secondClass="selector"
                    ico={smoke}
                    onClick={() => addElement("smoke")}
                    grenadename="Смоки"
                  />
                </div>
                <div className={styles.select__grenade}>
                  <Button
                    secondClass="selector"
                    ico={molotov}
                    onClick={() => addElement("molotov")}
                    grenadename="Молотовы"
                  />
                  <Button
                    secondClass="selector"
                    ico={grenade}
                    onClick={() => addElement("grenade")}
                    grenadename="Хае"
                  />
                </div>

                <p
                  className={`${styles.section__name} ${styles.side__name__title}`}
                >
                  Привязка игрока
                </p>

                <div className={styles.select__side}>
                  <div className={styles.side}>
                    <input
                      type="radio"
                      name="sides"
                      id="terside"
                      value="terside"
                      checked={grenadeRadio === "terside"}
                      onChange={() => setGrenadeRadio("terside")}
                    />
                    <label htmlFor="terside" className={styles.side__name}>
                      Terrorists <span className={styles.ter}>(Атака)</span>
                    </label>
                  </div>
                  <div className={styles.side}>
                    <input
                      type="radio"
                      name="sides"
                      id="ctside"
                      value="ctside"
                      checked={grenadeRadio === "ctside"}
                      onChange={() => setGrenadeRadio("ctside")}
                    />
                    <label htmlFor="ctside" className={styles.side__name}>
                      Counter-terrorists{" "}
                      <span className={styles.ct}>(Защита)</span>
                    </label>
                  </div>
                  <div className={styles.side}>
                    <input
                      type="radio"
                      name="sides"
                      id="duoside"
                      value="duoside"
                      checked={grenadeRadio === "duoside"}
                      onChange={() => setGrenadeRadio("duoside")}
                    />
                    <label htmlFor="duoside" className={styles.side__name}>
                      Обе <span className={styles.duo}>(T и CT)</span>
                    </label>
                  </div>
                </div>
                <div className={styles.grenade__player}>
                  {(grenadeRadio === "terside" ||
                    grenadeRadio === "duoside") && (
                    <Button
                      secondClass="player"
                      ico={personT}
                      onClick={() =>
                        addElement("player", { pos: 5, color: "yellow" })
                      }
                    />
                  )}
                  {(grenadeRadio === "ctside" ||
                    grenadeRadio === "duoside") && (
                    <Button
                      secondClass="player"
                      ico={personCT}
                      onClick={() =>
                        addElement("player", { pos: 5, color: "blue" })
                      }
                    />
                  )}
                </div>
                <div className={styles.select__type}>
                  <div className={styles.grenade__type}>
                    <p className={styles.type__name}>Раскидки от STON</p>
                  </div>
                  <div className={`${styles.grenade__type} ${styles.selected}`}>
                    <p className={styles.type__name}>Кастом</p>
                  </div>
                  <div className={styles.grenade__type}>
                    <p className={styles.type__name}>От топ игроков</p>
                    <div className={styles.pro__wrap}>
                      <div className={styles.pro}>PRO</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
export default Grenades;
