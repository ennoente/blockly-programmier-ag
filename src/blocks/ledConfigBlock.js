/**
 * @author Enno Thoma (enno.thoma@uni-oldenburg.de)
 */

import Blockly from 'blockly/core';

const ledConfigBLock = {
  "type": "led_config",
  "message0": "Lasse LED %1 leuchten",
  "args0": [
    {
      "type": "field_input",
      "name": "VAR"
    }
  ],
  "previousStatement": null,
  "nextStatement": null
};

Blockly.Blocks['led_config'] = {
  init: function() {
    this.jsonInit(ledConfigBLock);
    this.setStyle('text_blocks');
  }
};

Blockly.JavaScript['led_config'] = function(block) {
  //console.log('block.getFieldValue("VAR")', block.getFieldValue('VAR'));
  const newLedConfig = block.getFieldValue('VAR');

  return `setLedConfig('${newLedConfig}')`;
}
