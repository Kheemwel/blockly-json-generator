import { Component, createSignal, Show } from 'solid-js';

interface JsonPreviewProps {
  json: string;
  isVisible: boolean;
  onClose: () => void;
}

const JsonPreview: Component<JsonPreviewProps> = (props) => {
  const [copied, setCopied] = createSignal(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(props.json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div 
      class={`
        fixed lg:relative top-0 right-0 h-full w-full lg:w-96 
        bg-gray-900 text-gray-100 shadow-2xl
        transform transition-transform duration-300 ease-in-out z-100
        ${props.isVisible ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}
    >
      <div class="h-full flex flex-col">
        {/* Header */}
        <div class="bg-linear-to-r from-gray-800 to-gray-900 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-100">JSON Output</h2>
          <button 
            onClick={props.onClose}
            class="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Preview"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        {/* JSON Display */}
        <div class="flex-1 overflow-auto p-6">
          <pre class="bg-gray-800 rounded-lg p-4 text-sm font-mono overflow-x-auto border border-gray-700">
            <code class="text-green-400">
              {props.json || '// No blocks yet'}
            </code>
          </pre>
        </div>

        {/* Copy Button */}
        <div class="p-6 border-t border-gray-700">
          <button
            onClick={handleCopy}
            disabled={!props.json}
            class={`
              w-full py-3 px-6 rounded-lg font-semibold
              transition-all duration-200 transform
              ${props.json 
                ? 'bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 active:scale-95 text-white shadow-lg' 
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            <Show when={copied()} fallback="Copy to Clipboard">
              <span class="flex items-center justify-center gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fill-rule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clip-rule="evenodd" 
                  />
                </svg>
                Copied!
              </span>
            </Show>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JsonPreview;
