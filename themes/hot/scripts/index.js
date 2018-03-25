const moment = require('moment-timezone');
moment.tz.setDefault('Australia/Brisbane');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function printDate(source){
  const date = new Date(source);
  const now = new Date();
  const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  if(date.getDay() != now.getDay()) {
    return `${days[date.getDay()]} at ${time}`;
  } else {
    return `At ${time}`;
  }
}

function relativeDate(source){
  return `<time class="app-enhance" data-app="relativeDate" datetime="${new Date(source).toISOString()}">${moment(new Date(source)).toISOString(true)}</time>`;
}

function getPostAuthor(site, post){
  var author = site.data.authors[post.author];
  if (!author){
    author = {
      fallback: true,
      name: "Unknown author",
      avatar: "",
      bio: "Written by an anonymous source."
    }
  }
  return author;
}

function resolveLicense(license){
  const licenses = {
    'https://creativecommons.org/licenses/by/4.0/': {
      name: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    },
    'https://creativecommons.org/licenses/by-nd/4.0/': {
      name: 'Creative Commons Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) ',
    }
  }
  if(!license) return null;
  if(!licenses[license]) return {
    name: 'custom',
  };
  return licenses[license];
}

function getCopyright(config, site, post){
  const author = getPostAuthor(site, post);
  if(author.fallback){
    return {
      author: config.author || config.title,
      copyright: 'All Rights Reserved',
    }
  }

  const license = resolveLicense(post.license);
  return {
    author: author.name,
    copyright: license ? `licensed under a <a rel="license" href="${post.license}">${license.name}</a> license` : 'All rights reserved',
  }
}

function splitDays(events) {
  const days = {};
  events
    .filter(event => moment(new Date(event.timeStart)) > moment().startOf('day'))
    .filter(event => moment(new Date(event.timeStart)) < moment().endOf('day').add(2, 'weeks'))
    .forEach(event => {
      const timeStart = moment(new Date(event.timeStart));
      const key = timeStart.format('YYYY MM DD');
      const name = timeStart.format('dddd');
      const date = timeStart.format('Do');
      event.friendlyTimeStart = timeStart.format('h:mma');
      if(!days[key]) days[key] = { name, date, events: [] };
      if(event.uri.includes('/holiday')){
        days[key].holiday = event.name;
      } else {
        days[key].events.push(event);
      }
    });

  const iterable = Object.keys(days).map(key => days[key]);

  return iterable;
}

hexo.extend.helper.register('splitDays', splitDays);
hexo.extend.helper.register('printDate', printDate);
hexo.extend.helper.register('postAuthor', getPostAuthor);
hexo.extend.helper.register('footerCopyright', getCopyright);
hexo.extend.helper.register('relativeDate', relativeDate);
