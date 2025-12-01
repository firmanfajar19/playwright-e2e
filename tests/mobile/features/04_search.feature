@mobile @search @regression @search-mobile
Feature: Search Gramedia.com on Mobile Web

  Background: [Mobile] user success access search field on desktop
    Given [Mobile] user already access website gramedia.com
    # And [Mobile] user successfully redirect to "homepage"
    When [Mobile] user click at search field
    Then [Mobile] user sees search panel card was opened

  @search-mobile1 @search-field
  Scenario: [Mobile] user view list top of 6 author at search panel card
    Then [Mobile] user see 6 default top author at search panel card

  @search-mobile2 @search-field
  Scenario: [Mobile] user success to input 1 character at search field
    When [Mobile] user input "a" on search field
    Then [Mobile] user success to see inputted keyword "a" on search field
    And [Mobile] user see 6 default top author at search panel card

  @search-mobile3 @search-field
  Scenario: [Mobile] user success to input 3 character and match with product names or author at search field
    When [Mobile] user input "Buk" on search field
    Then [Mobile] user success to see inputted keyword "Buk" on search field
    And [Mobile] user will see search suggestion with keyword "Buk" at search panel card

  @search-mobile4 @search-field
  Scenario: [Mobile] user success to input 50 character at search field
    When [Mobile] user input "Lorem ipsum dolor sit amet, consectetuer adipiscin" on search field
    Then [Mobile] user success to see inputted keyword "Lorem ipsum dolor sit amet, consectetuer adipiscin" on search field

  @search-mobile5 @search-field
  Scenario: [Mobile] user failed to input more than 50 character at search field
    When [Mobile] user input "Lorem ipsum dolor sit amet, consectetuer adipiscing 50 Char" on search field
    Then [Mobile] user failed to see inputted keyword "Lorem ipsum dolor sit amet, consectetuer adipiscing 50 char" on search field

  @search-mobile6 @search-field
  Scenario: [Mobile] user failed to see search suggestion after input minimal 3 character and not match with product names or author
    When [Mobile] user input "notextnotext" on search field
    Then [Mobile] user will see wording "Tekan enter untuk mencari \"notextnotext\"" at search panel card

  @search-mobile7 @search-field
  Scenario: [Mobile] user can clear keyword typed on search field by click button x
    When [Mobile] user input "abc" on search field
    And [Mobile] user click button x on search field
    Then [Mobile] success to clear keyword "abc" on search field

  @search-mobile8 @search-field
  Scenario: [Mobile] user can see search history
    When [Mobile] user search keyword "Buku" on search field
    Then [Mobile] user will be redirect to search result page of keyword "Buku"
    When [Mobile] user back to homepage by click back browser
    And [Mobile] user click at search field panel card
    Then [Mobile] user see keyword "Buku" in section history Search at search panel card

  @search-mobile9 @search-field
  Scenario: [Mobile] user can see clear search history by click button x on keyword
    When [Mobile] user search keyword "Buku" on search field
    Then [Mobile] user will be redirect to search result page of keyword "Buku"
    When [Mobile] user back to homepage by click back browser
    And [Mobile] user click at search field panel card
    And [Mobile] user click button x on search history "Buku" at search panel card
    Then [Mobile] user success to clear search history "Buku" at search panel card

  @search-mobile10 @search-field
  Scenario: [Mobile] user can see clear search history by click button hapus semua
    When [Mobile] user search keyword "Buku" on search field
    Then [Mobile] user will be redirect to search result page of keyword "Buku"
    When [Mobile] user back to homepage by click back browser
    And [Mobile] user click at search field panel card
    And [Mobile] user click button hapus semua at search panel card
    Then [Mobile] user success to clear search history "Buku" at search panel card

  @search-mobile11 @search-field @search-result
  Scenario: [Mobile] user can see empty state search at search result page
    When [Mobile] user search keyword "xxxxx" on search field
    Then [Mobile] user will see empty state with title "Hasil Pencarian \"xxxxx\" Tidak Ditemukan" at search result page and description "Coba kata kunci lain atau lihat rekomendasi yang mirip dengan pencarian kamu di bawah ini." at search result page
    And [Mobile] user will see button Ubah Pencarian at search result page
    And [Mobile] user will see section product recommendations at search result page

  @search-mobile12 @search-field @search-result
  Scenario: [Mobile] user can click button Ubah Pencarian at search result page
    When [Mobile] user search keyword "xxxxx" on search field
    And [Mobile] user click button Ubah Pencarian at search result page
    Then [Mobile] user sees search panel card was opened
    And [Mobile] user see keyword "xxxxx" on search field was deleted
    And [Mobile] user see keyword "xxxxx" in section history Search at search panel card

  @search-mobile13 @search-result
  Scenario: [Mobile] user can see search result page with product name as a keyword
    When [Mobile] user search keyword "Buku" on search field
    Then [Mobile] user will be redirect to search result page of keyword "Buku"
    And [Mobile] user see tab product and author at search result page
    And [Mobile] user see filter at search result page
    And [Mobile] user see all card product contains product keyword "Buku" at search result page

  @search-mobile14 @search-result
  Scenario: [Mobile] user can see search result page with author name as a keyword
    When [Mobile] user search keyword "jubilee enterprise" on search field
    Then [Mobile] user will be redirect to search result page of keyword "jubilee enterprise"
    And [Mobile] user see tab product and author at search result page
    And [Mobile] user see filter at search result page
    And [Mobile] user see all card product contains author keyword "jubilee enterprise" at search result page

  @search-mobile15 @search-result
  Scenario: [Mobile] user success access search result page with keyword match with one author
    When [Mobile] user search keyword "Gramedia" on search field
    Then [Mobile] user will be redirect to search result page of keyword "Gramedia"
    And [Mobile] user click on tab "Author" at search result page
    And [Mobile] user see tab author shows the number equal to count tab at search result page

  @search-mobile16 @search-result
  Scenario: [Mobile] user success access search result page with keyword match with more than one author
    When [Mobile] user search keyword "Buku" on search field
    Then [Mobile] user will be redirect to search result page of keyword "Buku"
    And [Mobile] user click on tab "Author" at search result page
    And [Mobile] user see tab author shows the number not equal 1 at search result page

  @search-mobile17 @search-result
  Scenario: [Mobile] user success to open modal filter at search result page
    When [Mobile] user search keyword "majalah gramedia" on search field
    And [Mobile] user will be redirect to search result page of keyword "majalah gramedia"
    And [Mobile] user click button Filter at search result page
    Then [Mobile] user succcess to open modal filter at search result page
    And [Mobile] user see section filter at modal filter search result page:
      | filter   |
      | Urutkan  |
      | Kategori |
      | Harga    |
      | Stok     |
    And [Mobile] user see button Terapkan at modal filter search result page

  @search-mobile18 @search-result
  Scenario: [Mobile] user success to open modal filter all category at search result page
    When [Mobile] user search keyword "majalah gramedia" on search field
    And [Mobile] user will be redirect to search result page of keyword "majalah gramedia"
    And [Mobile] user click button Filter at search result page
  #   And [Mobile] user click lihat semua on section category filter at drawer
  #   Then [Mobile] user see button back on modal filter all category at drawer
  #   And [Mobile] user see category list on modal filter all category at drawer
  #   And [Mobile] user see button simpan on modal filter all category at drawer

  # @search-mobile19 @search-result
  # Scenario: [Mobile] user can filter by parent category at search result page
  #   When [Mobile] user search keyword "Buku" on search field
  #   And [Mobile] user will be redirect to search result page of keyword "Buku"
  #   And [Mobile] user click button Filter at search result page
  #   And [Mobile] user click lihat semua on section category filter at drawer
  #   And [Mobile] user expand filter "Buku" at drawer
  #   And [Mobile] user select "Semua Buku" at drawer
  #   And [Mobile] user save selected category at drawer
  #   Then [Mobile] user see bubble filter "parent category" "Buku" applied at drawer
  #   When [Mobile] user apply filter at drawer
  #   And [Mobile] user see bubble filter category "Buku" applied

  # @search-mobile20 @search-result
  # Scenario: [Mobile] user can filter by child category at search result page
  #   When [Mobile] user search keyword "Buku" on search field
  #   And [Mobile] user will be redirect to search result page of keyword "Buku"
  #   And [Mobile] user click button Filter at search result page
  #   And [Mobile] user click lihat semua on section category filter at drawer
  #   And [Mobile] user expand filter "Buku" at drawer
  #   And [Mobile] user select filter category "Fiksi" at drawer
  #   And [Mobile] user select "Semua Fiksi" at drawer
  #   And [Mobile] user save selected category at drawer
  #   Then [Mobile] user see bubble filter "child category" "Fiksi" applied at drawer
  #   When [Mobile] user apply filter at drawer
  #   And [Mobile] user see bubble filter category "Fiksi" applied

  # @search-mobile21 @search-result
  # Scenario Outline: [Mobile] user can filter by <FILTER> price at search result page
  #   When [Mobile] user search keyword "Buku" on search field
  #   And [Mobile] user will be redirect to search result page of keyword "Buku"
  #   And [Mobile] user click button Filter at search result page
  #   And [Mobile] user input "<FILTER>" price Rp "<PRICE>" at drawer
  #   And [Mobile] user apply filter at drawer
  #   Then [Mobile] user success applied "<FILTER>" price filter Rp "<PRICE>" at search result page
  #   And [Mobile] user see bubble filter applied "<FILTER>" price Rp "<PRICE>" at search result page

  #   Examples:
  #     | FILTER  | PRICE  |
  #     | minimum |  1.000 |
  #     | maximum | 50.000 |

  # @search-mobile22 @search-result
  # Scenario: [Mobile] user can filter by minimum price and maximum price at search result page
  #   When [Mobile] user search keyword "Buku" on search field
  #   And [Mobile] user will be redirect to search result page of keyword "Buku"
  #   And [Mobile] user click button Filter at search result page
  #   And [Mobile] user input "minimum" price Rp "1.000" at drawer
  #   And [Mobile] user input "maximum" price Rp "50.000" at drawer
  #   And [Mobile] user apply filter at drawer
  #   Then [Mobile] user success applied miminum price filter Rp "1.000" and maximum price filter Rp "50.000" at search result page
  #   And [Mobile] user see bubble filter applied minimum price Rp "1.000" and maximum price filter Rp "50.000" at search result page

  # @search-mobile23 @search-result
  # Scenario: [Mobile] user filter minimum price bigger than maximum price
  #   When [Mobile] user search keyword "Buku" on search field
  #   And [Mobile] user will be redirect to search result page of keyword "Buku"
  #   And [Mobile] user click button Filter at search result page
  #   And [Mobile] user input "minimum" price Rp "100.000" at drawer
  #   And [Mobile] user input "maximum" price Rp "50.000" at drawer
  #   And [Mobile] user apply filter at drawer
  #   Then [Mobile] user see empty state filter at search result page
  #   And [Mobile] user see error message title "Produk Tidak Tersedia" and description "Pilih kategori lain atau hapus filter." at search result page
  #   And [Mobile] user see button Hapus Filter at search result page

  # @search-mobile24 @search-result
  # Scenario: [Mobile] user can filter by stok unavailable at search result page
  #   When [Mobile] user search keyword "Buku" on search field
  #   And [Mobile] user will be redirect to search result page of keyword "Buku"
  #   And [Mobile] user click button Filter at search result page
  #   And [Mobile] user click toggle only available stock at drawer
  #   And [Mobile] user apply filter at drawer
  #   Then [Mobile] user success to unapplied filter by stock available at search result page

  # @search-mobile25 @search-result
  # Scenario Outline: [Mobile] user can sort product list by <SORT> at search result page
  #   When [Mobile] user search keyword "Buku" on search field
  #   And [Mobile] user will be redirect to search result page of keyword "Buku"
  #   And [Mobile] user click button Filter at search result page
  #   And [Mobile] user select sort by "<SORT>" at drawer
  #   And [Mobile] user apply filter at drawer
  #   Then [Mobile] user success sort product list at search result page by "<SORT>"

  #   Examples:
  #     | SORT            |
  #     | Terbaru         |
  #     | Terpopuler      |
  #     | Harga Terendah  |
  #     | Harga Tertinggi |

  # @search-mobile26 @search-result
  # Scenario: [Mobile] user success reset filter by click button Hapus Filter at search result page
  #   When [Mobile] user search keyword "Buku" on search field
  #   And [Mobile] user will be redirect to search result page of keyword "Buku"
  #   And [Mobile] user click button Filter at search result page
  #   And [Mobile] user input "maximum" price Rp "100" at drawer
  #   And [Mobile] user apply filter at drawer
  #   And [Mobile] user click button Hapus Filter at search result page
  #   Then [Mobile] user success to reset filter at search result page

  # @search-mobile27 @search-result
  # Scenario: [Mobile] user success reset filter by click bubble filter at search result page
  #   When [Mobile] user search keyword "Buku" on search field
  #   And [Mobile] user will be redirect to search result page of keyword "Buku"
  #   And [Mobile] user click button Filter at search result page
  #   And [Mobile] user input "maximum" price Rp "1.000" at drawer
  #   And [Mobile] user apply filter at drawer
  #   And [Mobile] user click bubble filter at search result page
  #   Then [Mobile] user success to reset filter at search result page

  # @search-mobile28 @search-result
  # Scenario: [Mobile] user success reset filter before apply filter at search result page
  #   When [Mobile] user search keyword "Buku" on search field
  #   And [Mobile] user will be redirect to search result page of keyword "Buku"
  #   And [Mobile] user click button Filter at search result page
  #   And [Mobile] user select sort by "Terpopuler" at drawer
  #   And [Mobile] user input "maximum" price Rp "1.000" at drawer
  #   And [Mobile] user click toggle only available stock at drawer
  #   And [Mobile] user click button reset filter at drawer
  #   Then [Mobile] user success reset filter before applied it at drawer

  # @search-mobile29 @search-result
  Scenario: [Mobile] user can see search result page tab author
    When [Mobile] user search keyword "Will" on search field
    And [Mobile] user will be redirect to search result page of keyword "Will"
    And [Mobile] user click on tab "Author" at search result page
    Then [Mobile] user see author card contains keyword "Will" at search result page
    And [Mobile] user see author image on author card at search result page

  @search-mobile30 @search-result
  Scenario: [Mobile] user can see maximum 3 books owned by the authors at search result page
    When [Mobile] user search keyword "Disney" on search field
    And [Mobile] user will be redirect to search result page of keyword "Disney"
    And [Mobile] user click on tab "Author" at search result page
    Then [Mobile] user see search result page tab author of keyword "Disney" at search result page
    And [Mobile] user see maximum 3 books owned by the author at search result page

  @search-mobile31 @search-result
  Scenario: [Mobile][Mobile] user can see button filter was hide on search result page tab author
    When [Mobile] user search keyword "Disney" on search field
    And [Mobile] user will be redirect to search result page of keyword "Disney"
    And [Mobile] user click on tab "Author" at search result page
    Then [Mobile] user see search result page tab author of keyword "Disney" at search result page
    And [Mobile] user see button filter was hide on tab author at search result page

  @search-mobile32 @search-result
  Scenario: [Mobile] user can click arrow icon to access author detail page at search result page
    When [Mobile] user search keyword "Disney" on search field
    And [Mobile] user will be redirect to search result page of keyword "Disney"
    And [Mobile] user click on tab "Author" at search result page
    And [Mobile] user click author "Disney" at search result page
    Then [Mobile] user redirected to author detail page of author "Disney"

  @search-mobile33 @search-result
  Scenario Outline: [Mobile] user can open PDP from search result <TAB> page
    When [Mobile] user search keyword "Disney" on search field
    And [Mobile] user will be redirect to search result page of keyword "Disney"
    And [Mobile] user click on tab "<TAB>" at search result page
    And [Mobile] user click PDP on tab "<TAB>" at search result page
    Then [Mobile] user redirected to PDP page from search result "<TAB>"

    Examples:
      | TAB     |
      | Author  |
      | Product |
