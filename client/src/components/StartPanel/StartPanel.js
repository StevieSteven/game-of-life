import React from 'react';
import {translate} from 'react-translate';

import {Col, Row, Button, Divider, InputNumber} from 'antd'


class StartPanel extends React.Component {


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
            this.props.createNewBoard(this.state.sizeX, this.state.sizeY);
        };

        return (<div>

            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={12}>
                            <b>{this.props.t("SIZE_X")}:</b>
                        </Col>
                        <Col span={12}>
                            <InputNumber value={this.state.sizeX} min={3} max={20} onChange={changeX}/>
                        </Col>
                    </Row><br/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={12}>
                            <b>{this.props.t("SIZE_Y")}:</b>
                        </Col>
                        <Col span={12}>
                            <InputNumber value={this.state.sizeY} min={3} max={20} onChange={changeY}/>
                        </Col>
                    </Row><br/>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Button type="primary" onClick={clickHandler}
                            disabled={!this.valideInputs()}>{this.props.t("CREATE")}</Button>
                </Col>
            </Row>


            <Divider/>

            <Row>
                <Col span={24}>
                    <Button type="primary" onClick={this.props.startGame}>{this.props.t("START")}</Button>
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


export default translate("START_PANEL")(StartPanel);