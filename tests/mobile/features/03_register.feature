@mobile @register @register-mobile @regression
Feature: Register page Gramedia.com on desktop

  Background: [Mobile] user successfully redirect to login page
    Given [Mobile] user already access website gramedia.com
    And [Mobile] user already on gramedia.com homepage
    When [Mobile] user click account on bottom navbar
    Then [Mobile] user already on login page gramedia
    And [Mobile] user click link "REGISTER" at login page
    Then [Mobile] user redirect to "REGISTER" page

  @register-mobile1
  Scenario: [Mobile] user success to input all field at register page
    And [Mobile] user input email "UNREGISTERED_EMAIL" in field email at register page
    And [Mobile] user input name "FULL_NAME" in field name at register page
    And [Mobile] user input password "PASSWORD" in field password at register page
    And [Mobile] user input confirmation password "PASSWORD" in field confirmation password at register page
    Then [Mobile] user validate all field was inputted at register page with detail:
      | ACCOUNT_INFO       |
      | UNREGISTERED_EMAIL |
      | FULL_NAME          |
      | PASSWORD           |

  @register-mobile2 @register-success
  Scenario: [Mobile] user successfully register account gramedia.com
    And [Mobile] user input email "UNREGISTERED_EMAIL" in field email at register page
    And [Mobile] user input name "FULL_NAME" in field name at register page
    And [Mobile] user input password "PASSWORD" in field password at register page
    And [Mobile] user input confirmation password "MATCH_PASSWORD" in field confirmation password at register page
    And [Mobile] user check terms and conditions at register page
    And [Mobile] user click button daftar at register page
    And [Mobile] user click Nanti Saja link on Personal Data page
    Then [Mobile] user success to register and redirect to gramedia.com homepage with login state
    And [Mobile] shown snackbar "Selamat datang, \"FIRST_NAME\"!"

  @register-mobile3 @register-unsuccess
  Scenario Outline: [Mobile] user see snackbar "<MESSAGE>" and register unsuccessfully
    And [Mobile] user input email "<EMAIL>" in field email at register page
    And [Mobile] user input name "FULL_NAME" in field name at register page
    And [Mobile] user input password "PASSWORD" in field password at register page
    And [Mobile] user input confirmation password "<PASSWORD_CONF>" in field confirmation password at register page
    And [Mobile] user check terms and conditions at register page
    And [Mobile] user click button daftar at register page
    Then [Mobile] user will see snackbar "<MESSAGE>" at register page

    Examples:
      | EMAIL                   | PASSWORD_CONF      | MESSAGE                  |
      | UNREGISTERED_EMAIL      | NOT_MATCH_PASSWORD | INVALID_CREDENTIALS      |
      | REGISTERED_EMAIL_MOBILE | MATCH_PASSWORD     | EMAIL_ALREADY_REGISTERED |
      | INVALID_FORMAT_EMAIL    | MATCH_PASSWORD     | INVALID_FORMAT_EMAIL     |

  @register-mobile4 @register-unsuccess
  Scenario Outline: [Mobile] user see validate password text with colour
    And [Mobile] user input email "REGISTERED_EMAIL_MOBILE" in field email at register page
    And [Mobile] user input name "FULL_NAME" in field name at register page
    And [Mobile] user input password "<PASSWORD>" in field password at register page
    Then [Mobile] user see text validate password with colour "<MINIMAL_CHAR>", "<CAPITAL_LETTER>", "<NUMBER_SYMBOL>"
    And [Mobile] user see button daftar disabled

    Examples:
      | PASSWORD    | MINIMAL_CHAR | VALID_LETTER | NUMBER_SYMBOL |
      |             | NEUTRAL      | NEUTRAL      | NEUTRAL       |
      | password    | GREEN        | RED          | RED           |
      | Password    | GREEN        | GREEN        | RED           |
      | password@   | GREEN        | RED          | RED           |
      | password1   | GREEN        | RED          | RED           |
      | password@1  | GREEN        | RED          | GREEN         |
      | Password@   | GREEN        | GREEN        | RED           |
      | Password1   | GREEN        | GREEN        | RED           |
      | PASSWORD1@  | GREEN        | RED          | GREEN         |
      | P1!         | RED          | RED          | GREEN         |
      | p1!         | RED          | RED          | GREEN         |
      | P1p!        | RED          | GREEN        | GREEN         |
      | p           | RED          | RED          | RED           |
      | P@sword 123 | GREEN        | GREEN        | GREEN         |
      | P@sword123  | GREEN        | GREEN        | GREEN         |
