import React from 'react';
import {translate } from "react-translate"

import {Row, Col} from 'antd';

import LanguagePicker from './../common/LanguagePicker/LanguagePicker';

import './../../App.css';
const Header = (props) => {
    return (
        <header className="App-header">
        <Row>
            <Col span={4}>
                <h1 className="App-title">Game of Life</h1>
            </Col>

            <Col span={15} className="App-linkLine">
                {props.t("LINK")}: <a href={props.link}> {props.link}</a>
            </Col>
            <Col span={5}>
                <LanguagePicker
                    onChange={props.changeLanguage}
                    selected={props.selectedLanguage}
                    languages={props.availableLanguages}
                />
            </Col>


        </Row>
    </header> );

};

export default translate("HEADER")(Header)