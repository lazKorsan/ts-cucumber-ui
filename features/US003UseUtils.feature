Feature:
  @clickUtils
  Scenario:
    * Student kullanicisi anaSayfaya gider
    * Student kullanicisi clickUtils methodu ile "Login" buttona tiklar
    * Student kullanicisi "login" sayfasinda oldugunu dogrular

    @sendKeyUtils
  Scenario:
    * Student kullanicisi anaSayfaya gider
    * Student kullanicisi "Login" buttona tiklar
    * Student kullanicisi sendKeys methodu ile "EMail" baox kutusuna "STUDENT_EMAIL" yazar
