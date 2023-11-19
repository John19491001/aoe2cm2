import {expect, it, vi} from 'vitest';
import Preset from "../../models/Preset";
import Turn from "../../models/Turn";
import Exclusivity from "../../constants/Exclusivity";
import Player from "../../constants/Player";
import Action from "../../constants/Action";

vi.mock('uuid');

it('preset from invalid pojo throws', () => {
    expect(() => {
        Preset.fromPojo({turns: [{} as Turn, {} as Turn]} as { name: string, encodedCivilisations: string, turns: Turn[] });
    }).toThrowError("Expected argument to be string, but was undefined");
});

it('preset from valid pojo works', () => {
    const fromPojo = Preset.fromPojo({
        name: "some-name",
        encodedCivilisations: "0x1",
        turns: [{
            player: "GUEST",
            action: "PICK",
            exclusivity: Exclusivity.NONEXCLUSIVE,
            hidden: false,
            parallel: false
        }]
    } as { name: string, encodedCivilisations: string, turns: Turn[] });
    expect(fromPojo).toMatchSnapshot();
});

it('old turns without executingPlayer properties can be deserialised', () => {
    const pojo = {
        name: "Preset name",
        encodedCivilisations: "0x1",
        turns: [{
            id: "mocked-uuid",
            player: Player.HOST,
            action: Action.PICK,
            exclusivity: Exclusivity.NONEXCLUSIVE,
            hidden: false,
            parallel: false
        } as Turn]
    };
    const preset = Preset.fromPojo(pojo) as Preset;
    expect(preset.turns[0].executingPlayer).toEqual(Player.HOST);
});


it('old turns with executingPlayer properties but without categories can be deserialised', () => {
    const pojo = {
        name: "Preset name",
        encodedCivilisations: "0x1",
        turns: [{
            id: "mocked-uuid",
            player: Player.HOST,
            action: Action.PICK,
            exclusivity: Exclusivity.NONEXCLUSIVE,
            hidden: false,
            parallel: false,
            executingPlayer: Player.GUEST
        } as Turn]
    };
    const preset = Preset.fromPojo(pojo) as Preset;
    expect(preset.turns[0].executingPlayer).toEqual(Player.GUEST);
});


it('new turns with executingPlayer and categories properties can be deserialised', () => {
    const pojo = {
        name: "Preset name",
        encodedCivilisations: "0x1",
        turns: [{
            id: "mocked-uuid",
            player: Player.HOST,
            action: Action.PICK,
            exclusivity: Exclusivity.NONEXCLUSIVE,
            hidden: false,
            parallel: false,
            executingPlayer: Player.GUEST,
            categories: ['my-category']
        } as Turn]
    };
    const preset = Preset.fromPojo(pojo) as Preset;
    expect(preset.turns[0].executingPlayer).toEqual(Player.GUEST);
});



it('old preset without presetId and categoryLimits can be deserialised', () => {
    const pojo = {
        name: "Preset name",
        encodedCivilisations: "0x1",
        turns: [{
            id: "mocked-uuid",
            player: Player.HOST,
            action: Action.PICK,
            exclusivity: Exclusivity.NONEXCLUSIVE,
            hidden: false,
            parallel: false,
            executingPlayer: Player.GUEST
        } as Turn]
    };
    const preset = Preset.fromPojo(pojo) as Preset;
    expect(preset.presetId).toBeUndefined();
    expect(preset.categoryLimits).toEqual({pick: {}, ban: {}});
});


it('old preset with presetID but without categoryLimits can be deserialised', () => {
    const pojo = {
        name: "Preset name",
        encodedCivilisations: "0x1",
        turns: [{
            id: "mocked-uuid",
            player: Player.HOST,
            action: Action.PICK,
            exclusivity: Exclusivity.NONEXCLUSIVE,
            hidden: false,
            parallel: false,
            executingPlayer: Player.GUEST
        } as Turn],
        presetId: 'abcdef'
    };
    const preset = Preset.fromPojo(pojo) as Preset;
    expect(preset.presetId).toEqual('abcdef');
    expect(preset.categoryLimits).toEqual({pick: {}, ban: {}});
});


it('new preset with presetID categoryLimits can be deserialised', () => {
    const pojo = {
        name: "Preset name",
        encodedCivilisations: "0x1",
        turns: [{
            id: "mocked-uuid",
            player: Player.HOST,
            action: Action.PICK,
            exclusivity: Exclusivity.NONEXCLUSIVE,
            hidden: false,
            parallel: false,
            executingPlayer: Player.GUEST
        } as Turn],
        presetId: 'abcdef',
        categoryLimits: {pick: {default: 3}, ban: {default: 1}}
    };
    const preset = Preset.fromPojo(pojo) as Preset;
    expect(preset.presetId).toEqual('abcdef');
    expect(preset.categoryLimits).toEqual({pick: {default: 3}, ban: {default: 1}});
});

