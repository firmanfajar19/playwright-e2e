@e2e @mobile @mobile-e2e
Feature: Create order gramedia.com on mobile web

  Background: [Mobile] user success login with registered email and password
    Given [Mobile] user already access website gramedia.com
    And [Mobile] user already on gramedia.com homepage
    When [Mobile] user click account on bottom navbar
    Then [Mobile] user already on login page gramedia
    When [Mobile] user input email "REGISTERED_EMAIL_MOBILE" in field email
    And [Mobile] user input password "REGISTERED_PASSWORD" in field password
    And [Mobile] user click button login
    Then [Mobile] user success to login and redirect to homepage
    And [Mobile] user validate product item on cart
    Then [Mobile] user user see no item on cart

  @pay-mobile1 @non-voucher-code @single-checkout
  Scenario Outline: [Mobile] user success create order product "<format_type>" with payment "<payment_method>"
    Given [Mobile] user already on PDP with "<product_type>"
    And [Mobile] user select product type "<format_type>" at product detail page
    And [Mobile] user click button add to cart at drawer product detail page
    And [Mobile] user click snackbar Cek Keranjang at product detail page
    When [Mobile] user click button checkout at cart page
    And [Mobile] user select "<shipping_method>" and "<courier_service>" as shipping method at checkout page
    And [Mobile] user click button lanjut pembayaran at checkout page
    And [Mobile] user select "<payment_method>" as payment method at payment page
    And [Mobile] user see grand total at payment page
    And [Mobile] user click button bayar with "<payment_method>" at payment page
    Then [Mobile] user success to checkout and redirect to thank you page with payment method "<payment_method>"

    Examples:
      | product_type | format_type | shipping_method | courier_service           | payment_method          |
      | BOOK         | SOFT COVER  | Ambil di Toko   | Gramedia Jakarta Matraman | BCA Virtual Account     |
      | BOOK         | HARD COVER  | JNE             | JTR                       | BNI Virtual Account     |
      | BOOK         | SOFT COVER  | JNE             | YES                       | BRI Virtual Account     |
      | NON BOOK     | VARIANT 1   | JNE             | Regular                   | Mandiri Virtual Account |
      | NON BOOK     | VARIANT 1   | Ambil di Toko   | Gramedia Jakarta Matraman | QRIS                    |

  # @pay-mobile3 @voucher-code @single-checkout
  # Scenario Outline: [Mobile] user success create order product "<format_type>" with shipping "<shipping_method>", voucher code "<voucher_code>" and payment "<payment_method>"
  #   Given [Mobile] user already on PDP with "<product_type>"
  #   And [Mobile] user select product type "<format_type>" at product detail page
  #   And [Mobile] user click button add to cart at drawer product detail page
  #   And [Mobile] user click snackbar Cek Keranjang at product detail page
  #   When [Mobile] user click button checkout at cart page
  #   And [Mobile] user select "<shipping_method>" and "<courier_service>" as shipping method at checkout page
  #   And [Mobile] user click button lanjut pembayaran at checkout page
  #   And [Mobile] user select "<payment_method>" as payment method at payment page
  #   And [Mobile] user input voucher code "<voucher_code>"
  #   And [Mobile] user apply voucher
  #   And [Mobile] user see grand total at payment page
  #   And [Mobile] user click button bayar with "<payment_method>" at payment page
  #   Then [Mobile] user success to checkout and redirect to thank you page with payment method "<payment_method>"

  #   Examples:
  #     | product_type | format_type | shipping_method | courier_service     | payment_method          | voucher_code         |
  #     | NON BOOK     | VARIANT 1   | Ambil di Toko   | Gramedia Matraman   | BCA Virtual Account     | Cart Percentage      |
  #     | NON BOOK     | VARIANT 2   | JNE             | JTR                 | Credit Card             | Cart Flat Amount     |
  #     | BOOK         | SOFT COVER  | Sicepat         | Besok Sampai Tujuan | QRIS                    | Cart Final Price     |
  #     | BOOK         | HARD COVER  | Ninja Xpress    | Next Day            | Mandiri Virtual Account | Shipping Percentage  |
  #     | BOOK         | SOFT COVER  | Ninja Xpress    | Same Day            | BCA Virtual Account     | Shipping Flat Amount |
  #     | BOOK         | POD         | KGX             | REG                 | Permata Virtual Account | Shipping Final Price |
