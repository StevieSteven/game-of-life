import React from 'react';

import {Col, Row, Button, Divider, InputNumber} from 'antd'


export default class StartPanel extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            sizeX: props.sizeX,
            sizeY: props.sizeY
        }
    }

    render() {
        const changeX = (value) => {
            this.setState({sizeX: value})
        };

        const changeY = (value) => {
            this.setState({sizeY: value})
        };

        const clickHandler = () => {
            console.log("neues Feld soll angelegt werden: ", this.state);
            this.props.createNewBoard(this.state.sizeX, this.state.sizeY);
        };

        return (<div>

            <Row>
                <Col span={24}>
                Size X:
                <InputNumber value={this.state.sizeX} min={3} max={20} onChange={changeX}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                Size Y:
                <InputNumber value={this.state.sizeY} min={3} max={20} onChange={changeY}/>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                <Button type="primary" onClick={clickHandler} disabled={!this.valideInputs()}> neues Spielfeld
                    erstellen</Button>
                </Col>
            </Row>


            <Divider/>

            <Row>
                <Col span={24}>
                <Button type="primary" onClick={this.props.startGame}> Spiel starten</Button>
                </Col>
            </Row>
        </div>)

    }

    valideInputs() {
        if (this.state.sizeX === undefined || this.state.sizeX === 0)
            return false;
        return !(this.state.sizeY === undefined || this.state.sizeY === 0);

    }

}
