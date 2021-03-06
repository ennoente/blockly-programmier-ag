/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React, {useEffect, useRef, useState} from 'react';
import './App.css';

import BlocklyJS from 'blockly/javascript';
import Blockly from 'blockly';
import locale from 'blockly/msg/de';

import './blocks/customblocks';
import './blocks/textPrintToConsoleBlock';
import './blocks/ledConfigBlock';
import './blocks/fetchWeatherBlock';
import './blocks/textContainsBlock';
import './blocks/testMockWeatherBlock';
import './generator/generator';

import Desk from './desk';
import Console from './console';
import Lamp from './lamp';

const App = () => {
    const [consoleLogs, setConsoleLogs] = useState([]);
    const [lampState, setLampState] = useState('#FFFFFF');
    const [lampStateHumanReadable, setLampStateHumanReadable] = useState('nicht');
    const [loadInput, setLoadInput] = useState(null);
    const simpleWorkspace = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        Blockly.setLocale(locale);
    }, []);

    // Load read file to workspace
    useEffect(() => {
        if (!loadInput) return;

        simpleWorkspace.current.workspace.clear();

        try {
            let xml = Blockly.Xml.textToDom(loadInput);
            Blockly.Xml.domToWorkspace(xml, simpleWorkspace.current.workspace);
        } catch (e) {
            console.log("Invalid file. Workspace could not be created from input");
        }
    }, [loadInput]);

    const generateCode = () => {
        return BlocklyJS.workspaceToCode(
            simpleWorkspace.current.workspace
        );
    };

    const clearConsole = () => {
        setConsoleLogs([]);
    };

    const runCode = async () => {
        const code = generateCode();

        // Used for running the code
        // eslint-disable-next-line no-unused-vars
        const consolelog = async str => {
            await setConsoleLogs(oldLogs => [...oldLogs, `${str}`]);
        };

        // eslint-disable-next-line no-unused-vars
        const setLedConfig = (configStr) => {
            configStr = configStr.toLowerCase();
            let mappedHexColor = ledColorMap[configStr];

            if (!mappedHexColor) {
                mappedHexColor = '#FFFFFF';
                configStr = 'nicht';
            }

            setLampState(mappedHexColor);
            setLampStateHumanReadable(configStr);
        };

        // eslint-disable-next-line no-unused-vars
        const fetchWeather = async (city) => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });

            const json = await response.json();
            const weatherId = json.weather[0].id;

            return weatherMap[weatherId] || 'bewölkt';
        };

        // eslint-disable-next-line no-eval
        eval("(async () => {" + code + "})()")
    };

    //let bla = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="controls_ifelse" id="g=f|l9un?gjLUBH6czs1" x="712" y="102"><statement name="DO0"><block type="test_react_date_field" id="~|~|5jG?[i6)9TO*P6Rm"><field name="DATE">Wed Jan 01 2020 00:00:00 GMT+0100 (Mitteleuropäische Normalzeit)</field></block></statement></block></xml>';
    let bla = '<xml xmlns="https://developers.google.com/blockly/xml"><variables><variable id="Tw5gy~c^q$;*4UDZyU%_">wetter</variable></variables><block type="variables_set" id="@`vEa^),xqO|}`[uJFXg" x="76" y="75"><field name="VAR" id="Tw5gy~c^q$;*4UDZyU%_">wetter</field><value name="VALUE"><block type="weather_get" id="i)R5q`4wWg#Q9IXFO-ng"><field name="CITY">Varel</field></block></value><next><block type="text_print_variable_to_console" id="RJi)},WO+*]aUk,L.Zr~"><value name="VAR"><block type="text_contains" id="Cs]*qtB0)E|K^bfg()Qq"><field name="CHECK_INPUT">sonnig</field><value name="VAR"><block type="variables_get" id="9h{!*Pq6N*BKe@?iKM_V"><field name="VAR" id="Tw5gy~c^q$;*4UDZyU%_">wetter</field></block></value></block></value></block></next></block></xml>';

    const loadCode = (event) => {
        const file = event.target.files[0];

        if (!file) return;
        if (getFileNameExtension(file) !== 'bly') return;

        console.log("file", file);
        console.log("file.size", file.size);
        console.log("file.name", file.name);

        const reader = new FileReader();
        reader.onload = function (event) {
            setLoadInput(event.target.result);
        };
        reader.readAsText(file);
    };

    const saveCode = () => {
        console.log("workspace", Blockly.Xml.workspaceToDom(simpleWorkspace.current.workspace));
        let dom = Blockly.Xml.workspaceToDom(simpleWorkspace.current.workspace);
        bla = Blockly.Xml.domToText(dom);
        console.log("bla", bla);

        if (domIsEmpty(bla)) return;

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(bla));
        element.setAttribute('download', 'code.bly');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };


    return (
        <div className="container">
            <div className="header">
                {/* Needed for accurate grid */}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button onClick={generateCode}>Kompilieren</button>
                </div>
                <div>
                    <button onClick={saveCode}>Speichern</button>
                </div>
                <div>
                    <button
                        className="h-16 w-56 text-4xl border-2 rounded-lg border-indigo-900 text-gray-700 hover:border-gray-500 active:transform active:scale-75 focus:outline-none"
                        onClick={() => fileInputRef.current.click()}
                    >
                        Laden
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={loadCode}
                        hidden
                    />
                </div>
                <div>
                    <button onClick={runCode}>Ausprobieren</button>
                </div>
            </div>

            <Desk ref={simpleWorkspace}/>

            <Lamp lampState={lampState} lampStateHumanReadable={lampStateHumanReadable}/>

            <Console consoleLogs={consoleLogs} clearConsole={clearConsole}/>
        </div>
    );
};

