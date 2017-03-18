---
layout:     post
title:      "Formularze Konsumenckie - opis projektu i technologia"
date:       2017-03-12 22:04:00 +0100
categories: [Get Noticed!]
tags:       [get noticed, daj się poznać, react]
---

Przyszedł czas na kolejny wpis z cyklu Daj Się Poznać. Na razie będę pisał po polsku, bo tak będzie szybciej. Może
kiedyś przetłumaczę teksty na język Szekspira.

## Cel projektu
Stworzenie internetowych formularzy konsumenckich - aplikacji internetowej działającej w przeglądarce.

## Założenia
Działanie całkowicie w przeglądarce (frontend). Brak backendu, wypełnione formularze nie będą nigdzie przechowywane.
Głównie ze względu na wymagania związane z przetwarzaniem danych osobowych. Nie chcę tracić czasu na pisanie regulaminu,
polityki prywatności, zgłaszanie zbioru danych do
<abbr title="Generalny Inspektor Ochrony Danych Osobowych">GIODO</abbr>, itp.

## Technologia
Zdecydowałem się na użycie biblioteki <abbr title="JavaScript">JS</abbr> [React][1], ponieważ chcę poćwiczyć Reacta. Ten
wybór nie był spowodowany żadną inną przyczyną. Dodatkowo planuję użyć [Redux][2], który pomoże mi w zarządzaniu stanem
aplikacji. Jeżeli cały proces wypełniania formularza ma się odbywać bez udziału backendu, to chciałbym, żeby biężący
stan aplikacji był łatwy do odtworzenia, na przykład po wczytaniu z [localStorage][3] lub z parametrów
[<abbr title="Uniform Resource Identifier">URI</abbr>][4].

## Tworzenie i uruchamianie projektu
Na razie piszę w PhpStormie. Wiem, że to zły wybór do JavaScriptu, ale nie chcę kupować WebStorma. Myślę o użyciu
[Atoma][5] ale nie miałem dostatecznie dużo czasu, żeby poeksperymentować. Ten blog również jest pisany w Stormie.

Projekt utworzyłem wykorzystując narzędzie [Create React App][6] od Facebooka. Taki projekt startowy jest dla mnie
wystarczający, ma wszystko czego potrzebuję, czyli Webpack, Babel, ESLint. Nie wymaga żadnej konfiguracji i, co
najważniejsze, działa. Jeżeli potrzebujesz bardziej zaawansowanego projektu startowego, np. z dołączonym "hot
reloading", routerem, czy innymi funkcjami, możesz użyć tej [wyszukiwarki projektów startowych React][7], żeby znaleźć
swój idealny starter.

Jeżeli chodzi o stylowanie, postawiłem na gotowe rozwiązanie [Material-UI][8]. Jest to zestaw komponentów do Reacta,
który implementuje założenia [Material Design według Google][9]. Formularze konsumenckie to aplikacja użytkowa, więc
tworzenie własnego wyszukanego projektu graficznego jest zbędne. Natomiast Material Design jest znany użytkownikom,
chociażby ze względu na [popularność Androida w Polsce][10], dlatego korzystanie z aplikacji powinno być dzięki temu
dosyć intuicyjne. Z resztą nie oszukujmy się, to nie jest jakiś bardzo skomplikowany projekt.

Tworzenie szkieletu aplikacji jest "stosunkowo proste". Według dokumentacji kreatora wystarczy:

{% highlight bash %}
npm install -g create-react-app

create-react-app my-app
cd my-app/
npm start
{% endhighlight %}

Aplikacja działa i jest dostępna pod adresem http://localhost:3000/. Można teraz zacząć pisać. Od początku jest live
reload, więc wszystkie zmiany są od razu widoczne w przeglądarce, nie trzeba nic konfigurować.

Na początku zainstalowałem [`react-router`][11] i wspomniany wcześniej [`material-ui`][12] (a wraz z nim
[`react-tap-event-plugin`][13]). Do pliku `index.html` dołączyłem kawałek kodu odpowiedzialny za ładowanie czcionki
[Roboto][14]:

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

## Struktura aplikacji i ruter
Poniżej prezentuję wstępną strukturę aplikacji, podział na podstrony.
- o co tu chodzi (strona startowa)
- formularze i wnioski
  - formularz 1
  - formularz 2
  - ...
  - formularz n
- pozwy, skargi i inne
  - formularz 1
  - formularz 2
  - ...
  - formularz n

Odwzorowanie takiej struktury za pomocą routera:
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

Link do repozytorium projektu [https://github.com/mkutyba/FormularzeKonsumenckie][15]

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