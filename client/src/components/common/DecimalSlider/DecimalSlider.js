import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';


export default class DecimalStep extends React.Component {
    state = {
        inputValue: 0,
    }
    onChange = (value) => {
        this.setState({
            inputValue: value,
        });
        this.props.onChange(value)
    }
    render() {
        return (
            <Row>
                <Col span={12}>
                    <Slider min={0} max={3} onChange={this.onChange} value={this.state.inputValue} step={0.01} />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={0}
                        max={3}
                        style={{ marginLeft: 16 }}
                        step={0.01}
                        value={this.state.inputValue}
                        onChange={this.onChange}
                    />
                </Col>
            </Row>
        );
    }
}
