/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headerBlue: "#374370",
        tabs: "#8E95AF",
        white: "#ffffff",
        priority: {
          high: "#5feef8",
          medium: "#c4a8ff",
          low: "#ffd277",
        },
        font: {
          primary: "#ffffff",
          tabInactive: "#8e95af",
          taskDescription: "#4f4f4f",
          placeholder: "#959090",
          filter: "#8E95AF",
        },
        background: {
          startContents: "#222841",
          endContents: "#001b41",
          searchBar: "#373f60",
          status: "#2e3551",
          countBox: "#434b70",
          input: "#6a6c93",
          agendaBox: "#2e3551",
          tabs: "#2e3653",
        },
        border: {
          search: "#817a7a",
          editorTitle: "#001b41",
          editor: "#8f8e8e",
          gray: "#2d2d2d",
          lightGray: "#ccc",
          activeTab: "#5E7FEC",
        },
        button: {
          filter: "#2e3653",
          prevNext: "#f7edff4d",
          add: "#5E7FEC",
        },
        hover: {
          add: "#597BED",
          filter: "#2C3555",
          dropdown: "#e5e4ee",
        },
        scrollbar: {
          track: "#fff6",
          thumb: "#00000026",
        },
        shadow: "#545454",
        backdrop: "#00000080",
      },
    },
  },
  plugins: [],
};
