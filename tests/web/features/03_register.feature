@web @register-web @register @regression
Feature: Register page Gramedia.com on Desktop Website

  Background: [Desktop] user successfully redirect to login page
    Given [Desktop] user already access website gramedia.com
    And [Desktop] user already on gramedia.com homepage
    When [Desktop] user click button daftar at homepage
    Then [Desktop] user already on register page

  @register-web1
  Scenario: [Desktop] user success to input all field at register page
    And [Desktop] user input email "UNREGISTERED_EMAIL" in field email at register page
    And [Desktop] user input name "FULL_NAME" in field name at register page
    And [Desktop] user input password "PASSWORD" in field password at register page
    And [Desktop] user input confirmation password "PASSWORD" in field confirmation password at register page
    Then [Desktop] user validate all field was inputted at register page with detail:
      | account_info       |
      | UNREGISTERED_EMAIL |
      | FULL_NAME          |
      | PASSWORD           |

  @register-web2 @register-success
  Scenario: [Desktop] user successfully register account gramedia.com
    And [Desktop] user input email "UNREGISTERED_EMAIL" in field email at register page
    And [Desktop] user input name "FULL_NAME" in field name at register page
    And [Desktop] user input password "PASSWORD" in field password at register page
    And [Desktop] user input confirmation password "MATCH_PASSWORD" in field confirmation password at register page
    And [Desktop] user check terms and conditions at register page
    And [Desktop] user click button daftar at register page
    And [Desktop] user click Nanti Saja link on Personal Data page
    Then [Desktop] user success to register and redirect to gramedia.com homepage with login state
    And [Desktop] shown snackbar "Selamat datang, \"FIRST_NAME\"!"

  @register-web3 @register-unsuccess
  Scenario Outline: [Desktop] user see snackbar "<MESSAGE>" and register unsuccessfully
    And [Desktop] user input email "<EMAIL>" in field email at register page
    And [Desktop] user input name "FULL_NAME" in field name at register page
    And [Desktop] user input password "PASSWORD" in field password at register page
    And [Desktop] user input confirmation password "<PASSWORD_CONF>" in field confirmation password at register page
    And [Desktop] user check terms and conditions at register page
    And [Desktop] user click button daftar at register page
    Then [Desktop] user will see snackbar "<MESSAGE>" at register page

    Examples:
      | EMAIL                | PASSWORD_CONF      | MESSAGE                  |
      | UNREGISTERED_EMAIL   | NOT_MATCH_PASSWORD | INVALID_CREDENTIALS      |
      | REGISTERED_EMAIL     | MATCH_PASSWORD     | EMAIL_ALREADY_REGISTERED |
      | INVALID_FORMAT_EMAIL | MATCH_PASSWORD     | INVALID_FORMAT_EMAIL     |

  @register-web4 @register-unsuccess
  Scenario Outline: [Desktop] user see validate password text with colour
    And [Desktop] user input email "REGISTERED_EMAIL" in field email at register page
    And [Desktop] user input name "FULL_NAME" in field name at register page
    And [Desktop] user input password "<PASSWORD>" in field password at register page
    Then [Desktop] user see text validate password with colour "<MINIMAL_CHAR>", "<VALID_LETTER>", "<NUMBER_SYMBOL>"
    And [Desktop] user see button daftar disabled

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
