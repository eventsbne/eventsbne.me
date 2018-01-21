eventsbne.me
============
This is *the work-in-progress* repo for the eventsbne.me site. The site is an
aggregator + attempt at curation of Brisbane tech events.

## For developers
Pull requests are welcome.

The site works by:

1. Custom scraper/db to fetch & normalize from Eventbrite and Metup
2. Script in the `data` folder to output from the DB into markdown format for our static site generator.
3. The Node-based [Hexo](https://hexo.io/) static site generator to render flat files
4. Static-site hosting on [Netlify](https://netlify.com/)

When developing:

* HTML templates, JS and CSS are editable in [/themes/landscape](themes/landscape)
* Data manipulation is done in [/data](data)
* Content is managed in [/source](source). Please note that the contents of [/source/events](source/events) are generated and should not be edited by hand at this time.

## For metadata enthusiasts
If you want to help improve the metadata on eventsbne, you can do so by contributing to our community metadata in [/data/overrides](data/overrides).

This data is used to dedupe organizers & venues, and will eventually be used to curate favourite meetups. If you have time, adding to this list would be amazing.

## For content creators
My goal is to make this a place where the community can contribute posts, either about the community, upcoming events, or experiences relating to Brisbane tech.

If you have an article you would like published, shoot it in an email body to ash@kyd.com.au. If you're more technically minded, you cansubmit a pull request with the following steps:

To create a new post:

1. Clone this repo
1. run `npm install`
1. run `npx hexo new post`
1. You will have a new post created in the [/source/_posts](source/_posts) folder. You can edit this with Markdown/HTML
1. Preview the site using `npx hexo server`. This will start a server on your local machine.

To add a new author:
1. Edit [/source/_data/authors.yml](source/_data/authors.yml)

## License & copying
There are a few licenses for this repo:

1. For code, the [ISC license](https://opensource.org/licenses/ISC) applies.
2. For content, the license is provided in the front matter of the markdown. This is printed in the page footer when the site is generated. Generally, these will be a Creative Commons license of some sort.

When contributing content, please use a CC-BY or CC-BY-SA license. We may choose to monetize the site in future to cover costs & support the community, so at this time we can't accept non-commercial content.
