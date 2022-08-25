let usrInput = "";

function getPokemon() {
  let pokecard = document.getElementById("pokemon");
  pokecard.innerHTML = "";

  //get usr input
  usrInput = document.getElementsByName("usrPokemon")[0].value.trim().toLowerCase();

  if (usrInput === "") {
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${usrInput}`)
    .then((response) => response.json())
    .then((result) => {
      pokecard.className="overflow-y-auto mx-auto mt-5 rounded-xl p-5 pokecard";

      const pokemonName = document.createElement('h1');
      pokemonName.innerText = result.name;
      pokemonName.className = "text-indigo-400 text-3xl text-center font-mono italic font-black tracking-wider mb-4";
      pokecard.appendChild(pokemonName);

      //Pokemon Image
      const pokemonImgFront = document.createElement('img');   
      pokemonImgFront.src = result.sprites.front_shiny;

      //Pokemon Image Styling
      pokemonImgFront.className = "flip-card mx-auto rounded-xl mb-5 pokecard-img";

      //Pokemon Image Onclick
      pokemonImgFront.onclick = () => {
        window.open('https://www.duckduckgo.com', '_blank', 'noopener noreferrer');
      }
      pokecard.appendChild(pokemonImgFront);

      const baseXpContainer = document.createElement('div');
      baseXpContainer.className = "flex justify-between";

      // Pokemon Base stats Title
      const baseXpLabel = document.createElement('p');
      baseXpLabel.innerText = "Base XP: ";
      // Pokemon Base stats Styling
      baseXpLabel.className = "text-l font-mono italic font-bold tracking-wider text-white mr-2";
      baseXpContainer.appendChild(baseXpLabel);

      // Pokemon Base XP
      const baseXpValue = document.createElement('p');
      baseXpValue.innerText =  result.base_experience;
      baseXpValue.className="text-l text-gray-600 font-mono italic font-semibold tracking-wider";
      baseXpContainer.appendChild(baseXpValue);

      pokecard.appendChild(baseXpContainer);

      //Pokemon Height
      const pokemonHeightContainer = document.createElement('div');
      pokemonHeightContainer.className = "flex justify-between";
      const pokemonHeightLeftLabel = document.createElement('p');
      pokemonHeightLeftLabel.innerText = " ";
      pokemonHeightLeftLabel.className = "text-l font-mono italic font-bold tracking-wider text-white mr-2";
      pokemonHeightContainer.appendChild(pokemonHeightLeftLabel);
      const pokemonHeightLabel = document.createElement('p');
      pokemonHeightLabel.innerText = "Height:";
      pokemonHeightLabel.className = "text-l font-mono italic font-bold tracking-wider text-white mr-2";
      pokemonHeightContainer.appendChild(pokemonHeightLabel);
      const pokemonHeightValue = document.createElement('p');
      pokemonHeightValue.innerText = result.height;
      pokemonHeightValue.className="text-l text-gray-600 font-mono italic font-semibold tracking-wider";
      
      pokemonHeightContainer.appendChild(pokemonHeightValue);
      pokecard.appendChild(pokemonHeightContainer);

      //Pokemon Weight
      const pokemonWeightContainer = document.createElement('div');
      pokemonWeightContainer.className = "flex justify-between";
      const pokemonWeightLeftLabel = document.createElement('p');
      pokemonWeightLeftLabel.innerText = " ";
      pokemonWeightLeftLabel.className = "text-l font-mono italic font-bold tracking-wider text-white mr-2";    
      pokemonWeightContainer.appendChild(pokemonWeightLeftLabel);
      const pokemonWeightLabel = document.createElement('p');
      pokemonWeightLabel.innerText = "Weight:";
      pokemonWeightLabel.className = "text-l font-mono italic font-bold tracking-wider text-white mr-2";
      pokemonWeightContainer.appendChild(pokemonWeightLabel);
      const pokemonWeightValue = document.createElement('p');
      pokemonWeightValue.innerText = result.weight;
      pokemonWeightValue.className="text-l text-gray-600 font-mono italic font-semibold tracking-wider";
      pokemonWeightContainer.appendChild(pokemonWeightValue);
      pokecard.appendChild(pokemonWeightContainer);

      //Pokemon Type Title
      const typeTitle = document.createElement('p');
      typeTitle.innerText = "Pokemon Types:";
      //Pokemon Type Title Styling
      typeTitle.className="text-xl font-mono italic font-bold tracking-wider text-white";
      pokecard.appendChild(typeTitle);

      const typeList = document.createElement('ul');
      typeList.className = "mb-4 ul-types";
      

      //Pokemon Types
      result.types.forEach(typesObj => {
        const pokemonType = document.createElement('li');
        pokemonType.innerText = typesObj.type.name;
        pokemonType.className = "text-l text-gray-600 font-mono italic font-semibold tracking-wider";
        typeList.appendChild(pokemonType);
      });

      pokecard.appendChild(typeList);

      const pokemonTableInfo = document.createElement('table');
      pokemonTableInfo.className="w-full";
      const headerRow = document.createElement('tr');
      ["Abilities", "Moves", "Stats"].forEach(title => {
        const titleElement = document.createElement('th');
        titleElement.innerText = title;
        headerRow.appendChild(titleElement);
      });
      pokemonTableInfo.appendChild(headerRow);
      const dataRow = document.createElement('tr');
      const abilityNames = result.abilities.map(abilityObj => abilityObj.ability.name);
      const moveNames = result.moves.slice(0, 5).map(moveObj => moveObj.move.name);
      [abilityNames, moveNames].forEach((dataList, index) => {
        const listContainer = document.createElement('div');
        if (index === 0) {
          listContainer.className = "text-left";
        } else {
          listContainer.className = "text-center";
        }
        dataList.forEach(data => {
          const valueContainer = document.createElement('p');
          valueContainer.innerText = data;
          listContainer.appendChild(valueContainer);
        });
        const dataContainer = document.createElement('td');
        dataContainer.className = "align-top";
        dataContainer.appendChild(listContainer);
        dataRow.appendChild(dataContainer)
      });
      pokemonTableInfo.appendChild(dataRow);

      // Pokemon Stats, first 5
      const statDataContainer = document.createElement('td');
      statDataContainer.className = "align-top";
      result.stats.slice(0, 3).forEach(statObj => {
        const pokemonStat = document.createElement('div');
        pokemonStat.className = "text-right";

        const pokemonSN = document.createElement('p');
        pokemonSN.innerText = statObj.stat.name;
        pokemonStat.appendChild(pokemonSN);

        const pokemonBS = document.createElement('p');
        pokemonBS.innerText = statObj.base_stat;
        pokemonStat.appendChild(pokemonBS);

        statDataContainer.appendChild(pokemonStat);
      });
      dataRow.appendChild(statDataContainer);
      pokemonTableInfo.appendChild(dataRow);

      pokecard.appendChild(pokemonTableInfo);
    })
    .catch(() => {
      //remove css from pokemon div when their is no pokemon found
      pokecard.className = "";

      const error = document.createElement('p');
      error.innerText = "Pokemon doesn't exist!";
      pokecard.appendChild(error);
    });
}
