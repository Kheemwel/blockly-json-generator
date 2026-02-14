import { Component } from 'solid-js';

interface NavbarProps {
  onTogglePreview?: () => void;
}

const Navbar: Component<NavbarProps> = (props) => {
  return (
    <nav class="bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div class="container px-4 py-4 flex items-center justify-between">
        <div class="flex flex-row gap-4 items-center">
          <img src="/logo.png" alt="logo.png" class='size-8' />
          <h1 class="text-2xl font-bold tracking-tight">
            Blockly JSON Generator
          </h1>
        </div>

        {/* Mobile toggle button for JSON preview */}
        <button
          onClick={props.onTogglePreview}
          class="lg:hidden bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
          aria-label="Toggle JSON Preview"
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
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
