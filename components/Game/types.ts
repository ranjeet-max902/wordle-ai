export type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'tbd';

export type GuessResult = {
    word: string;
    result: TileState[];
};
