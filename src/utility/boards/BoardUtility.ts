import { reverseString } from '../strings';
import boardDefault from '../../boards/default.json';

export type BoardNames = "default";

export interface BoardData {
    name: string;
    data?: string;
    halfBoard?: string;
}

export type TileType = "edge-corner-top-left" | "edge-corner-top-right" | "edge-corner-bottom-left" | "edge-corner-bottom-right" | "edge-vertical" | "edge-horizontal" |
                        "inside-corner-top-left" | "inside-corner-top-right" | "inside-corner-bottom-left" | "inside-corner-bottom-right" | "inside-vertical" | "inside-horizontal" |
                        "pellet" | "power-pellet" | "empty" | "warp-left" | "warp-right";

export const TileMapping = new Map<string, TileType>();
TileMapping.set("╔", "edge-corner-top-left");
TileMapping.set("╗", "edge-corner-top-right");
TileMapping.set("╚", "edge-corner-bottom-left");
TileMapping.set("╝", "edge-corner-bottom-right");
TileMapping.set("║", "edge-vertical");
TileMapping.set("═", "edge-horizontal");
TileMapping.set("┌", "inside-corner-top-left");
TileMapping.set("┐", "inside-corner-top-right");
TileMapping.set("└", "inside-corner-bottom-left");
TileMapping.set("┘", "inside-corner-bottom-right");
TileMapping.set("│", "inside-vertical");
TileMapping.set("─", "inside-horizontal");
TileMapping.set(".", "pellet");
TileMapping.set("o", "power-pellet");
TileMapping.set("x", "empty");
TileMapping.set("<", "warp-left");
TileMapping.set(">", "warp-right");

const MIRROR_CHARS = new Map();
MIRROR_CHARS.set('╔', '╗');
MIRROR_CHARS.set('╗', '╔');
MIRROR_CHARS.set('╚', '╝');
MIRROR_CHARS.set('╝', '╚');
MIRROR_CHARS.set('║', '║');
MIRROR_CHARS.set('═', '═');
MIRROR_CHARS.set('╦', '╦');
MIRROR_CHARS.set('┌', '┐');
MIRROR_CHARS.set('┐', '┌');
MIRROR_CHARS.set('└', '┘');
MIRROR_CHARS.set('┘', '└');
MIRROR_CHARS.set('─', '─');
MIRROR_CHARS.set('│', '│');
MIRROR_CHARS.set('.', '.');
MIRROR_CHARS.set('o', 'o');
MIRROR_CHARS.set('x', 'x');
MIRROR_CHARS.set('<', '>');
MIRROR_CHARS.set('>', '<');

const getFullBoardArr = (boardName: BoardNames = "default") => {
    const board = getFullBoard(boardName);

    const boardArr: string[][] = [];

    const rowArr = board.data ? board.data?.split("\n") : [];

    const height = rowArr.length;
    const width = rowArr[0].length;
    for (let r = 0; r < height; r++) {
        boardArr[r] = [];
        for (let c = 0; c < width; c++) {
            boardArr[r][c] = rowArr[r].charAt(c);
        }
    }

    return boardArr;
}

const getFullBoard = (boardName: BoardNames = "default") => {

    let board: BoardData;

    switch (boardName) {
        case "default":
        default:
            board = boardDefault;
    }

    fillMirrorData(board);

    return board;
}

const fillMirrorData = (board: BoardData) => {
    const boardDataRows = board.halfBoard ? board.halfBoard?.split("\n") : [];

    const mirroredData = boardDataRows.map(r => {
        const rev = reverseString(r);
        const revMirrored = getMirroredRow(rev);

        return r + revMirrored;
    }).join("\n");

    board.data = mirroredData;
}

const getMirroredRow = (row: string) => {
    const chars: string[] = row.split("");
    return chars.map((c: string) => {
        return MIRROR_CHARS.get(c);
    }).join("");
}

const getTileTypeFromIcon = (icon: string) => {
    return TileMapping.get(icon);
}

export {
    getFullBoardArr,
    getFullBoard,
    getTileTypeFromIcon
}