import Tile from "./tiles/Tile";
import { BoardNames } from "../../utility/boards";
import styles from './GameBoard.module.scss';


export interface GameBoardProps {
    boardArr: string[][];
    boardName?: BoardNames,
    children: JSX.Element;
}

const GameBoard: React.FunctionComponent<GameBoardProps> = ({
    boardArr,
    boardName,
    children
}) => {

    //const board = getFullBoard(boardName);
    //const boardArr = getFullBoardArr(boardName);

    return (
        <div className={styles.GameBoard}>
            <div className={styles.board}>
                {boardArr?.map((row, r) => (
                    <div key={`row-${r}`} className={styles.row}>
                        {row.map((col, c) => (
                            <div key={`col-${c}`} className={styles.col}>
                                <Tile icon={col}/>
                            </div>
                        ))}
                    </div>
                ))}
                {children}
            </div>
            
        </div>
    );
}

export default GameBoard;