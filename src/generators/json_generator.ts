import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';

// Create a custom generator for JSON
export const jsonGenerator = new Blockly.Generator('JSON');

// Define order of operations (not really needed for JSON but required)
(jsonGenerator as any).ORDER_ATOMIC = 0;
(jsonGenerator as any).ORDER_NONE = 99;

jsonGenerator.scrub_ = function (block: Blockly.Block, code: string, opt_thisOnly: boolean) {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = opt_thisOnly ? '' : jsonGenerator.blockToCode(nextBlock);
    return code + nextCode;
};


// JSON Object Generator
jsonGenerator.forBlock['json_object'] = function (block: Blockly.Block) {
    const statements = jsonGenerator.statementToCode(block, 'KEYS');
    if (!statements) {
        return ['{}', (jsonGenerator as any).ORDER_ATOMIC];
    }

    // Parse the statements to build object
    const lines = statements.trim().split('\n').filter(line => line.trim());
    const pairs = lines.map(line => line.trim().replace(/,$/, ''));
    const code = '{\n  ' + pairs.join(',\n  ') + '\n}';

    return [code, (jsonGenerator as any).ORDER_ATOMIC];
};

// JSON Array Generator
jsonGenerator.forBlock['json_array'] = function (block: Blockly.Block) {
    const statements = jsonGenerator.statementToCode(block, 'ELEMENTS');
    if (!statements) {
        return ['[]', (jsonGenerator as any).ORDER_ATOMIC];
    }

    // Parse the statements to build array
    const lines = statements.trim().split('\n').filter(line => line.trim());
    const elements = lines.map(line => line.trim().replace(/,$/, ''));
    const code = '[\n  ' + elements.join(',\n  ') + '\n]';

    return [code, (jsonGenerator as any).ORDER_ATOMIC];
};

// JSON Key Generator
jsonGenerator.forBlock['json_key'] = function (block: Blockly.Block) {
    const key = block.getFieldValue('KEY');
    const value = jsonGenerator.valueToCode(block, 'VALUE', (jsonGenerator as any).ORDER_ATOMIC) || 'null';

    return `"${key}": ${value}\n`;
};

// JSON Element Generator
jsonGenerator.forBlock['json_element'] = function (block: Blockly.Block) {
    const value = jsonGenerator.valueToCode(block, 'VALUE', (jsonGenerator as any).ORDER_ATOMIC) || 'null';

    return `${value}\n`;
};

// JSON String Value Generator
jsonGenerator.forBlock['json_value_string'] = function (block: Blockly.Block) {
    const value = block.getFieldValue('VALUE');
    // Escape special characters
    const escaped = value
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');

    return [`"${escaped}"`, (jsonGenerator as any).ORDER_ATOMIC];
};

// JSON Number Value Generator
jsonGenerator.forBlock['json_value_number'] = function (block: Blockly.Block) {
    const value = block.getFieldValue('VALUE');
    return [String(value), (jsonGenerator as any).ORDER_ATOMIC];
};

// JSON Boolean Value Generator
jsonGenerator.forBlock['json_value_boolean'] = function (block: Blockly.Block) {
    const value = block.getFieldValue('VALUE');
    return [value === 'TRUE' ? 'true' : 'false', (jsonGenerator as any).ORDER_ATOMIC];
};

// JSON Null Value Generator
jsonGenerator.forBlock['json_value_null'] = function (block: Blockly.Block) {
    return ['null', (jsonGenerator as any).ORDER_ATOMIC];
};

// Helper function to generate JSON from workspace
export function generateJson(workspace: Blockly.Workspace): string {
    try {
        const topBlocks = workspace.getTopBlocks(false);
        if (topBlocks.length === 0) {
            return '';
        }

        // Generate code for the first top-level block
        const code = jsonGenerator.blockToCode(topBlocks[0]);

        if (Array.isArray(code)) {
            return code[0];
        }
        return code || '';
    } catch (error) {
        console.error('Error generating JSON:', error);
        return '';
    }
}
