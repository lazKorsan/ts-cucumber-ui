Feature: Bir kullanici olarak site ana sayfasina erisim saglayabilmek istiyorum.
  @smoke
  Scenario: Siteye girerken title'ın ' Home | InstuLearn ' olduğundan emin olunmalıdır.
    * Student kullanicisi anaSayfaya gider
    * Student kullanicisi url dogrular
    * Student kullanicisi title ın "Home | InstuLearn" oldugunu dogrular

    @LoginButton
  Scenario: enum list kullanimi
    * Student kullanicisi anaSayfaya gider
    * Student kullanicisi "Login" buttona tiklar

@RegisterButton
  Scenario: enum list kullanimi
    * Student kullanicisi anaSayfaya gider
    * Student kullanicisi "Register" buttona tiklar
