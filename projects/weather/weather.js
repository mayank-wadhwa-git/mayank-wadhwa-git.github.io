const form = $(".top-banner form");
const input = $(".top-banner input");
const msg = $(".top-banner .message");
const list = $(".weather-section .cities");
const apiKey = "228479ec9c082e7b5a65154917811367";

form.on("submit", (e) => {
  e.preventDefault();
  let city_name = input.val();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

      //check if there's already a city
      const listItems = $(".weather-section .city");
      const listItemsArray = Array.from(listItems);

      if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter((el) => {
          let content = "";
          if (city_name.includes(",")) {
            //   If length of country code is more than 2 then we ignore the country code and check only the city
            if (city_name.split(",")[1].length > 2) {
              city_name = city_name.split(",")[0];
              content = el
                .querySelector(".city-name span")
                .textContent.toLowerCase();
            } else {
              content = el
                .querySelector(".city-name")
                .dataset.name.toLowerCase();
            }
          } else {
            content = el
              .querySelector(".city-name span")
              .textContent.toLowerCase();
          }
          return content == name.toLowerCase();
        });

        if (filteredArray.length > 0) {
          msg.text(
            `You already know the weather for ${
              filteredArray[0].querySelector(".city-name span").textContent
            } ...otherwise be more specific by providing the country code as well`
          );
          form.trigger("reset");
          input.focus();
          return;
        }
      }

      const li = $(document.createElement("li"));
      li.addClass("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${main.temp}<sup>&deg;C</sup></div>
        <p>
          <h3>Coldest - ${Math.floor(main.temp_min)}<sup>&deg;C</sup></h3>
          <h3>Warmest - ${Math.ceil(main.temp_max)}<sup>&deg;C</sup></h3>
        </p>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.html(markup);
      const preference = [];
      const user_preference = {
        city: `${name}`,
        country_code: `${sys.country}`,
        temp: `${main.temp}`,
        min_temp: `${Math.floor(main.temp_min)}`,
        max_temp: `${Math.ceil(main.temp_max)}`,
        icon: `${icon}`,
        desc: `${weather[0]["description"]}`,
      };
      if (localStorage.getItem("preference") != null) {
        const weather_data = JSON.parse(localStorage.getItem("preference"));
        weather_data.map((item) => {
          preference.push(item);
        });
      }
      preference.push(user_preference);
      localStorage.setItem("preference", JSON.stringify(preference));
      list.append(li);
    })
    .catch(() => {
      msg.text("Please search for a valid city!");
    });

  msg.text("");
  form.trigger("reset");
  input.focus();
});
