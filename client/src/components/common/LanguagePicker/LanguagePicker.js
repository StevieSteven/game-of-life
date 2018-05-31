import React from 'react';

import {Select} from 'antd';

const Option = Select.Option;

export default({languages, onChange, selected}) =>  {
    const handleChange = (value) => {
        console.log("LanguagePicker: ", value);
        onChange(value)
    };

    return (
        <Select defaultValue={selected ? selected : languages[0].value} style={{width: 200}} onChange={handleChange}>
            {languages.map((item, index) => {
                return <Option key={index} value={item.value}>{item.name}</Option>;
            })}
        </Select>
    )
}