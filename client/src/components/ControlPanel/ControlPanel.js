import React from 'react';
import {translate} from 'react-translate';
import {Card} from 'antd';
import StartPanel from "../StartPanel/StartPanel";
import RunPanel from "../RunPanel/RunPanel";

const ControlPanel = (props) => {
    return (
        <Card title={props.t("TITLE")}>
            {
                !props.gameStarted ? <StartPanel {...props}/> : <RunPanel {...props}/>
            }

        </Card>
    );
};

export default translate("CONTROL_PANEL")(ControlPanel);
