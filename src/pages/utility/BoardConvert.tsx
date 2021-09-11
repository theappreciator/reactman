import { getFullBoard } from '../../utility/boards';

const BoardConvert: React.FunctionComponent = () => {

    const board = getFullBoard("default");
    
    return (
        <div>
            <h1>Map: {board.name}</h1>
            <pre>
                {board.data}
            </pre>
        </div>
    );
}

export default BoardConvert;