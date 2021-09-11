import { getTileTypeFromIcon } from "../../../utility/boards";
import { convertKebabCaseToCamelCase } from "../../../utility/strings";
import styles from "./Tile.module.scss";


export interface TileProps {
    icon: string;
}

const Tile: React.FunctionComponent<TileProps> = ({
    icon
}) => {

    const tileType = getTileTypeFromIcon(icon);
    const className = convertKebabCaseToCamelCase(tileType?.toString());
    const theTile = <div className={className ? styles[className] : ""}></div>

    return (
        <div className={styles.Tile}>
            {theTile}
        </div>
    );
}

export default Tile;