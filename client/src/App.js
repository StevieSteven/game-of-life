import React, {Component} from 'react';
// import {translate} from 'react-translate';
import {Row, Col, notification} from 'antd';

import {TranslatorProvider} from "react-translate"
import translations from './translations/translations';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'

import './App.css';

import LogicBoard from './logic/Board';
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import ControlPanel from "./components/ControlPanel/ControlPanel";

const START_SIZE = 10;


const translateManuel = (locale, textID) => {
    const language = translations[locale];
    if(!language)
        return `APP.${textID}`;
    const appLanguage = language['APP'];
    if(!appLanguage)
        return `APP.${textID}`;

    const text = appLanguage[textID];
    return text ? text :`APP.${textID}` ;
};

class App extends Component {


    constructor(props) {
        super(props);


        let board;
        let pathName = window.location.pathname.substr(1, window.location.pathname.length - 1);

        if (pathName && pathName.length > 0) {
            board = LogicBoard.generateBoardFromParameter(pathName);

            if (!board) {
                notification['error']({
                    message: "Import failed",
                    // description: 'Der Link ist fehlerhaft! Import gescheitert!',
                });
                board = new LogicBoard({
                    sizeX: START_SIZE,
                    sizeY: START_SIZE,
                })
            }
        } else {
            board = new LogicBoard({
                sizeX: START_SIZE,
                sizeY: START_SIZE,
            })
        }
        this.state = {
            selectedLanguage: "de",
            history: [],
            gameStarted: false,
            step: 0,
            sizeX: board.getSizeX(),
            sizeY: board.getSizeY(),
            board
        };


    }


    prevStep = () => {
        if (this.state.step === 0)
            return;
        let step = this.state.step - 1;
        let oldBoard = this.state.history[step];
        oldBoard = oldBoard ? oldBoard : this.state.board;
        this.setState({step, board: oldBoard});
    };

    nextStep = () => {
        let step = this.state.step + 1;

        let board = this.state.board;
        let history = this.state.history;
        history.push(board.clone());
        board.calculateNewBoard();

        let onesAlive = board.getOnesAlive();
        this.setState({step, board, history, gameFinished: !onesAlive});


        if (!onesAlive) {
            // notification['info']({
            //     message: 'Simulation abgeschlossen',
            //     description: 'Es gibt keine lebende Felder mehr. Die Simulation ist abgeschlossen',
            // });

            notification['info']({
                message: translateManuel(this.state.selectedLanguage, "TITLE"),
                description:  translateManuel(this.state.selectedLanguage, "TEXT"),
            });
        }
    };

    createNewBoard = (sizeX, sizeY) => {
        this.setState({
            sizeX,
            sizeY,
            board: new LogicBoard({
                sizeX: sizeX,
                sizeY: sizeY,
            })
        })

    };

    startGame = () => {
        this.setState({gameStarted: true, gameFinished: false})
    };

    stopGame = () => {
        this.setState({
            gameStarted: false,
            step: 0,
            history: [],
            board: new LogicBoard({
                sizeX: this.state.sizeX,
                sizeY: this.state.sizeY,
            })
        })
    };

    changeValueOfField = (x, y) => {
        let oldBoard = this.state.board;
        oldBoard.changeValueOfField(x, y);
        this.setState({
            board: oldBoard
        })
    };

    createLink = () => {
        let board = this.state.board;
        let exportString = `${board.getSizeX()}:${board.getSizeY()}:${board.getBinaryFieldString()}`;

        return encodeURI(window.location.origin + "/" + exportString);
    };

    changeLanguage = (locale) => {
        this.setState({selectedLanguage: locale});
    };

    render() {
        const availableLanguages = [
            {
                name: "English",
                value: "en"
            }, {
                name: "Deutsch",
                value: "de"
            }
        ];

        return (
            <TranslatorProvider translations={translations[this.state.selectedLanguage]}>
                <div className="App">

                    <Header
                        changeLanguage={this.changeLanguage}
                        selectedLanguage={this.state.selectedLanguage}
                        availableLanguages={availableLanguages}
                        link={this.createLink()}
                    />

                    <div className="App-MainContent">
                        <Row>
                            <Col span={16} offset={1}>
                                <div className="CardContainer">
                                    <Board
                                        gameStarted={this.state.gameStarted}
                                        step={this.state.step}
                                        board={this.state.board}
                                        changeValueOfField={this.changeValueOfField}
                                    />
                                </div>
                            </Col>

                            <Col span={6}>
                                <div className="CardContainer">
                                    <ControlPanel
                                        gameStarted={this.state.gameStarted}
                                        gameFinished={this.state.gameFinished}
                                        sizeX={this.state.sizeX}
                                        sizeY={this.state.sizeY}
                                        startGame={this.startGame}
                                        stopGame={this.stopGame}
                                        createNewBoard={this.createNewBoard}
                                        nextStep={this.nextStep}
                                        prevStep={this.prevStep}
                                    />
                                </div>
                            </Col>

                        </Row>
                    </div>
                </div>
            </TranslatorProvider>
        );
    }
}

export default App;
