import DragIcon from "mdi-react/DragIcon";
import Player from "../../constants/Player";
import PlayerTurnSettings from "./PlayerTurnSettings";
import Turn from "../../models/Turn";

interface IProps {
    index: number,
    turn: Turn,
    className: string,
    onValueChange: (turn: Turn | null, index: number) => void,
}

export const PresetEditorTurn = ({index, turn, onValueChange, className, ...otherProps}: IProps) =>
    <div className={className} {...otherProps}>
        <div className="column is-1 has-text-vcentered is-size-5 has-text-grey has-text-left">
            <DragIcon className="has-text-grey has-cursor-grab is-drag-handle is-size-3" />
            {index + 1}</div>
        <div className="column has-text-centered">
            <PlayerTurnSettings player={Player.HOST} turn={turn} key={'host-' + index} index={index}/>
        </div>
        <div className="column has-text-centered">
            <PlayerTurnSettings player={Player.NONE} turn={turn} key={'host-' + index} index={index}/>
        </div>
        <div className="column has-text-centered">
            <PlayerTurnSettings player={Player.GUEST} turn={turn} key={'host-' + index} index={index}/>
        </div>
        <div className="column is-1 has-text-vcentered flex-justify-center">
            <button className="delete is-medium" onClick={() => {
                onValueChange(null, index);
            }}/>
        </div>
    </div>;
