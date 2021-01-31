import React from 'react';
import BlocklyComponent, { Block, Category, Field, Shadow, Value } from './Blockly';

export default React.forwardRef((props, ref) => (
    <div className="desk">
      <BlocklyComponent ref={ ref }
                        readOnly={ false } trashcan={ false } media={ 'media/' }
                        move={ {
                          scrollbars: true,
                          drag: true,
                          wheel: true
                        } }
                        initialXml={ `
            <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="controls_ifelse" x="0" y="0"/>
            </xml>
          ` }>
        <Category name="Steuerung" colour="#FFAB19">
          <Block type="controls_repeat"/>
          <Block type="controls_flow_statements"/>
          <Block type="controls_if"/>
          <Block type="controls_ifelse"/>
          {/*
          <Block type="test_react_field"/>
          < Block type="text"/>
          <Block type="test_react_date_field"/>
          <Block type="controls_ifelse"/>
          <Block type="logic_compare"/>
        */ }
        </Category>
        <Category name="Operatoren" colour="#40BF4A">
          <Block type="test_react_date_field"/>
          <Block type="logic_compare"/>
          <Block type="logic_operation"/>
          <Block type="logic_boolean"/>
          <Block type="math_number"/>
          <Block type="math_arithmetic"/>
          <Block type="math_random_int"/>
          <Block type="text_indexOf"/>
          <Block type="text"/>
          <Block type="text_charAt"/>
          <Block type="text_contains"/>
          <Block type="text_print_field_to_console"/>
          <Block type="text_print_variable_to_console"/>
          <Block type="text_append"/>
          <Block type="text_join"/>
        </Category>
        <Category name="Variablen" colour="#FF8C1A">
          <Block type="variables_set"/>
          <Block type="variables_get"/>
        </Category>
        <Category name="Wetter" colour="#001F3F">
          <Block type="weather_get"/>
        </Category>
        <Category name="LED" colour="#01FF70">
          <Block type="led_config"/>
        </Category>
        <Category name="Test" colour="#7FDBFF">
          <Block type="test_mock_weather"/>
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
    </div>
  )
)