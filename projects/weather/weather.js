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
      console.log(Math.round(main.temp));
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

      const li = $(document.createElement("li"));
      li.addClass("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>&deg;C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.html(markup);
      list.append(li);
    })
    .catch(() => {
      msg.text("Please search for a valid city!");
    });

  msg.text("");
  form.trigger("reset");
  input.focus();
});
