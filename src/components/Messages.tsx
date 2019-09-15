import * as React from 'react';
import '../pure-min.css'
import '../style2.css'
import {Trans, WithTranslation, withTranslation} from "react-i18next";
import Countdown from "../containers/Countdown";
import Player from "../models/Player";
import Turn from "../models/Turn";
import Action from "../models/Action";

interface IProps extends WithTranslation {
    whoAmI: Player | undefined,
    hostReady: boolean,
    guestReady: boolean,
    nameHost: string,
    nameGuest: string,
    nextTurn: Turn | null;
    sendReady: () => void
}

class Messages extends React.Component<IProps, object> {
    public render() {

        if (!this.props.hostReady || !this.props.guestReady) {
            if (this.props.whoAmI === Player.HOST) {
                if (this.props.hostReady) {
                    return (
                        <div><Trans i18nKey='messages.waitingForGuestReady'>Waiting for Guest to press ›ready‹</Trans>
                        </div>
                    );
                } else {
                    if (this.props.guestReady) {
                        return (
                            <div><Trans i18nKey='messages.pressReadyGuestIsReady'>Your guest is ready to start.
                                Press <button className={'shadowbutton text-primary'}
                                onClick={this.props.sendReady}>Ready</button> once you are also ready to
                                start!</Trans></div>
                        );
                    } else {
                        return (
                            <div><Trans i18nKey='messages.pressReady'>Press <button
                                className={'shadowbutton text-primary'}
                                onClick={this.props.sendReady}>Ready</button> once you are ready
                                to start!</Trans></div>
                        );
                    }
                }
            } else if (this.props.whoAmI === Player.GUEST) {
                if (this.props.guestReady) {
                    return (
                        <div><Trans i18nKey='messages.waitingForHostReady'>Waiting for Host to press ›ready‹</Trans>
                        </div>
                    );
                } else {
                    if (this.props.hostReady) {
                        return (
                            <div><Trans i18nKey='messages.pressReadyHostIsReady'>Your host is ready to start.
                                Press <button className={'shadowbutton text-primary'}
                                onClick={this.props.sendReady}>Ready</button> once you are also ready to
                                start!</Trans></div>
                        );
                    } else {
                        return (
                            <div><Trans i18nKey='messages.pressReady'>Press <button
                                className={'shadowbutton text-primary'}
                                onClick={this.props.sendReady}>Ready</button> once you are ready
                                to start!</Trans></div>
                        );
                    }
                }
            } else {
                if (!this.props.hostReady && !this.props.guestReady) {
                    return (
                        <div><Trans i18nKey='messages.waitingForBothToBeReady'>Waiting for players to get
                            ready…</Trans></div>
                    );
                } else if (!this.props.hostReady) {
                    return (
                        <div><Trans i18nKey='messages.waitingForHostToBeReady'>Waiting for Host to get
                            ready…</Trans></div>
                    );
                } else {
                    return (
                        <div><Trans i18nKey='messages.waitingForGuestToBeReady'>Waiting for Guest to get
                            ready…</Trans></div>
                    );
                }
            }
        }

        const nextTurn = this.props.nextTurn;
        if (nextTurn !== null) {
            if (this.props.whoAmI === Player.NONE) {
                let playerName = "";
                if (nextTurn.player === Player.HOST) {
                    playerName = this.props.nameHost;
                } else if (nextTurn.player === Player.GUEST) {
                    playerName = this.props.nameGuest;
                }
                switch (nextTurn.action) {
                    case Action.PICK:
                        return (
                            <div><Trans i18nKey='messages.specPick'>Waiting for <b>{{playerName}}</b> to <span
                                className='green-glow'><b>pick</b></span> a
                                civilization</Trans>
                                <Countdown/></div>
                        );
                    case Action.BAN:
                        return (
                            <div><Trans i18nKey='messages.specBan'>Waiting for <b>{{playerName}}</b> to <span
                                className='red-glow'><b>ban</b></span> a
                                civilization</Trans>
                                <Countdown/></div>
                        );
                    case Action.SNIPE:
                        return (
                            <div><Trans i18nKey='messages.specSnipe'>Waiting for <b>{{playerName}}</b> to <span
                                className='blue-glow'><b>snipe</b></span> a
                                civilization of the opponent</Trans> <Countdown/></div>
                        );
                }
            } else {
                if (nextTurn.player === this.props.whoAmI) {
                    switch (nextTurn.action) {
                        case Action.PICK:
                            return (
                                <div><Trans i18nKey='messages.doPick'><span className='green-glow'><b>Pick</b></span> a
                                    civilization!</Trans>
                                    <Countdown/></div>
                            );
                        case Action.BAN:
                            return (
                                <div><Trans i18nKey='messages.doBan'><span className='red-glow'><b>Ban</b></span> a
                                    civilization!</Trans>
                                    <Countdown/></div>
                            );
                        case Action.SNIPE:
                            return (
                                <div><Trans i18nKey='messages.doSnipe'><span className='blue-glow'><b>Snipe</b></span> a
                                    civilization of the
                                    opponent!</Trans> <Countdown/></div>
                            );
                    }
                } else if (nextTurn.player === Player.NONE) {
                    const action = nextTurn.action.toString();
                    return (
                        <div><Trans i18nKey='messages.adminAction'>Admin action: {action}</Trans></div>
                    );
                } else {
                    switch (nextTurn.action) {
                        case Action.PICK:
                            return (
                                <div><Trans i18nKey='messages.waitingForPick'>Waiting for the other captain to
                                    pick…</Trans>
                                    <Countdown/></div>
                            );
                        case Action.BAN:
                            return (
                                <div><Trans i18nKey='messages.waitingForBan'>Waiting for the other captain to
                                    ban…</Trans>
                                    <Countdown/></div>
                            );
                        case Action.SNIPE:
                            return (
                                <div><Trans i18nKey='messages.waitingForSnipe'>Waiting for the other captain to snipe
                                    one of
                                    your civilisations…</Trans>
                                    <Countdown/></div>
                            );
                    }
                }
            }

            const message = nextTurn.player.toString() + ': ' + nextTurn.action.toString();
            return (
                <div><Trans i18nKey='messages.genericTurnMessage'>{message}</Trans></div>
            );
        } else {
            return (
                <div><Trans i18nKey='messages.finished'>Finished.</Trans></div>
            );
        }
    }
}

export default withTranslation()(Messages);
