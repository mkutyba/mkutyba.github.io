---
layout:        post
title:         "Testing, testing, testing"
date:          2017-03-19 23:33:00 +0100
categories:    [Get Noticed!]
tags:          [get noticed, daj się poznać, react, testing, jest]
image:         /assets/images/103084-OM8M26-164.jpg
image_caption: Checklist <a href='http://www.freepik.com/free-vector/hand-drawn-background-of-clipboard-with-checklist_1069873.htm'>Designed by Freepik</a>
excerpt:       What is an app without tests? Today I will describe how I configured tests, what do I use for testing and how do I write simple unit tests.
---

What is an app without tests? Today I will describe how I configured tests, what do I use for testing and how do I write
simple unit tests.

Actually the code was ready at the beginning of the week, but somehow I couldn't get to describe the next step. To not
let it be a week without posting, I'm catching up on Sunday night.

## First things first
What we get right away thanks to `create-react-project`, let's look to the file `package.json`:

{% highlight json %}
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
{% endhighlight %}

The command to run tests is `react-scripts test --env=jsdom`. Well, we look further what is the mysterious
`react-scripts` (of course you will find it in the directory `node_modules` or on [github][1]):

{% highlight javascript %}
// create-react-app/packages/react-scripts/scripts/test.js
// ...
const jest = require('jest');
// ...
jest.run(argv);
{% endhighlight %}

So it runs tests using [Jest][2]. Jest doesn't require any particular configuration, therefore there is nothing more
interesting to see in this file. Test files are detected based on the name. They should be named `*.test.js` or
`*.spec.js`.

Facebook also [suggests][3] that Airbnb released [Enzyme][4] testing tool. It's worth using it. Thanks to it testing of
React components is easier. I installed the module by running the command `npm install enzyme --save-dev`. I installed
also [`jest-enzyme`][5]. What was needed was one more line in configuration:

{% highlight javascript %}
// src/setupTests.js
import 'jest-enzyme';
{% endhighlight %}

## First test
The first component that I want to test is `App`, which is a kind of layout for the whole application. For now it
contains the header, navigation and displays the content of individual pages. App is the parent component, to which are
added the individual components which are subpages. As a reminder, the definition of routing below:

{% highlight jsx %}
<Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/forms" component={Forms}>
        <Route path="/forms/:formName" component={Form}/>
    </Route>
    <Route path="/lawsuits" component={Lawsuits}>
        <Route path="/lawsuits/:lawsuitName" component={Lawsuit}/>
    </Route>
</Route>
{% endhighlight %}

The first main test for each component may be to check whether it renders.

{% highlight jsx %}
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
        <App>
            <span/>
        </App>
    ), div);
});
{% endhighlight %}

So I'm trying to render a component using `ReactDOM.render` and if no errors the test passes.

## Enzyme
Now comes into play Enzyme. I write a test that checks whether the component contains a header with the expected text.

{% highlight jsx %}
it('contains header', () => {
    const wrapper = shallow(
        <App>
            <span/>
        </App>
    );
    const header = <h1>Formularze Konsumenckie</h1>;

    expect(wrapper).toContainReact(header);
});
{% endhighlight %}

I can use an assertion [`toContainReact(ReactInstance:Object)`][6], so it was easy. More assertions for React [here][7].

Another test is to check whether the navigation is present and children render in the right place:

{% highlight jsx %}
it('contains navigation', () => {
    const wrapper = shallow(
        <App>
            <span/>
        </App>
    );

    expect(wrapper.find('ul[role="navigation"]')).toBePresent();
});

it('renders children when passed in', () => {
    const wrapper = shallow(
        <App>
            <div className="unique" />
        </App>
    );
    const child = <div className="unique" />;

    expect(wrapper).toContainReact(child);
});
{% endhighlight %}

More tests [here in my repo][8] and at the end I will add a configuration for [Travis CI][9] - yes, yes, I launched CI
for this project.

{% highlight yml %}
language: node_js
sudo: false
node_js:
  - "6"
install:
  - npm install
script:
  - npm test
notifications:
  slack: user:token
  email: false
{% endhighlight %}

In brief:
- nodejs version 6,
- installation `npm install`,
- tests `npm test`,
- notifications in Slack instead of email.

That's it for the beginning of the testing. The real fun starts with a real interface in the Material UI.

Link to the project repository [https://github.com/mkutyba/FormularzeKonsumenckie][10]

[1]: https://github.com/facebookincubator/create-react-app/tree/master/packages/react-scripts
[2]: https://facebook.github.io/jest/
[3]: https://facebook.github.io/react/docs/test-utils.html
[4]: http://airbnb.io/enzyme/
[5]: https://github.com/blainekasten/enzyme-matchers/tree/master/packages/jest-enzyme
[6]: https://github.com/blainekasten/enzyme-matchers/blob/master/README.md#tocontainreactreactinstanceobject
[7]: https://github.com/blainekasten/enzyme-matchers/blob/master/README.md#assertions
[8]: https://github.com/mkutyba/FormularzeKonsumenckie/commit/9362f8c2af1621a807f4b4b5944c86c725f6defe
[9]: https://travis-ci.org/
[10]: https://github.com/mkutyba/FormularzeKonsumenckie