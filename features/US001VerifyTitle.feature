Feature: Bir kullanici olarak site ana sayfasina erisim saglayabilmek istiyorum.
  @smoke
  Scenario: Siteye girerken title'ın ' Home | InstuLearn ' olduğundan emin olunmalıdır.
    * Student kullanicisi anaSayfaya gider
    * Student kullanicisi url dogrular
    * Student kullanicisi title ın "Home | InstuLearn" oldugunu dogrular