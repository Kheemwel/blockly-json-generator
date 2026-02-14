import { createSignal } from "solid-js";
import Navbar from "~/components/Navbar";
import BlocklyWorkspace from "~/components/BlocklyWorkspace";
import JsonPreview from "~/components/JsonPreview";

export default function Home() {
  const [json, setJson] = createSignal("");
  const [isPreviewVisible, setIsPreviewVisible] = createSignal(false);

  const handleTogglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible());
  };

  return (
    <div class="h-screen flex flex-col overflow-hidden">
      <Navbar onTogglePreview={handleTogglePreview} />
      
      <div class="flex-1 flex overflow-hidden relative">
        {/* Blockly Workspace */}
        <div class="flex-1 overflow-hidden">
          <BlocklyWorkspace onJsonChange={setJson} />
        </div>

        {/* JSON Preview */}
        <JsonPreview 
          json={json()} 
          isVisible={isPreviewVisible()} 
          onClose={() => setIsPreviewVisible(false)}
        />
      </div>
    </div>
  );
}
