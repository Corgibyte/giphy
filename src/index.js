import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import GiphyService from './giphy-service.js';


$("#search").submit((event) => {
  event.preventDefault();
  const searchTerm = $("#searchTerm").val();
  $("#searchTerm").val("");

  let promise = GiphyService.getSearch(searchTerm);
  promise.then(function(response) {
    const responseJSON = JSON.parse(response);
    outputGifs(responseJSON);
  });
});

function outputGifs(response) {
  let htmlString = "";
  if (Array.isArray(response.data)) {
    for (let i = 0; i < response.data.length; i++) {
      const imgUrl = response.data[i].images.original.url;
      htmlString = htmlString.concat(`<img src="${imgUrl}">`);
    }
  } else {
    const imgUrl = response.data.images.original.url;
    htmlString = `<img src=${imgUrl}">`;
  }
  $("#outputs").html(htmlString);
}

$("#trendSearch").click(() => {
  let promise = GiphyService.getTrend();
  promise.then(function(response) {
    const responseJSON = JSON.parse(response);
    outputGifs(responseJSON);
  });
});

$("#randomSearch").click(() => {
  let promise = GiphyService.getRandom();
  promise.then(function(response) {
    const responseJSON = JSON.parse(response);
    outputGifs(responseJSON);
  });
});
