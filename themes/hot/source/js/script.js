const moment = require('moment');
require('./modernizr-custom.min');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function printDate(source){
  const date = new Date(source);
  const now = new Date();

  if(date > moment().add(3, 'days')){
    return moment(date).format('LL LT');
  } else {
    return moment(date).format('dddd hA');
  }
}

function printDateSlug(source){
  const date = new Date(source);
  return [
    date.getFullYear(),
    String(date.getMonth()+1).padStart(2,'0'),
    String(date.getDate()).padStart(2,'0')
  ].join('/');
}

function initTwitter(){
  window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.async = 'async';
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
  }(document, "script", "twitter-wjs"));
}

function initFetch(){
  fetch('/upcoming.json')
    .then(response => response.json())
    .then((payload) => {
      const now = Date.now();
      const upcoming = payload.events.filter(e => new Date(e.timeStart) > now);
      runApps({
        upcoming,
      });
    });
}

function makeMessage(type, messageHTML){
  return `
    <div class="card ${type}">
      <div class="card-body">
        <p class="card-text">${messageHTML}</p>
      </div>
    </div>`;
}

function fetchDate(date, placeholder){
  const url = `/events/${printDateSlug(date)}`;
  placeholder.innerHTML = '<div class="spinner">Searching</div>';
  return fetch(url, {method: 'HEAD'})
    .then(e => {
      if(e.status === 200){
        window.location = url;
      } else {
         placeholder.innerHTML = makeMessage('text-white bg-success', `No events found for ${printDateSlug(date)} 👌`)
      }
    })
    .catch(e => placeholder.innerHTML = makeMessage('text-white bg-danger', e.text));
}

let loadedTwitter = false;
const apps = {
  twitter: () => {
    if(loadedTwitter) return;
    initTwitter();
    loadedTwitter = true;
  },
  upcomingToday: (data, config, el) => {
    if(!data.upcoming) return;
    const events = data.upcoming.slice(0, 4);
    return `
  <div class="list-group list-group-flush">
    ${events.map(e => `
      <a
        href="${e.uri}"
        class="wrap list-group-item list-group-item-action flex-column align-items-start"
        title="Event at ${new Date(e.timeStart).toString()}">
        <div class="d-flex w-100 justify-content-between">
          <p>
            <span class="mb-1 h6 wrap-target">${e.name}</span>
            <br>
            <small>${printDate(e.timeStart)} with ${e.organizer}</small>
          </p>

        </div>
      </a>
    `).join('')}
  </div>`;
  },
  /**
   * Return a contextual label for the "coming  up <x> module"
   */
  upcomingTimeLabel: (data, config, el) => {
    const hour = (new Date()).getHours();
    if(hour > 19) return 'Tomorrow';
    if(hour > 15) return 'Tonight';
    return 'Today';
  },

  eventsearch: (data, config, el) => {
    if(data.upcoming) return;
    el.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const input = el.querySelector('input');
      if(!input) alert('Sorry, couldn\'t process the form');

      const date = new Date(input.value);
      if(String(date) === 'Invalid Date') {
        return alert('Date could not be parsed. Please use format YYYY-MM-DD, or something else the Javascript date object can parse.');
      }

      fetchDate(date, el.querySelector('.results'));

    });
  },
  relativeDate: (data, config, el) => {
    el.innerText = printDate(el.attributes.datetime.value);
  },
}

function runApps(data){
  Array.from(document.querySelectorAll('.app-enhance')).forEach((el) => {
    const config = el.dataset;
    const app = config.app;
    if(!apps[app]){
      return console.error('could not find app', app, el);
    }
    const output = apps[app](data, config, el);
    if(output) el.innerHTML = output;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  runApps({});
});

// Kick off stuff
initFetch();

// Half hourly data refresh
setInterval(initFetch, 1000 * 60 * 30);
