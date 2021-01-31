/**
 * @author Enno Thoma (enno.thoma@uni-oldenburg.de)
 */
import Blockly from 'blockly/core';

const textPrintFieldToConsoleBlock = {
  "type": "text_print_field_to_console",
  "message0": "Schreibe %1 in die Konsole",
  "args0" : [
    {
      "type": "field_input",
      "name": "VAR"
    }
  ],
  "previousStatement": null,
  "nextStatement": null
};

const textPrintVariableToConsoleBlock = {
  "type": "text_print_field_to_console",
  "message0": "Schreibe %1 in die Konsole",
  "args0" : [
    {
      "type": "input_value",
      "name": "VAR"
    }
  ],
  "previousStatement": null,
  "nextStatement": null
};

Blockly.Blocks['text_print_field_to_console'] = {
  init: function() {
    this.jsonInit(textPrintFieldToConsoleBlock);
    this.setStyle('text_blocks');
  }
}

Blockly.Blocks['text_print_variable_to_console'] = {
  init: function() {
    this.jsonInit(textPrintVariableToConsoleBlock);
    this.setStyle('text_blocks');
  }
}

Blockly.JavaScript['text_print_field_to_console'] = function(block) {
  const varFieldValue = block.getFieldValue('VAR');

  return `consolelog('${varFieldValue}');\n`;
};

Blockly.JavaScript['text_print_variable_to_console'] = function(block) {
  const value = Blockly.JavaScript.valueToCode(block, 'VAR', 0);

  return `consolelog(${value});\n`
}
