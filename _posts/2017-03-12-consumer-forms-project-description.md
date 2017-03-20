---
layout:     post
title:      "Consumer Forms - description of the project and technology"
date:       2017-03-12 22:04:00 +0100
categories: [Get Noticed!]
tags:       [get noticed, daj się poznać, react]
---

It's time for another post in the series Get Noticed! (Polish: "Daj Się Poznać"). Finally translated texts into English,
enjoy!

## Project objective
Creating online forms for consumer - a web application running in a browser.

## The assumptions
Running completely in the browser (frontend). No backend, completed forms will not be stored anywhere. Mainly due to
requirements related to the processing of personal data. I don't want to waste time writing
<abbr title="Terms of service">TOS</abbr>, privacy policy, report data set to the
<abbr title="Inspector General for Personal Data Protection, Polish: Generalny Inspektor Ochrony Danych Osobowych">GIODO</abbr>,
etc.

## Technology
I decided to use <abbr title="JavaScript">JS</abbr> library [React][1], because I want to train. This choice wasn't
caused by any other reason. Additionally I plan to use the [Redux][2], which will help me in managing the state of the
application. If the whole process of filling out the form is to be carried without the backend, I would like to have the
current state of the application easily loaded, for example from [localStorage][3] or
[<abbr title="Uniform Resource Identifier">URI</abbr>][4] parameters.

## Creating and running a project
For now, I'm writing in PhpStorm. I know this is a bad choice for JavaScript, but I don't want to buy WebStorm. I think
of using [Atom][5] but didn't have enough time to mess around. This blog is also written in PhpStorm.

I created a project using the tool [Create React App][6] provided by Facebook. This project boilerplate is enough for
me, it contains all I need: Webpack, Babel, ESLint. It doesn't require any configuration and, most importantly, it
works. If you need more advanced started project, eg. with hot reloading, router, or other functions, you can use this
[search engine for React started projects] [7], to find your perfect starter.

When it comes to styling, I use a ready-made solution [Material-UI][8]. It's a set of components for React, which
implements assumptions of [Material Design by Google][9]. Consumer Forms is an utility app, so creating my own
sophisticated graphic design is unnecessary. Material Design is known to users, at least because of
[the popularity of Android in Poland] [10], which is why using the application should be fairly intuitive. To be honest
this is not a very complicated project.

Creating a skeleton of the application is "relatively simple". According to the documentation it is enough to run:

{% highlight bash %}
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start
{% endhighlight %}

The application works and is available at http://localhost:3000/. You can now start writing. Since the beginning it has
live reload, so all changes are immediately visible in the browser, you do not need to configure anything.

At the beginning I installed [`react-router`][11] and aforementioned [`material-ui`][12] (and
[`react-tap-event-plugin`][13]). I included in the file `index.html` a chunk of code responsible for loading
[Roboto][14] fotn:

{% highlight javascript %}
var WebFontConfig = {
  google: { families: [ 'Roboto:400,300,500:latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
{% endhighlight %}

## Application structure and routing
Below I present the initial application structure, divided into pages.
- o co tu chodzi (strona startowa) - En: about
- formularze i wnioski - En: forms and applications
  - formularz 1 - En: form 1
  - formularz 2 - En: form 2
  - ...
  - formularz n - En: form n
- pozwy, skargi i inne - En: Lawsuits, complaints and other
  - formularz 1 - En: form 1
  - formularz 2 - En: form 2
  - ...
  - formularz n - En: form n

Mapping the structure using a router:
{% highlight jsx %}
<Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/forms" component={Forms}>
            <Route path="/forms/:formName" component={Form}/>
        </Route>
        <Route path="/lawsuits" component={Lawsuits}>
            <Route path="/lawsuits/:lawsuitName" component={Lawsuit}/>
        </Route>
    </Route>
</Router>
{% endhighlight %}

Link to the project repository [https://github.com/mkutyba/FormularzeKonsumenckie][15]

[1]: https://facebook.github.io/react/
[2]: http://redux.js.org/
[3]: https://developer.mozilla.org/en/docs/Web/API/Window/localStorage
[4]: https://developer.mozilla.org/en-US/docs/Glossary/URI
[5]: https://atom.io/
[6]: https://github.com/facebookincubator/create-react-app
[7]: http://andrewhfarmer.com/starter-project/
[8]: http://www.material-ui.com/
[9]: https://material.io/guidelines/material-design/introduction.html
[10]: http://www.ranking.pl/pl/rankings/operating-systems.html
[11]: https://www.npmjs.com/package/react-router
[12]: https://www.npmjs.com/package/material-ui
[13]: https://www.npmjs.com/package/material-ui#react-tap-event-plugin
[14]: https://fonts.google.com/specimen/Roboto
[15]: https://github.com/mkutyba/FormularzeKonsumenckie