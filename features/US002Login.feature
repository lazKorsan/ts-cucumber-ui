Feature: Kullanici dogrulanmis hesap ile siteye giris yapar

  @loginFeature
  Scenario: Student kullanicisi dogrulanmis hesap ile siteye giris yapar
    * Student kullanicisi anaSayfaya gider
    * Student kullanicisi "Login" buttona tiklar
    * Student kullanicisi "login" sayfasinda oldugunu dogrular
    * Student kullanicisi "EMail" kutusuna "STUDENT_EMAIL" yazar
    * Student kullanicisi "Password" kutusuna "STUDENT_PASSWORD" yazar
    * Student kullanicisi "Submit" buttona tiklar
    * Student kullanicisi "panel" sayfasinda oldugunu dogrular
