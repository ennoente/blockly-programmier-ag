import Blockly from 'blockly/core';

const fetchWeatherBlock = {
  "type": "weather_get",
  "message0": "Überprüfe Wetter in %1",
  "inputsInline": false,
  "args0": [
    {
      "type": "field_input",
      "name": "CITY"
    }
  ],
  "output": null
};

Blockly.Blocks['weather_get'] = {
  init: function() {
    this.jsonInit(fetchWeatherBlock);
    this.setStyle('text_blocks');
  }
};

Blockly.JavaScript['weather_get'] = function(block) {
  const city = block.getFieldValue('CITY');

  return [`await fetchWeather('${city}')`, Blockly.JavaScript.ORDER_NONE];
};
