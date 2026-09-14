Feature: ClickUtils ve SendKeyUtils methodlarinin projeye dahil edilmesi
  @clickUtils
  Scenario: ClickUtils methodunun projeye dahil edilmesi
    * Student kullanicisi anaSayfaya gider
    * Student kullanicisi clickUtils methodu ile "Login" buttona tiklar
    * Student kullanicisi "login" sayfasinda oldugunu dogrular

    @sendKeyUtils
  Scenario: SendKeyUtils Methodunun projeye dahil edilmesi
    * Student kullanicisi anaSayfaya gider
    * Student kullanicisi "Login" buttona tiklar
    * Student kullanicisi sendKeys methodu ile "EMail" baox kutusuna "STUDENT_EMAIL" yazar
