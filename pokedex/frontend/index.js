let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
    try {
        const response = await fetch("http://localhost:3000/pokemon");
        if (!response.ok) {
            throw new Error("HTTP call failed");
        }
        const data = await response.json();
        pokemonData = data;
        renderApp();
    } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
        renderApp();
    }
}

// Card component
function PokemonCard({ image, name, types }) {
    return React.createElement(
        "div",
        { className: "pokemon-card p-4 shadow-md rounded-lg bg-purple-100 hover:bg-purple-200 transition-shadow duration-300 w-full sm:w-48 m-2 text-center" }, 
        React.createElement("img", { className: "w-32 h-32 mx-auto hover:shadow-lg", src: image, alt: `Image of ${name}` }),
        React.createElement("h2", { className: "text-xl font-bold mt-2 text-purple-800" }, name), 
        React.createElement("p", { className: "text-purple-600" }, `Type: ${types}`) 
    );
}

// List component
function PokemonList() {
    if (pokemonData.length === 0) {
        return React.createElement(
            "p",
            { className: "text-center text-lg font-semibold text-purple-700" },  
            "Loading Pokemon data..."
        );
    }

    return React.createElement(
        "div",
        { className: "flex flex-wrap justify-center" },
        pokemonData.map((pokemon) =>
            React.createElement(PokemonCard, {
                key: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.join("/"),
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
            })
        )
    );
}

// App component wrap header and list
function App() {
    return React.createElement(
        "div",
        { className: "min-h-screen flex flex-col items-center justify-center bg-purple-300 p-4" }, 
        React.createElement(
            "header",
            { className: "w-full py-4 bg-purple-700 shadow-md mb-4" }, 
            React.createElement(
                "h1",
                { className: "text-3xl font-bold text-center text-purple-100" }, 
                "Pokemon"
            )
        ),
        React.createElement(PokemonList, null)
    );
}

// Function to render the app
function renderApp() {
    ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
