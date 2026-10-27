@US002MarsgetEnumList
Feature: sendKeyUtils projeye dahil etmekliklik

  @US002MarsgetEnumListTC01
  Scenario: Kullanici smartSendKey utils projeye dahil eder
    * Mars kullanicisi ana sayfaya gider
    * Mars kullanicisi "Register" butona tiklar
    * Mars kullanicisi "Register Mail" box kutusuna "ahmet.student.1117@InstuLearn.com" yazar
    * Mars kullanicisi "Register Name" box kutusuna "ahmet" yazar
    * Mars kullanicisi "Register Password" box kutusuna "Query.2026!" yazar
    * Mars kullanicisi "Register Confirm Password" box kutusuna "Query.2026!" yazar
    * Mars kullanicisi sozlesme sartlarini kabul eder
    * Mars kullanicisi "Register Submit" butona tiklar

  @US002MarsgetEnumListTC02
  Scenario: Mars kullanicisi enumList cekme islemlerine devam eder
    * Mars kullanicisi ana sayfaya gider
    * Mars kullanicisi "Register" butona tiklar
    * Mars kullanicisi "ahmet" ismi ve "Query.2026!" sifresi ile kayit olusturur

