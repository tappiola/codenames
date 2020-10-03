import React from "react";

export const RULES_RU = () => {
    return <>
        <b>Подготовка к игре</b>
        <p>Игроки делятся на две команды, равные по силе и количеству (команда синих и команда красных. Для игры
            потребуется минимум четыре человека (две команды по два игрока). Каждая команда выбирает себе капитана.</p>
        <p>Любой из игроков генерирует код игры и сообщает его другим игрокам. Остальные игроки должны ввести код игры в
            поле “Ключевое слово” и выбрать свою роль (капитан либо игрок) для перехода к игре. Также можно поделиться
            ссылкой на игру через мессенджер – тогда остальные игроки просто переходят по ссылке и выбирают свою
            роль.</p>
        <b>Ход игры</b>
        <p>Первой ходит команда, которая должна отгадать 9 кодовых слов, второй – команда, которой необходимо отгадать
            8. Капитан команды, начинающей игру, дает первую подсказку.</p>
        <b>Цель игры – отгадать все слова цвета, совпадающего с цветом команды.</b>
        <p>Если вы капитан, вам необходимо придумать одно ключевое слово, относящееся к одному или нескольким кодовым
            словам, которые ваша команда должна отгадать. Как только вы придумали подходящее слово, вы произносите его
            вслух. Вы также называете число, которое обозначает количество кодовых слов, относящихся к данной подсказке.
            Больше ничего говорить нельзя.</p>
        <i>Например: Вашей команде нужно отгадать слова ОРЕХ и КОРА. Оба растут на деревьях, поэтому вы говорите:
            “Дерево: 2”.</i>
        <p>Остальные члены команды пытаются отгадать, ассоциация к каким словам была загадана и нажимают соответствующие
            карточки на игровом поле. Нажимать можно не больше того количества слов, которое назвал капитан. В случае
            ошибки ход автоматически переходит к другой команде. Если все слова были отгаданы верно, игрок нажимает
            кнопку “Завершить ход”, и ход переходит к другой команде, которая делает то же самое.</p>
        <b>Завершение игры</b>
        <p>Игра продолжается до тех пор, пока все слова одной из команд не будут отгаданы - выигрывает команда, которая
            первая отгадала все свои слова. Игра может завершиться досрочно, если кто-либо из игроков нажмет черное
            слово – команда, которая это сделала автоматически проигрывает.</p>
    </>
}

export const RULES_EN = () => {
    return <>
        <b>Game setup</b>
        <p>Players split up into two teams of similar size and skill (Team Blue and Team Red). You need at least four
            players (two teams of two). Each team chooses one player to be their captain.</p>
        <b>Preparing for the game</b>
        <p>Any player generates game code and tells it to all other players. The rest of the team have to enter this
            game code into the “Keyword” field and choose their role (captain or player) to start the game. You can also
            share the link to the game – then other players just have to follow the link and select their role.</p>
        <b>Game flow</b>
        <p>The team that has to guess 9 words goes first, the team with 8 ones is the second one. The captain of the
            team starting the game gives the first clue.</p>
        <b>Aim of the game is to guess right all of the words matching the color of your team.</b>
        <p>If you are the captain, you are trying to think of a one-word clue that relates to some of the words your
            team is trying to guess. When you think you have a good clue, you say it. You also say one number, which
            tells your teammates how many codenames are related to your clue. You are not allowed to say anything
            else.</p>
        <i>Example: Two of your words are NUT and BARK. Both of these grow on trees, so you say “Tree: 2”.</i>
        <p>The rest of your team try to suggest what words were meant and click on corresponding cards on the game
            field. Turn ends when they guess wrong, when they decide to stop, or when they made the maximum number of
            guesses for that clue. If they guessed all the words correctly or want to stop, they should click on “End
            turn” button to pass the turn.</p>
        <b>End of the game</b>
        <p>The game ends when one team has all their words guessed right. That team wins. The game can end early if
            somebody clicked on a black word. That team who did it loses.</p>

    </>
}

