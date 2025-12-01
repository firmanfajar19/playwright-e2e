@mobile @login-mobile @login @regression
Feature: Login page Gramedia.com on Mobile Website

  Background: [Mobile] user successfully redirect to login page
    Given [Mobile] user already access website gramedia.com
    And [Mobile] user already on gramedia.com homepage
    When [Mobile] user click account on bottom navbar
    Then [Mobile] user already on login page gramedia

  @login-mobile1 @login-success
  Scenario: [Mobile] user success login with registered email and password
    When [Mobile] user input email "REGISTERED_EMAIL_MOBILE" in field email
    And [Mobile] user input password "REGISTERED_PASSWORD" in field password
    And [Mobile] user click button login
    Then [Mobile] user success to login and redirect to homepage

  @login-mobile2 @login-failed
  Scenario Outline: [Mobile] user failed login with "<EMAIL>" and "<PASSWORD>"
    When [Mobile] user input email "<EMAIL>" in field email
    And [Mobile] user input password "<PASSWORD>" in field password
    And [Mobile] user click button login
    Then [Mobile] user failed to login and shown validation "<VALIDATION_MESSAGE>" at login page

    Examples:
      | EMAIL                   | PASSWORD            | VALIDATION_MESSAGE   |
      | UNREGISTERED_EMAIL      | REGISTERED_PASSWORD | INVALID_CREDENTIALS  |
      | REGISTERED_EMAIL_MOBILE | PASSWORD_INVALID    | INVALID_CREDENTIALS  |
      | INVALID_FORMAT_EMAIL    | REGISTERED_PASSWORD | INVALID_FORMAT_EMAIL |

  @login-mobile3 @login-success
  Scenario: [Mobile] user success to close snackbar success login by click CTA Oke
    When [Mobile] user input email "REGISTERED_EMAIL_MOBILE" in field email
    And [Mobile] user input password "REGISTERED_PASSWORD" in field password
    And [Mobile] user click button login
    And [Mobile] user click CTA Ok on snackbar success login
    Then [Mobile] user success to close snackbar success login

  @login-mobile4 @login-success
  Scenario: [Mobile] user success to close snackbar success login by waiting 3 seconds
    When [Mobile] user input email "REGISTERED_EMAIL_MOBILE" in field email
    And [Mobile] user input password "REGISTERED_PASSWORD" in field password
    And [Mobile] user click button login
    And [Mobile] user wait 3 seconds to close snackbar login
    Then [Mobile] user success to close snackbar success login

  @login-mobile5
  Scenario: [Mobile] user see password text showing at login page
    When [Mobile] user input email "REGISTERED_EMAIL_MOBILE" in field email
    And [Mobile] user input password "REGISTERED_PASSWORD" in field password
    And [Mobile] user click icon show password
    Then [Mobile] user see password text showing

  @login-mobile6
  Scenario: [Mobile] user see password text hidden at login page
    When [Mobile] user input email "REGISTERED_EMAIL_MOBILE" in field email
    And [Mobile] user input password "REGISTERED_PASSWORD" in field password
    And [Mobile] user click icon show password twice
    Then [Mobile] user see password text hidden

  @login-mobile7
  Scenario Outline: [Mobile] user success redirect to "<PAGES>" page
    When [Mobile] user click link "<PAGES>" at login page
    Then [Mobile] user redirect to "<PAGES>" page

    Examples:
      | PAGES           |
      | FORGOT_PASSWORD |
      | REGISTER        |

  # @logout-mobile
  # Scenario: [Desktop] User success to see CTA Keluar Akun at pop up My Account And User success to logout
  #   When [Mobile] user input email "REGISTERED_EMAIL_MOBILE" in field email
  #   And [Mobile] user input password "REGISTERED_PASSWORD" in field password
  #   And [Mobile] user click button login
  #   Then [Mobile] user success to login and redirect to homepage
  #   When [Mobile] user click account on bottom navbar
  #   And [Mobile] user click logout on My account page
  #   Then [Mobile] user success to logout and shown snackbar "Sesi Anda telah berakhir"
