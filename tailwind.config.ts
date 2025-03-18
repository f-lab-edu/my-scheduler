export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headerBlue: "#374370",
        tabs: "#2e3653",
        white: "#ffffff",
        card: {
          high: "#5feef8",
          medium: "#c4a8ff",
          low: "#ffd277",
        },
        font: {
          primary: "#ffffff",
          tabInactive: "#8e95af",
          taskDescription: "#4f4f4f",
          placeholder: "#959090",
        },
        background: {
          startContents: "#222841",
          endContents: "#001b41",
          searchBar: "#373f60",
          taskList: "#2e3551",
          countBox: "#434b70",
          input: "#6a6c93",
          agendaBox: "#2e3551",
        },
        border: {
          search: "#817a7a",
          editorTitle: "#001b41",
          editor: "#8f8e8e",
          gray: "#2d2d2d",
          lightGray: "#ccc",
        },
        button: {
          filter: "#2e3653",
          prevNext: "#f7edff4d",
        },
        hover: {
          add: "#3c4b7e",
          filter: "#403c6d",
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
