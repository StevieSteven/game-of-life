import React from 'react';

import {Card, Row, Col} from 'antd';
import {translate } from "react-translate"
import './Board.css'


const getSpan = (size) => {
    return Math.floor(parseInt(24 / (size  + 1), 10));
};



class Board extends React.Component {

    renderBoard() {
        const renderHeader = (size) => {
            let cells = [];

            for(let index = 1; index <=size; index++) {
                cells.push(<Col className="headerCell" span={getSpan(size)} key={index}>{index}</Col>)
            }

            return <Row>
                <Col className="headerCell" span={getSpan(size)}> </Col>
                {cells}
            </Row>
        };
        let sizeX = this.props.board.getSizeX();
        let fields = this.props.board.getFields();


        const clickHandlerGenerator = (x, y) => {
            return () => {
                if(this.props.gameStarted === true)
                    return;
                this.props.changeValueOfField(x,y);

            }
        };

        return (
            <div>
                {renderHeader(sizeX)}
                {fields.map((line, lineIndex) => {
                    return <Row key={lineIndex}>
                        <Col className="lineCell"span={getSpan(sizeX)} key={`${lineIndex}-number`}> {lineIndex + 1} </Col>
                        {
                            line.map((field, fieldIndex) => {
                                let className = "dead";
                                if (field === true) {
                                    className = "alive";
                                }
                                return (<Col className={className} span={getSpan(sizeX)} key={`${lineIndex}-${fieldIndex}`}
                                             onClick={clickHandlerGenerator(lineIndex, fieldIndex)}> </Col>);
                            })
                        }
                    </Row>

                })}

            </div>
        )


    }

    render() {

        return (
            <Card title={`${this.props.t("TITLE")} - ${this.props.step === 0 ? "noch nicht gestartet" : "Schritt " + this.props.step}`}>
                {this.renderBoard()}
            </Card>
        )
    }
}

export default translate("BOARD")(Board);