import { useEffect, useRef, useState } from 'react';
import GameBoard from '../../components/board/GameBoard';
import ReactMan, { ReactManDirection } from '../../components/ReactMan';
import useKeyDown from '../../hooks/useKeyDown';
import { getFullBoardArr, getTileTypeFromIcon } from '../../utility/boards';
import styles from './TheGame.module.scss';
import * as d3 from 'd3-timer';

const CELL_SIZE = 26;

const BOARD_WIDTH = 27;
const BOARD_HEIGHT = 30;

const TIMEOUT_TIME_MOVEMENT = 500;

const BOARD_ARR = getFullBoardArr("default");

const TIMEOUT_TIME_FLASHING = 500;
const MAX_FLASHES = 4; // even number to start hidden and end visible


// const flashReactMan = (isVisible: boolean, flashCount: number, visibleCallback: (isVisible: boolean) => void, doneFlashingCallback: (isDone: boolean) => void) => {        
//     console.log("Flashing", flashCount, isVisible);
//     if (flashCount <= MAX_FLASHES) {

//         visibleCallback(isVisible);

//         setTimeout(() => flashReactMan(!isVisible, flashCount + 1, visibleCallback, doneFlashingCallback), TIMEOUT_TIME_FLASHING);
//     }
//     else {
//         doneFlashingCallback(true);
//     }

// }

// const flashReactManOnce = (isVisible: boolean, flashCount: number, visibleCallback: (isVisible: boolean) => void, doneFlashingCallback: (isDone: boolean) => void) => {        
//     console.log("Flashing", flashCount, isVisible);
//     if (flashCount <= MAX_FLASHES) {

//         //visibleCallback(isVisible);

//         //setTimeout(() => flashReactMan(!isVisible, flashCount + 1, visibleCallback, doneFlashingCallback), TIMEOUT_TIME_FLASHING);
//     }
//     else {
//         doneFlashingCallback(true);
//     }

//}

