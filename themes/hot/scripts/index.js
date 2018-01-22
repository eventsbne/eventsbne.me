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
  return `<time class="app-enhance" data-app="relativeDate" datetime="${new Date(source).toISOString()}">${new Date(source)}</time>`;
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

hexo.extend.helper.register('printDate', printDate);
hexo.extend.helper.register('postAuthor', getPostAuthor);
hexo.extend.helper.register('footerCopyright', getCopyright);
hexo.extend.helper.register('relativeDate', relativeDate);
