import { Component, onMount, onCleanup, createEffect } from 'solid-js';
import * as Blockly from 'blockly';
import '../blocks/json_blocks';
import { generateJson } from '../generators/json_generator';

interface BlocklyWorkspaceProps {
  onJsonChange: (json: string) => void;
}

const BlocklyWorkspace: Component<BlocklyWorkspaceProps> = (props) => {
  let workspaceDiv: HTMLDivElement | undefined;
  let workspace: Blockly.WorkspaceSvg | undefined;

  onMount(() => {
    if (!workspaceDiv) return;

    // Create toolbox
    const toolbox = {
      kind: 'categoryToolbox',
      contents: [
        {
          kind: 'category',
          name: 'Structures',
          colour: '230',
          contents: [
            { kind: 'block', type: 'json_object' },
            { kind: 'block', type: 'json_array' },
          ],
        },
        {
          kind: 'category',
          name: 'Object',
          colour: '160',
          contents: [
            { kind: 'block', type: 'json_key' },
          ],
        },
        {
          kind: 'category',
          name: 'Array',
          colour: '290',
          contents: [
            { kind: 'block', type: 'json_element' },
          ],
        },
        {
          kind: 'category',
          name: 'Values',
          colour: '120',
          contents: [
            { kind: 'block', type: 'json_value_string' },
            { kind: 'block', type: 'json_value_number' },
            { kind: 'block', type: 'json_value_boolean' },
            { kind: 'block', type: 'json_value_null' },
          ],
        },
      ],
    };

    // Initialize workspace
    workspace = Blockly.inject(workspaceDiv, {
      toolbox: toolbox,
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
    });

    // Listen for changes
    workspace.addChangeListener(() => {
      if (workspace) {
        const json = generateJson(workspace);
        props.onJsonChange(json);
      }
    });

    // Add initial example block
    const xml = Blockly.utils.xml.textToDom(`
      <xml xmlns="https://developers.google.com/blockly/xml">
        <block type="json_object" x="50" y="50">
          <statement name="KEYS">
            <block type="json_key">
              <field name="KEY">name</field>
              <value name="VALUE">
                <block type="json_value_string">
                  <field name="VALUE">John Doe</field>
                </block>
              </value>
              <next>
                <block type="json_key">
                  <field name="KEY">age</field>
                  <value name="VALUE">
                    <block type="json_value_number">
                      <field name="VALUE">30</field>
                    </block>
                  </value>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </xml>
    `);
    Blockly.Xml.domToWorkspace(xml, workspace);
  });

  onCleanup(() => {
    if (workspace) {
      workspace.dispose();
    }
  });

  return (
    <div class="flex-1 h-full">
      <div 
        ref={workspaceDiv} 
        class="w-full h-full"
        style={{ "min-height": "400px" }}
      />
    </div>
  );
};

export default BlocklyWorkspace;
