import React from 'react';

import {Card} from 'antd';
import StartPanel from "../StartPanel/StartPanel";
import RunPanel from "../RunPanel/RunPanel";

export default class ControlPanel extends React.Component {


    render() {

        return (
            <Card title="ControlPanel">
                {
                    !this.props.gameStarted ? <StartPanel {...this.props}/> : <RunPanel {...this.props}/>
                }

            </Card>
        );
    }
}