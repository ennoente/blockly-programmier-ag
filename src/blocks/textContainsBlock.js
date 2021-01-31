import Blockly from 'blockly/core';

const textContainsBlock = {
  "type": "text_contains",
  "message0": "%1 enthält %2",
  "args0": [
    {
      "type": "input_value",
      "name": "VAR"
    },
    {
      "type": "field_input",
      "name": "CHECK_INPUT"
    }
  ],
  "output": null
};

Blockly.Blocks['text_contains'] = {
  init: function() {
    this.jsonInit(textContainsBlock);
    this.setStyle('text_blocks');
  }
};

Blockly.JavaScript['text_contains'] = function(block) {
  const variableValue = Blockly.JavaScript.valueToCode(block, 'VAR', 0);
  const checkValue = block.getFieldValue('CHECK_INPUT');

  console.log(variableValue);
  console.log(checkValue);

  return [`${variableValue}.indexOf('${checkValue}') !== -1`, Blockly.JavaScript.ORDER_NONE];
}

