/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./componentes/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container:{
            center: true
        },
      extend: {
        colors: {
          primary: "#1E40AF",
          roxo: "#9333EA",
          danger: "#DC2626",
          amarelo: "#FFFF19",
          amarelinho: "#ffff57",
          cinza:  "#2F3136",
          cinzaClaro:"b4b4b6",
          azulClaro: "#00BFFF",
          azulzinho: "#99e5ff",
          roxinho:"#dfc8f8"

        
        },
        backgroundImage: {
          'gradient-custom': "linear-gradient(to bottom right, #9333EA,#9333EA, #FFFF19, #2F3136)", 
        },
        backgroundImage: {
          'salao': "url('/salao.png')"
        }
      },
      
    },
    plugins: [],
  };
  