const TheGame: React.FunctionComponent = () => {

    console.log("=======================");
    console.log("Firing TheGame component");

    //const [position, setPosition] = useState([23, 13]);
    //const [direction, setDirection] = useState<ReactManDirection>("left");
    const keyPressed = useKeyDown(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
    //const [reactManVisible, setReactManVisible] = useState(false);
    //const [doneFlashing, setDoneFlashing] = useState(false);
    //const [isRunning, setIsRunning] = useState(false);
    //const [paused, setPaused] = useState(true);
    //const [ticks, setTicks] = useState(0);

    const [redrawToggle, setRedrawToggle] = useState(false);


    const isPausedRef = useRef(true);
    const isStartedRef = useRef(false);
    const directionRef = useRef<ReactManDirection>("left");
    const positionRef = useRef([23, 13]);
    const isReactManVisibleRef = useRef(false);

    // fire once on start
    useEffect(() => {

        console.log("useEffect once on load");

        let flashCount = 0;
        const flashReactMan = () => {        
            console.log("Flashing", flashCount);

            if (flashCount <= MAX_FLASHES) {
                //setReactManVisible((prev) => !prev);
                isReactManVisibleRef.current = !isReactManVisibleRef.current;
                setRedrawToggle((r) => !r);

                flashCount++;
            }
            else {
                isPausedRef.current = false;
                isStartedRef.current = true;
            }
        
        }


        let ticks = 0;
        const runLoop = () => {
            console.log("runLoop: " + ticks);
            if (!isStartedRef.current) {
                flashReactMan();
            }
            else {

                // const directionPrev = directionRef.current;
                // const positionPrev = positionRef.current;

                move(directionRef.current, positionRef.current);

                // // If things changed then repaint the screen
                // if (directionPrev != directionRef.current ||
                //     positionPrev != positionRef.current) {
                //     setRedrawToggle(r => !r);
                // }
            }

            ticks++;
        }

        const t = d3.interval(runLoop, TIMEOUT_TIME_FLASHING);

        return () => {
            console.log(" --- Stopping timer from unmounting");
            t.stop();
        }

    }, []);

    useEffect(() => {
        console.log("useEffect for redrawToggle: " + redrawToggle);

    }, [redrawToggle]);

    // //fire when the position changes
    // useEffect(() => {
    //     console.log("useEffect for position: " + position);

    //     positionRef.current = position;

    // }, [position]);

    // fire when a key is pressed
    useEffect(() => {
        if (isStartedRef.current && !isPausedRef.current) {
            const currentDirection = directionRef.current;
            const currentPosition = positionRef.current;
            console.log("Key pressed: " + currentDirection + " " + currentPosition);
            switch(keyPressed) {
                case undefined:
                    break;
                case "ArrowLeft":
                    if (currentDirection != "left") {
                        moveLeft(currentPosition);
                    }
                    break;
                case "ArrowRight":
                    if (currentDirection != "right") {
                        moveRight(currentPosition);
                    }
                    break;
                case "ArrowUp":
                    if (currentDirection != "up") {
                        moveUp(currentPosition);
                    }
                    break;
                case "ArrowDown":
                    if (currentDirection != "down") {
                        moveDown(currentPosition);
                    }
                    break;
            }
        }
    }, [keyPressed]);

    // useEffect(() => {
    //     console.log("useEffect for doneFlashing: " + doneFlashing);

    //     if (doneFlashing) {
    //         console.log("We are done flashing");
    //     }
    // }, [doneFlashing]);

    // useEffect(() => {
    //     console.log("About to check is running in effect: " + runLoopStarted);
    //     if (runLoopStarted) {

    //         setIsRunning(true);

    //         console.log("About to start d3 timer");

    //         const t = d3.interval(runLoop, 1 * 1000);
    //         setTimer(t);

    //         // return () => {
    //         //     console.log("stopping d3 timer due to unmounting");
    //         //     t.stop();
    //         // }
    //     }
    //     else {
    //         console.log("Stopping d3 timer");
    //         timer?.stop();
    //     }
    // }, [runLoopStarted]);

    // useEffect(() => {
    //     const t = d3.interval(runLoop, 1 * 1000);
    //     setTimer(t);
    //     const stopTimer = () => {
    //         console.log("Stopping timer from anony func");
    //         t.stop();
    //     }
    //     return () => stopTimer();
    // }, [isRunning]);

    // useEffect(() => {
    //     console.log("Running update: " + isRunning);
    // }, [isRunning]);

    // // fire when doneFlashing = true
    // useEffect(() => {
    //     if (doneFlashing) {
    //         //setRunLoopStarted(true);
    //     }
    // }, [doneFlashing]);

    // // fire when the run loop has started
    // // useEffect(() => {
    // //     if (!isRunning && runLoopStarted) {
    // //         setPaused(false);
            
    // //         //runLoop();
    // //         //requestAnimationFrame(runLoop);
    // //     }
    // // }, [isRunning, runLoopStarted]);

    // useEffect(() => {
    //     console.log("Ticks update: " + ticks);
    // }, [ticks]);





    // const runLoop = () => {
    //     console.log("runLoop started: " + isRunning + " " + direction + " " + paused + " " + ticks);

    //     setTicks((ticks) => {
    //         console.log("runLoop ticks:   " + isRunning + " " + direction + " " + paused + " " + ticks);
    //         return ticks + 1;
    //     });

    //     // if (!isRunning) {
    //     //     console.log("About to set isRunning to true");
    //     //     setIsRunning((isRunning) => !isRunning);
    //     // }

    //     /*

    //     move(direction);

    //     setTimeout(runLoop, TIMEOUT_TIME_MOVEMENT);
    //     //requestAnimationFrame(runLoop);
    //     */
    // }




    const isValidBoardMove = (position: number[], board: string[][]) => {
        const row = position[0];
        const col = position[1];

        const tileType = getTileTypeFromIcon(board[row][col]);

        return tileType !== undefined && ["pellet", "power-pellet", "warp-left", "warp-right"].includes(tileType);
    }

    const move = (direction: ReactManDirection, currentPosition: number[]) => {
        console.log("Moving " + direction.toString() + " " + currentPosition);
        let moveFunc: (currentPosition: number[]) => boolean;

        const directionPrev = directionRef.current;
        const positionPrev = positionRef.current;

        switch(direction) {
            case "left":
                moveFunc = moveLeft;
                break;
            case "right":
                moveFunc = moveRight;
                break;
            case "up":
                moveFunc = moveUp;
                break;
            case "down":
                moveFunc = moveDown;
                break;
        }

        moveFunc(currentPosition);

        // If things changed then repaint the screen
        if (directionPrev != directionRef.current ||
            positionPrev != positionRef.current) {
            setRedrawToggle(r => !r);
        }
    }

    const moveLeft = (currentPosition: number[]) => {
        let newCol = currentPosition[1] - 1;
        const tileType = getTileTypeFromIcon(BOARD_ARR[currentPosition[0]][newCol]);
        if (tileType === "warp-left") {
            newCol = BOARD_WIDTH;
        }
        const newPosition = [currentPosition[0], newCol];
        if (isValidBoardMove(newPosition, BOARD_ARR)) {
            //clearTimeout(timerId);
            directionRef.current = "left";
            positionRef.current = newPosition;

            return true;
        }

        return false;
    };

    const moveRight = (currentPosition: number[]) => {
        let newCol = currentPosition[1] + 1;
        const tileType = getTileTypeFromIcon(BOARD_ARR[currentPosition[0]][newCol]);
        if (tileType === "warp-right") {
            newCol = 0;
        }
        const newPosition = [currentPosition[0], newCol];
        if (isValidBoardMove(newPosition, BOARD_ARR)) {
            //clearTimeout(timerId);
            directionRef.current = "right";
            positionRef.current = newPosition;

            return true;
        }

        return false;
    };

    const moveUp = (currentPosition: number[]) => {
        let newRow = currentPosition[0] - 1;
        const newPosition = [newRow, currentPosition[1]];
        if (isValidBoardMove(newPosition, BOARD_ARR)) {
            //clearTimeout(timerId);
            directionRef.current = "up";
            positionRef.current = newPosition;

            return true;
        }

        return false;
    };

    const moveDown = (currentPosition: number[]) => {
        let newRow = currentPosition[0] + 1;
        const newPosition = [newRow, currentPosition[1]];
        if (isValidBoardMove(newPosition, BOARD_ARR)) {
            //clearTimeout(timerId);
            directionRef.current = "down";
            positionRef.current = newPosition;

            return true;
        }

        return false;
    };

    const topPosition = positionRef.current[0] * CELL_SIZE;
    const leftPosition = positionRef.current[1] * CELL_SIZE;

    return (
        <div className={styles.TheGame}>
            <h1>React-Man</h1>
            <GameBoard boardArr={BOARD_ARR}>
                <ReactMan top={topPosition} left={leftPosition} direction={directionRef.current} visible={isReactManVisibleRef.current}/>
            </GameBoard>
            
        </div>
    )
}

export default TheGame;
