import React from 'react';

import {Row, Col} from 'antd';

import LanguagePicker from './../common/LanguagePicker/LanguagePicker';

import './../../App.css';
export default (props) => {
    return (
        <header className="App-header">
        <Row>
            <Col span={12}>
                <h1 className="App-title">Game of Life</h1>
            </Col>

            <Col span={6}>
                Dein Link zum Board: {props.link}
            </Col>
            <Col span={6}>
                <LanguagePicker
                    onChange={props.changeLanguage}
                    selected={props.selectedLanguage}
                    languages={props.availableLanguages}
                />
            </Col>


        </Row>
    </header> );

}