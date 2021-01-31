import Blockly from 'blockly/core';

const testMockWeatherBlock = {
  "type": "test_mock_weather",
  "message0": "To so, als sei das Wetter %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "VAR",
      "options": [
        [ "Sonnig", "Sonnig" ],
        [ "Leicht bewölkt", "Leicht bewölkt" ],
        [ "Bewölkt", "Bewölkt" ],
        [ "Neblig", "Neblig" ],
        [ "Nieselregen", "Nieselregen" ],
        [ "Regen", "Regen" ],
        [ "Starker Regen", "Starker Regen" ],
        [ "Extremer Regen", "Extremer Regen" ],
        [ "Schneeregen", "Schneeregen" ],
        [ "Schnee", "Schnee" ],
        [ "Gewitter", "Gewitter" ],
        [ "Schweres Gewitter", "Schweres Gewitter" ]
      ]
    }
  ],
  "output": null
};

Blockly.Blocks['test_mock_weather'] = {
  init: function() {
    this.jsonInit(testMockWeatherBlock);
    this.setStyle('text_blocks');
  }
};

Blockly.JavaScript['test_mock_weather'] = function(block) {
  const weatherValue = block.getFieldValue('VAR') || 'FEHLER';
  console.log("Mock weatherValue", weatherValue);

  return [ `'${weatherValue}'`, Blockly.JavaScript.ORDER_NONE ];
}