const domIsEmpty = domText => {
    return domText === '<xml xmlns="https://developers.google.com/blockly/xml"></xml>';
};

const getFileNameExtension = file => {
    if (!file) return;

    return file.name.split('.').pop();
}

const ledColorMap = {
    'rot': '#FF0000',
    'schwarz': '#000000',
    'gelb': '#FFFF00',
    'olive': '#808000',
    'hellgrün': '#00FF00',
    'grün': '#008000',
    'aqua': '#00FFFF',
    'türkis': '#008080',
    'blau': '#0000FF',
    'dunkelblau': '#000080',
};

const weatherMap = {
    200: 'Gewitter',
    201: 'Gewitter',
    202: 'Gewitter',
    210: 'Gewitter',
    211: 'Gewitter',
    212: 'Schweres Gewitter',
    221: 'Gewitter',
    230: 'Gewitter',
    231: 'Gewitter',
    232: 'Gewitter',

    300: 'Nieselregen',
    301: 'Nieselregen',
    302: 'Nieselregen',
    310: 'Nieselregen',
    311: 'Nieselregen',
    312: 'Nieselregen',
    313: 'Nieselregen',
    314: 'Nieselregen',
    321: 'Nieselregen',

    500: 'Leichter Regen',
    501: 'Regen',
    502: 'Starker Regen',
    503: 'Starker Regen',
    504: 'Extremer Regen',
    511: 'Schneeregen',
    520: 'Regen',
    521: 'Regen',
    522: 'Regen',
    531: 'Regen',

    600: 'Schnee',
    601: 'Schnee',
    602: 'Schnee',
    611: 'Schnee',
    612: 'Schnee',
    613: 'Schnee',
    615: 'Schnee',
    616: 'Schnee',
    620: 'Schnee',
    621: 'Schnee',
    622: 'Schnee',

    741: 'Neblig',

    800: 'Sonnig',
    801: 'Leicht bewölkt',
    802: 'Leicht bewölkt',
    803: 'Bewölkt',
    804: 'Bewölkt'
}

export default App;
