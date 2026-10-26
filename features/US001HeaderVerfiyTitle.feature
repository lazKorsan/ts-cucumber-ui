@US001HeaderVerfiyTitle

Feature: Bir kullanici olarak site ana sayfasina erisim saglayabilmek istiyorum.
  @US001HeaderVerfiyTitleTC01
  Scenario: URL girildiğinde ana sayfa erişilebilir olmalıdır.
    * Header kullanicisi anaSayfaya gider

  @US001HeaderVerfiyTitleTC02
  Scenario: Siteye girerken title'ın ' Home | InstuLearn ' olduğundan emin olunmalıdır.
    * Header kullanicisi anaSayfaya gider
    * Header kullanicisi title ın "Home | InstuLearn" oldugunu dogrular