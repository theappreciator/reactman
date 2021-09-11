import styles from './ReactMan.module.scss';

export type ReactManDirection = "up" | "right" | "down" | "left";

export interface ReactManProps {
    left: number;
    top: number;
    direction: ReactManDirection;
    visible: boolean;
}

const ReactMan: React.FunctionComponent<ReactManProps> = ({
    top,
    left,
    direction,
    visible
}) => {
    
    return (
        <div className={styles.ReactMan} style={{top: top + 3, left: left + 3, visibility: visible ? "visible" : "hidden"}}>
            <div className={`${styles.mouth} ${styles[direction]}`}></div>
        </div>
    );
}

export default ReactMan;