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

import React from 'react';
import './App.css';

import logo from './logo.svg';

import BlocklyComponent, {Block, Category, Field, Shadow, Value} from './Blockly';

import BlocklyJS from 'blockly/javascript';
import Blockly from 'blockly';

import './blocks/customblocks';
import './generator/generator';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.simpleWorkspace = React.createRef();
    }

    generateCode = () => {
        var code = BlocklyJS.workspaceToCode(
            this.simpleWorkspace.current.workspace
        );
        console.log(code);
    }

    //bla = null;
    bla = '<xml xmlns="https://developers.google.com/blockly/xml"><block type="controls_ifelse" id="g=f|l9un?gjLUBH6czs1" x="712" y="102"><statement name="DO0"><block type="test_react_date_field" id="~|~|5jG?[i6)9TO*P6Rm"><field name="DATE">Wed Jan 01 2020 00:00:00 GMT+0100 (Mitteleuropäische Normalzeit)</field></block></statement></block></xml>';

    loadCode = () => {
        this.simpleWorkspace.current.workspace.clear();
        let xml = Blockly.Xml.textToDom(this.bla);
        Blockly.Xml.domToWorkspace(xml, this.simpleWorkspace.current.workspace);
    }

    saveCode = () => {
        console.log("workspace", Blockly.Xml.workspaceToDom(this.simpleWorkspace.current.workspace));
        let dom = Blockly.Xml.workspaceToDom(this.simpleWorkspace.current.workspace);
        this.bla = Blockly.Xml.domToText(dom);
        console.log("bla", this.bla);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <button onClick={this.generateCode}>Convert</button>
                    <button onClick={this.saveCode}>Save</button>
                    <button onClick={this.loadCode}>Load</button>
                    <BlocklyComponent ref={this.simpleWorkspace}
                                      readOnly={false} trashcan={true} media={'media/'}
                                      move={{
                                          scrollbars: true,
                                          drag: true,
                                          wheel: true
                                      }}
                                      initialXml={`
            <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="controls_ifelse" x="0" y="0"></block>
            </xml>
          `}>
                        <Category name="Hallo" colour="blue">
                            <Block type="test_react_field"/>
                            <Block type="text"/>
                            <Block type="test_react_date_field"/>
                            <Block type="controls_ifelse"/>
                            <Block type="logic_compare"/>
                        </Category>
                        <Category name="Hallo2" colour="black">
                            <Block type="logic_operation"/>
                            <Block type="controls_repeat_ext">
                                <Value name="TIMES">
                                    <Shadow type="math_number">
                                        <Field name="NUM">10</Field>
                                    </Shadow>
                                </Value>
                            </Block>
                        </Category>
                        <Block type="logic_operation"/>
                        <Block type="logic_negate"/>
                        <Block type="logic_boolean"/>
                        <Block type="logic_null" disabled="true"/>
                        <Block type="logic_ternary"/>
                        <Block type="text_charAt">
                            <Value name="VALUE">
                                <Block type="variables_get">
                                    <Field name="VAR">text</Field>
                                </Block>
                            </Value>
                        </Block>
                    </BlocklyComponent>
                </header>
            </div>
        );
    }
}

export default App;
