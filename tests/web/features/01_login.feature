@web @login-web @login @regression
Feature: Login page Gramedia.com on Desktop Website

  Background: [Desktop] user successfully redirect to login page
    Given [Desktop] user already access website gramedia.com
    And [Desktop] user already on gramedia.com homepage
    When [Desktop] user click button masuk at homepage
    Then [Desktop] shown login page gramedia.com

  @login-web1 @login-desktop-success
  Scenario: [Desktop] user success login with registered email and password
    When [Desktop] user input email "REGISTERED_EMAIL" in field email
    And [Desktop] user input password "REGISTERED_PASSWORD" in field password
    And [Desktop] user click button login
    Then [Desktop] user success to login and redirect to homepage

  @login-web2
  Scenario Outline: [Desktop] user failed login with <EMAIL> and <PASSWORD>
    When [Desktop] user input email "<EMAIL>" in field email
    And [Desktop] user input password "<PASSWORD>" in field password
    And [Desktop] user click button login
    Then [Desktop] user failed to login and shown validation "<VALIDATION_MESSAGE>" at login page

    Examples:
      | EMAIL                | PASSWORD            | VALIDATION_MESSAGE   |
      | UNREGISTERED_EMAIL   | REGISTERED_PASSWORD | INVALID_CREDENTIALS  |
      | REGISTERED_EMAIL     | PASSWORD_INVALID    | INVALID_CREDENTIALS  |
      | INVALID_FORMAT_EMAIL | REGISTERED_PASSWORD | INVALID_FORMAT_EMAIL |

  @login-web3 @login-success
  Scenario: [Desktop] user success to close snackbar success login by click CTA Oke
    When [Desktop] user input email "REGISTERED_EMAIL" in field email
    And [Desktop] user input password "REGISTERED_PASSWORD" in field password
    And [Desktop] user click button login
    And [Desktop] user click CTA Ok on snackbar success login
    Then [Desktop] user success to close snackbar success login

  @login-web4 @login-success
  Scenario: [Desktop] user success to close snackbar success login by waiting 3 seconds
    When [Desktop] user input email "REGISTERED_EMAIL" in field email
    And [Desktop] user input password "REGISTERED_PASSWORD" in field password
    And [Desktop] user click button login
    And [Desktop] user wait 3 seconds to close snackbar login
    Then [Desktop] user success to close snackbar success login

  @login-web5
  Scenario: [Desktop] user see password text showing at login page
    When [Desktop] user input email "REGISTERED_EMAIL" in field email
    And [Desktop] user input password "REGISTERED_PASSWORD" in field password
    And [Desktop] user click icon show password
    Then [Desktop] user see password text showing

  @login-web6
  Scenario: [Desktop] user see password text hidden at login page
    When [Desktop] user input email "REGISTERED_EMAIL" in field email
    And [Desktop] user input password "REGISTERED_PASSWORD" in field password
    And [Desktop] user click icon show password twice
    Then [Desktop] user see password text hidden

  @login-web7
  Scenario Outline: [Desktop] user success redirect to "<PAGES>" page
    When [Desktop] user click link "<PAGES>" at login page
    Then [Desktop] user redirect to "<PAGES>" page

    Examples:
      | PAGES           |
      | FORGOT_PASSWORD |
      | REGISTER        |

  @login-web8
  Scenario Outline: [Desktop] user success redirect to social media "<SOSMED>" from login page
    When [Desktop] user click icon "<SOSMED>" at login page
    Then [Desktop] user redirect to official page "<SOSMED>"

    Examples:
      | SOSMED    |
      | FACEBOOK  |
      | TWITTER   |
      | INSTAGRAM |

  @logout-web
  Scenario: [Desktop] User success to see CTA Keluar Akun at pop up My Account And User success to logout
    When [Desktop] user input email "REGISTERED_EMAIL" in field email
    And [Desktop] user input password "REGISTERED_PASSWORD" in field password
    And [Desktop] user click button login
    Then [Desktop] user success to login and redirect to homepage
    When [Desktop] user click section My Account on header at homepage
    Then [Desktop] user will see CTA Keluar Akun on pop up My Account
    And [Desktop] user click CTA Keluar Akun on pop up My Account
    Then [Desktop] user success to logout
    And [Desktop] user will be redirect to gramedia.com homepage with guest state
    And [Desktop] shown snackbar Sesi anda telah berakhir
