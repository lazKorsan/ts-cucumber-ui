@US002HeaderVerifyButton
Feature: Bir kullanici olarak site ici islemlerini kolaylikla yapabilmek icin ana sayfa ust barinda kolay linklerin bulunmasini istiyorum.

  @US002HeaderVerifyButtonTC01
  Scenario: Site ust barinda kolay linkler (Categories, Home, Courses, Instructors, Store,Blog) goruntulenmeli.
    * Header kullanicisi anaSayfaya gider
    * Header kullanicisi "Categories" butonun aktif oldugunu dogrular
    * Header kullanicisi "Home" butonun aktif oldugunu dogrular
    * Header kullanicisi "Courses" butonun aktif oldugunu dogrular
    * Header kullanicisi "Instructors" butonun aktif oldugunu dogrular
    * Header kullanicisi "Store" butonun aktif oldugunu dogrular
    * Header kullanicisi "Blog" butonun aktif oldugunu dogrular

  @US002HeaderVerifyButtonTC02
  Scenario: Kolay linkler  (Categories, Home, Courses, Instructors, Store,Blog)  ilgili sayfaya yonlendirme yapmali.
    * Header kullanicisi anaSayfaya gider
    * Header kullanicisi "Courses" butona tiklar
    * Header kullanicisi "newest" sayfasinda oldugunu dogrular