import * as Blockly from 'blockly';

// JSON Object Block - container for key-value pairs
Blockly.Blocks['json_object'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Object {');
        this.appendStatementInput('KEYS')
            .setCheck('JsonKey')
            .appendField('');
        this.appendDummyInput()
            .appendField('}');
        this.setOutput(true, ['JsonValue', 'JsonElement']);
        this.setColour(230);
        this.setTooltip('JSON Object');
        this.setHelpUrl('');
    }
};

// JSON Array Block - container for elements
Blockly.Blocks['json_array'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('Array [');
        this.appendStatementInput('ELEMENTS')
            .setCheck('JsonElement')
            .appendField('');
        this.appendDummyInput()
            .appendField(']');
        this.setOutput(true, ['JsonValue', 'JsonElement']);
        this.setColour(260);
        this.setTooltip('JSON Array');
        this.setHelpUrl('');
    }
};

// JSON Key Block - key-value pair for objects
Blockly.Blocks['json_key'] = {
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck(['JsonValue', 'JsonElement'])
            .appendField('key:')
            .appendField(new Blockly.FieldTextInput('key'), 'KEY')
            .appendField('→');
        this.setPreviousStatement(true, 'JsonKey');
        this.setNextStatement(true, 'JsonKey');
        this.setColour(160);
        this.setTooltip('Key-value pair for JSON object');
        this.setHelpUrl('');
    }
};

// JSON Element Block - wrapper for array elements
Blockly.Blocks['json_element'] = {
    init: function () {
        this.appendValueInput('VALUE')
            .setCheck(['JsonValue', 'JsonElement'])
            .appendField('element:');
        this.setPreviousStatement(true, 'JsonElement');
        this.setNextStatement(true, 'JsonElement');
        this.setColour(290);
        this.setTooltip('Array element');
        this.setHelpUrl('');
    }
};

// JSON String Value
Blockly.Blocks['json_value_string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('"')
            .appendField(new Blockly.FieldTextInput('text'), 'VALUE')
            .appendField('"');
        this.setOutput(true, 'JsonValue');
        this.setColour(120);
        this.setTooltip('String value');
        this.setHelpUrl('');
    }
};

// JSON Number Value
Blockly.Blocks['json_value_number'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0), 'VALUE');
        this.setOutput(true, 'JsonValue');
        this.setColour(120);
        this.setTooltip('Number value');
        this.setHelpUrl('');
    }
};

// JSON Boolean Value
Blockly.Blocks['json_value_boolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['true', 'TRUE'],
                ['false', 'FALSE']
            ]), 'VALUE');
        this.setOutput(true, 'JsonValue');
        this.setColour(120);
        this.setTooltip('Boolean value');
        this.setHelpUrl('');
    }
};

// JSON Null Value
Blockly.Blocks['json_value_null'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('null');
        this.setOutput(true, 'JsonValue');
        this.setColour(120);
        this.setTooltip('Null value');
        this.setHelpUrl('');
    }
};

export const jsonBlocks = Blockly.Blocks;
