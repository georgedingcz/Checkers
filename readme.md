# Developing Checkers

## Project Description

As part of a project submission, I made a game of American Checkers with rules slightly modified. The technologies and tools used for the project are based on what I have learnt thus far.

## Deployment

The game is deployed on [Vercel](checkers-three.vercel.app) and the files are hosted on [Github](https://github.com/soursorbet/Checkers).

## Technologies & Tools Used

- HTML
- CSS
- Javascript
- Git & GitHub

## Timeframe

- ~A week

## Game Description

The rules of the game are based on American Checkers with the exception of the King piece and triple-jumps that were not made available at this point in time.

You may wish to refer to the link [here](https://www.usatoday.com/story/graphics/2023/01/23/how-to-play-checkers-rules-strategy/10795787002/#:~:text=Checkers%20can%20only%20move%20diagonally,row%20of%20the%20opposite%20side.)for more details on the rules.

## High Concept

The game starts with 12 pieces on each side of the board, with Player Green starting first. The game in two scenarios:

1. If one of the player loses all the pieces, the opponent wins
2. if one of the player has a piece that reached the opposite end of the board, the player wins

## Approach to Development

The project was broken down into these stages:

1. Rendering the board (1-2 days)
2. Game logic (2-3 days)
3. Clearing bugs (1-2 days)
4. Styling (1 day)

## Key Learnings

One of the main key learnings for the project was gaining a better understanding of the Model-View-Controller approach. It took me a significant amount of time and effort to change the way I approached the project and while the final product is not an ideal example, I will continue to improve and work on future projects using this approach.

In addition, I have also gotten more proficient with conditionals and scoping, whether it is from building the game or fixing bugs.

## Screenshots of the game

### How the initial state of the game will look like:

![alt text](/screenshots/startscreen.png)

### Capturing through double jump:

![alt text](/screenshots/doublejump1.png)
![alt text](/screenshots/doublejump2.png)

### Winning the game:

1. ![alt text](/screenshots/zeroRed.png)

## Online resources for styling

For the purposes of styling, I used online resources for the following with links attached:

1. [Animated background](https://alvarotrigo.com/blog/animated-backgrounds-css/)
2. [White squares of the board](https://shorturl.at/bGHK9)
3. [Black squares of the board](https://illustoon.com/photo/7263.png)
4. [Red checker pieces](https://shorturl.at/wxHQT)
5. [Green checker pieces](https://shorturl.at/jkT15)
6. [Restart button](https://getcssscan.com/css-buttons-examples)
7. [Tab Icon](https://shorturl.at/stIR3)

## Future Developments and Improvements

Taking into consideration the limited time available while I'm still taking classes, future developments, should it occur, will happen at a much later date. Nevertheless, these are the key areas that I will be working towards:

1. Due to the way that I have written the game logic, it is currently unable to scale efficiently. Rewriting the game logic to allow for triple jumps and modifiable game boards will be a major development to work towards.
2. Working on an AI opponent will also be considered
3. Making the game mobile-friendly
