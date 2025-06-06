export class Theme {
  private static readonly STORAGE_KEY = "darkMode";
  private static readonly DARK_CLASS = "dark";

  static init(): void {
    // Check stored preference or system preference
    const isDark = localStorage.getItem(this.STORAGE_KEY) === "true" ||
      (!localStorage.getItem(this.STORAGE_KEY) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add(this.DARK_CLASS);
    } else {
      document.documentElement.classList.remove(this.DARK_CLASS);
    }

    // Remove any existing event listener
    document.removeEventListener("click", this.handleClick);

    // Add new event listener
    document.addEventListener("click", this.handleClick);

    // Update any existing toggle buttons
    const toggleButton = document.getElementById("darkModeToggle");
    if (toggleButton) {
      this.updateToggleButton(toggleButton);
    }
  }

  private static handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const toggleButton = target.closest(
      "#darkModeToggle"
    ) as HTMLElement | null;

    if (toggleButton) {
      this.toggle();
      this.updateToggleButton(toggleButton);
    }
  };

  private static toggle(): void {
    const isDark = document.documentElement.classList.toggle(this.DARK_CLASS);
    localStorage.setItem(this.STORAGE_KEY, isDark.toString());
  }

  private static updateToggleButton(button: HTMLElement): void {
    const isDark = document.documentElement.classList.contains(this.DARK_CLASS);

    // Update icon
    button.innerHTML = isDark
      ? `
      <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    `
      : `
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    `;
  }
}
