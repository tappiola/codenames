export const LOCAL_STORAGE_KEY = 'codenames_language';
export const GAME_CONFIG = {
    fieldSize: 25,
    whiteWordsCount: 7
}

export const LANGUAGES = {
    EN: 'en',
    RU: 'ru'
}

export const TEAM = {
    red: 'red',
    blue: 'blue'
};

export const ROLE = {
    captain: 'captain',
    player: 'player'
}

export const COLOUR = {
    white: 'white',
    black: 'black'
}

export const TEXTS = {
    [LANGUAGES.RU]: {
        language: LANGUAGES.RU,
        ROLE: {
            [ROLE.captain]: 'капитан',
            [ROLE.player]: 'игрок'
        },
        YOUR_TURN: {
            [TEAM.red]: 'Ход команды красных',
            [TEAM.blue]: 'Ход команды синих'
        },
        WINNER: {
            [TEAM.red]: 'Выиграла команда красных',
            [TEAM.blue]: 'Выиграла команда синих'
        },
        keyword: 'Ключевое слово',
        newGame: 'Новая игра',
        rules: 'Правила',
        changeKey: 'Сгенерировать другой ключ',
        toGame: 'Открыть игру как:',
        wordsRemaining: 'Слов осталось',
        blackWordClicked: 'Команда, нажавшая черное слово, проиграла',
        endTurn: "Завершить ход",
    },
    [LANGUAGES.EN]: {
        language: LANGUAGES.EN,
        ROLE: {
            [ROLE.captain]: 'captain',
            [ROLE.player]: 'player'
        },
        YOUR_TURN: {
            [TEAM.red]: 'Team Red - your turn',
            [TEAM.blue]: "Team Blue - your turn"
        },
        WINNER: {
            [TEAM.red]: 'Team Red won',
            [TEAM.blue]: 'Team Blue won'
        },
        keyword: 'Keyword',
        newGame: 'New game',
        rules: 'Rules',
        changeKey: 'Generate another key',
        toGame: 'Open game as:',
        wordsRemaining: 'Words remaining',
        blackWordClicked: 'The team that hit the black word has lost.',
        endTurn: "End turn",

    },
}
