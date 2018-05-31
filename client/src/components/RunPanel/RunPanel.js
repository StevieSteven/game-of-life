import React from 'react';
import {translate} from 'react-translate';

import {Row, Button, Divider} from 'antd';
import DecimalSlider from "../common/DecimalSlider/DecimalSlider";

const ButtonGroup = Button.Group;

class RunPanel extends React.Component {

    state = {
        automaticRuns: false,
        time: 500
    };

    render() {
        const {t} = this.props;

        const startAutomatic = () => {

            let id = setInterval(() => {
                this.setState({
                    automaticRuns: true
                });
                if (!this.props.gameFinished)
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

                <h3>{t("MANUEL")}</h3>
                <Row>
                    <ButtonGroup>
                        <Button onClick={this.props.prevStep}>{t("PREV")}</Button>
                        <Button onClick={this.props.nextStep}>{t("NEXT")}</Button>
                    </ButtonGroup>
                </Row>
                <Divider/>

                <h3>{t("AUTOMATIC")}</h3>
                <Row>
                    {t("DISTANCE")}
                    <DecimalSlider onChange={handleSliderChange}/>
                </Row>

                <Row>
                    <Button
                        onClick={handleAutomaticButton}>{this.state.automaticRuns ? t("AUTOMATIC_STOP") : t("AUTOMATIC_START")}</Button>

                </Row>

                <Divider/>

                <Row>
                    <Button onClick={handleStopGame}>{t("STOP")}</Button>
                </Row>
            </div>
        )
    }
}

export default translate("RUNNING_PANEL")(RunPanel);