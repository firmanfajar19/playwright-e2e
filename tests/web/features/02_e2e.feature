@desktop @e2e @desktop
Feature: Create order gramedia.com on desktop

  Background: [Desktop] user success login with registered email and password
    Given [Desktop] user already access website gramedia.com
    And [Desktop] user already on gramedia.com homepage
    And [Desktop] user click button masuk at homepage
    When [Desktop] user input email "REGISTERED_EMAIL" in field email
    And [Desktop] user input password "REGISTERED_PASSWORD" in field password
    And [Desktop] user click button login
    And [Desktop] user success to login and redirect to homepage
    And [Desktop] user validate product item on cart
    Then [Desktop] user user see no item on cart

  @pay-web2 @non-voucher-code @single-checkout
  Scenario Outline: [Desktop] user success create order product "<format_type>" with payment "<payment_method>"
    Given [Desktop] user already on PDP with "<product_type>"
    And [Desktop] user select product type "<format_type>" at product detail page
    And [Desktop] user click button add to cart at product detail page
    And [Desktop] user click snackbar Cek Keranjang at product detail page
    When [Desktop] user click button checkout at cart page
    And [Desktop] user select "<shipping_method>" and "<courier_service>" as shipping method at checkout page
    And [Desktop] user click button lanjut pembayaran at checkout page
    And [Desktop] user select "<payment_method>" as payment method at payment page
    And [Desktop] user see grand total at payment page
    And [Desktop] user click button bayar with "<payment_method>" at payment page
    Then [Desktop] user success to checkout and redirect to thank you page with payment method "<payment_method>"

    Examples:
      | product_type | format_type | shipping_method | courier_service           | payment_method          |
      | BOOK         | SOFT COVER  | Ambil di Toko   | Gramedia Jakarta Matraman | BCA Virtual Account     |
      | BOOK         | HARD COVER  | JNE             | JTR                       | BNI Virtual Account     |
      | BOOK         | SOFT COVER  | JNE             | YES                       | BRI Virtual Account     |
      | NON BOOK     | VARIANT 1   | JNE             | Regular                   | Mandiri Virtual Account |
      | NON BOOK     | VARIANT 1   | Ambil di Toko   | Gramedia Jakarta Matraman | QRIS                    |
    #   | NON BOOK     | VARIANT 2   | Ambil di Toko   | Gramedia Jakarta Matraman | Credit Card             |
