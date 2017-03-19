---
layout:        post
title:         "Testy, testy, testy"
date:          2017-03-19 23:33:00 +0100
categories:    [Get Noticed!]
tags:          [get noticed, daj się poznać, react, testing, jest]
image:         /assets/images/103084-OM8M26-164.jpg
image_caption: Lista kontrolna <a href='http://www.freepik.com/free-vector/hand-drawn-background-of-clipboard-with-checklist_1069873.htm'>Designed by Freepik</a>
excerpt:       Czym jest aplikacja bez testów? Dzisiaj opiszę w jaki sposób skonfigurowałem testy, czego używam do testowania oraz jak piszę proste testy jednostkowe.
---

Czym jest aplikacja bez testów? Dzisiaj opiszę w jaki sposób skonfigurowałem testy, czego używam do testowania oraz jak
piszę proste testy jednostkowe.

Właściwie kod miałem już gotowy na początku tygodnia, ale jakoś nie mogłem się zebrać, żeby opisać kolejny etap. Aby nie
było tygodnia, w którym nic nie opublikowałem, nadrabiam zaległości w niedzielną noc.

## Na początek
Co dostajemy od razu, dzięki `create-react-project`, zajrzyjmy do pliku `package.json`:

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

Polecenie uruchamiające testy to `react-scripts test --env=jsdom`. No to patrzymy dalej, czym jest tajemniczy
`react-scripts` (znajdziesz go oczywiście w katalogu `node_modules` lub na [githubie][1]):

{% highlight javascript %}
// create-react-app/packages/react-scripts/scripts/test.js
// ...
const jest = require('jest');
// ...
jest.run(argv);
{% endhighlight %}

Czyli uruchamia testy za pomocą [Jest][2]. Jest nie wymaga żadnej szczególnej konfiguracji, dlatego nie ma nic więcej
ciekawego do zobaczenia w tym pliku. Pliki z testami są wykrywane na podstawie nazwy. Powinny nazywać się `*.test.js`
lub `*.spec.js`.

Facebook [podpowiada][3] również, że Airbnb wydało narzędzie do testowania [Enzyme][4]. Warto go użyć. Dzięki niemu
testowanie komponentów Reacta jest łatwiejsze. Zainstalowałem moduł uruchamiając polecenie
`npm install enzyme --save-dev`. Zainstalowałem także [`jest-enzyme`][5]. Potrzebna była jeszcze jedna linijka
konfiguracji:

{% highlight javascript %}
// src/setupTests.js
import 'jest-enzyme';
{% endhighlight %}

## Pierwszy test
Pierwszym komponentem, który chcę przetestować jest `App`, który stanowi niejako szablon całej aplikacji. Na razie
znajduje się w nim nagłówek, nawigacja oraz wyświetlana jest zawartość poszczególnych podstron. `App` to ten komponent
nadrzędny, do którego są dodawane poszczególne komponenty stanowiące podstrony. Dla przypomnienia definicja routingu:

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

Pierwszym podstawowym testem dla każdego komponentu może być sprawdzenie, czy w ogóle renderuje się.

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

Czyli próbuję wyrenderować komponent za pomocą funkcji `ReactDOM.render` i w przypadku braku błędów test przechodzi
poprawnie.

## Enzyme
Teraz wchodzi do gry Enzyme. Napiszę test, który sprawdza, czy komponent zawiera nagłówek z oczekiwanym tekstem.

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

Mam do dyspozycji asercję [`toContainReact(ReactInstance:Object)`][6], więc łatwo poszło. Więcej asercji dla Reacta
[tutaj][7].

Kolejne testy to sprawdzenie, czy jest nawigacj oraz czy dzieci renderują się we właściwym miejscu:

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

Więcej testów [tutaj][8], a na koniec podam jeszcze konfigurację [Travis CI][9] - tak, tak, uruchomiłem CI dla tego
projektu.

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

W skrócie:
- nodejs w wersji 6,
- instalacja `npm install`,
- testy `npm test`,
- powiadomienia w Slacku zamiast na email.

To tyle na początek testowania. Prawdziwa zabawa zacznie się, gdy powstanie prawdziwy interfejs w Material UI.

Link do repozytorium projektu [https://github.com/mkutyba/FormularzeKonsumenckie][10]

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