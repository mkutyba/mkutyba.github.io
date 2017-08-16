---
layout:        post
title:         "Paczka w RUCHu - moduł do Magento 1.9"
date:          2017-08-16 13:34:00 +0100
categories:    [eCommerce]
tags:          [ecommerce, magento, plugins, php]
image:         /assets/images/magento-paczka-w-ruchu.png
image_caption: Metoda wysyłki Paczka w RUCHu w Magento 1.9
excerpt:       Paczka w RUCHu jest usługą doręczenia przesyłek, polegającą na dostarczeniu paczki do jednego z kiosków RUCHu. W chwili pisania tego tekstu w Polsce jest ponad 3000 Kiosków i punktów Partnerskich RUCH. Większość kiosków pracuje w godzinach 6:00-20:00.
lang_code:     pl
lang:          pl_PL
---

Link do pobrania: [https://github.com/mkutyba/magento-paczka-w-ruchu][1]

[Paczka w RUCHu][2] jest usługą doręczenia przesyłek, polegającą na dostarczeniu paczki do jednego z kiosków RUCHu. W
chwili pisania tego tekstu w Polsce jest ponad 3000 Kiosków i punktów Partnerskich RUCH [[1]][3]. Większość kiosków
pracuje w godzinach 6:00-20:00. Na czym polega usługa według RUCHu:

>W ciągu dwóch dni roboczych przesyłka zostanie dostarczona do wybranego kiosku lub saloniku RUCH,
o czym niezwłocznie poinformujemy Cię, wysyłając SMS na podany przy składaniu zamówienia numer telefonu komórkowego.
Kod odbioru przesyłki jest zawsze przy Tobie!

Moduł dodaje nową metodę wysyłki w dwóch wariantach: płatność z góry oraz płatność przy odbiorze.

![Wybór metody wysyłki w Magento Onepage Checkout](https://raw.githubusercontent.com/mkutyba/magento-paczka-w-ruchu/master/docs/osc.png)

Po wybraniu metody kolejnym krokiem jest wybranie punktu odbioru.

![Wybór punktu odbioru Paczka w RUCHu](https://raw.githubusercontent.com/mkutyba/magento-paczka-w-ruchu/master/docs/osc-popup.png)

Moduł współpracuje z:
- Magento Onepage Checkout
- IWD One Page Checkout v4
- IWD Checkout Suite v5
- IWD Checkout Suite v6

W planach jest dodanie wsparcia dla:
- Magento Multishipping
- Magento Admin Checkout (tworzenie nowego zamówienia w panelu administratora)

Link do pobrania: [https://github.com/mkutyba/magento-paczka-w-ruchu][1]

[1]: https://github.com/mkutyba/magento-paczka-w-ruchu
[2]: https://www.paczkawruchu.pl/
[3]: https://www.paczkawruchu.pl/odbierz-paczke/
