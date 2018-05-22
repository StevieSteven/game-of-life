import React from 'react';

import {Row, Button, Divider} from 'antd';
import DecimalSlider from "../common/DecimalSlider/DecimalSlider";

const ButtonGroup = Button.Group;

export default class RunPanel extends React.Component {

    state = {
        automaticRuns: false,
        time: 500
    };

    render() {
        const startAutomatic = () => {

            let id = setInterval(() => {
                this.setState({
                    automaticRuns: true
                });
                this.props.nextStep()
            }, this.state.time);

            this.setState({
                id
            });
        };

        const stopAutomatic = () => {
            clearInterval(this.state.id);
            this.setState({
                automaticRuns: false
            });
        };

        const handleAutomaticButton = () => {
            if (this.state.automaticRuns) {
                stopAutomatic();
                return;
            }
            startAutomatic()
        };


        const handleSliderChange = (time) => {
            let runs = this.state.automaticRuns;
            if (runs) {
                stopAutomatic();
            }

            this.setState({time: time * 1000});
            if (runs) {
                startAutomatic();
            }
        };


        const handleStopGame = () => {
            // if (this.state.automaticRuns) {
            stopAutomatic();
            // }
            this.props.stopGame();
        };

        return (

            <div>

                <h3>Manuelle Steuerung: </h3>
                <Row>
                    <ButtonGroup>
                        <Button onClick={this.props.prevStep}>vorheriger Schritt</Button>
                        <Button onClick={this.props.nextStep}>nächster Schritt</Button>
                    </ButtonGroup>
                </Row>
                <Divider/>

                <h3>Automatische Steuerung </h3>
                <Row>
                    Sekunden zwischen Schritten:
                    <DecimalSlider onChange={handleSliderChange}/>
                </Row>

                <Row>
                    <Button
                        onClick={handleAutomaticButton}>{this.state.automaticRuns ? "Automatik stoppen" : "Automatik starten"}</Button>

                </Row>

                <Divider/>

                <Row>
                    <Button onClick={handleStopGame}>STOP!</Button>
                </Row>
            </div>
        )
    }
}