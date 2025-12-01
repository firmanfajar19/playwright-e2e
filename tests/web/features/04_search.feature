@web @search-web @search @regression
Feature: Search Gramedia.com on Desktop Website

  Background: [Desktop] user success access search field on desktop
    Given [Desktop] user already access website gramedia.com
    And [Desktop] user already on gramedia.com homepage
    When [Desktop] user click at search field
    Then [Desktop] user sees search panel card was opened

  @search-web1 @search-field
  Scenario: [Desktop] user view list top of 6 author at search panel card
    Then [Desktop] user see 6 default top author at search panel card

  @search-web2 @search-field
  Scenario: [Desktop] user success to input 1 character at search field
    When [Desktop] user input "a" on search field
    Then [Desktop] user success to see inputted keyword "a" on search field
    And [Desktop] user see 6 default top author at search panel card

  @search-web3 @search-field
  Scenario: [Desktop] user success to input 3 character and match with product names or author at search field
    When [Desktop] user input "buk" on search field
    Then [Desktop] user success to see inputted keyword "buk" on search field
    And [Desktop] user will see search suggestion with keyword "buk" at search panel card

  @search-web4 @search-field
  Scenario: [Desktop] user success to input 50 character at search field
    When [Desktop] user input "Lorem ipsum dolor sit amet, consectetuer adipiscin" on search field
    Then [Desktop] user success to see inputted keyword "Lorem ipsum dolor sit amet, consectetuer adipiscin" on search field

  @search-web5 @search-field
  Scenario: [Desktop] user failed to input more than 50 character at search field
    When [Desktop] user input "Lorem ipsum dolor sit amet, consectetuer adipiscing 50 Char" on search field
    Then [Desktop] user failed to see inputted keyword "Lorem ipsum dolor sit amet, consectetuer adipiscing 50 char" on search field

  @search-web6 @search-field
  Scenario: [Desktop] user failed to see search suggestion after input minimal 3 character and not match with product names or author
    When [Desktop] user input "notextnotext" on search field
    Then [Desktop] user will see wording "Tekan enter untuk mencari \"notextnotext\"" at search panel card

  @search-web7 @search-field
  Scenario: [Desktop] user can clear keyword typed on search field by click button x
    When [Desktop] user input "abc" on search field
    And [Desktop] user click button x on search field
    Then [Desktop] success to clear keyword "abc" on search field

  @search-web8 @search-field
  Scenario: [Desktop] user can see search history
    When [Desktop] user search keyword "Buku" on search field
    Then [Desktop] user will be redirect to search result page of keyword "Buku"
    When [Desktop] user back to homepage by click back browser
    And [Desktop] user click at search field
    Then [Desktop] user see keyword "Buku" in section history Search at search panel card

  @search-web9 @search-field
  Scenario: [Desktop] user can see clear search history by click button x on keyword
    When [Desktop] user search keyword "Buku" on search field
    Then [Desktop] user will be redirect to search result page of keyword "Buku"
    When [Desktop] user back to homepage by click back browser
    And [Desktop] user click at search field
    And [Desktop] user click button x on search history "Buku" at search panel card
    Then [Desktop] user success to clear search history "Buku" at search panel card

  @search-web10 @search-field
  Scenario: [Desktop] user can see clear search history by click button hapus semua
    When [Desktop] user search keyword "Buku" on search field
    Then [Desktop] user will be redirect to search result page of keyword "Buku"
    When [Desktop] user back to homepage by click back browser
    And [Desktop] user click at search field
    And [Desktop] user click button hapus semua at search panel card
    Then [Desktop] user success to clear search history "Buku" at search panel card

  @search-web11 @search-field @search-result
  Scenario: [Desktop] user can see empty state search at search result page
    When [Desktop] user search keyword "xxxxx" on search field
    Then [Desktop] user will see empty state with title "Hasil Pencarian \"xxxxx\" Tidak Ditemukan" at search result page and description "Coba kata kunci lain atau lihat rekomendasi yang mirip dengan pencarian kamu di bawah ini." at search result page
    And [Desktop] user will see button Ubah Pencarian at search result page
    And [Desktop] user will see section product recommendations at search result page

  @search-web12 @search-field @search-result
  Scenario: [Desktop] user can click button Ubah Pencarian at search result page
    When [Desktop] user search keyword "xxxxx" on search field
    And [Desktop] user click button Ubah Pencarian at search result page
    Then [Desktop] user sees search panel card was opened
    And [Desktop] user see keyword "xxxxx" on search field was deleted
    And [Desktop] user see keyword "xxxxx" in section history Search at search panel card

  @search-web13 @search-result
  Scenario: [Desktop] user success access search result page
    When [Desktop] user search keyword "Buku" on search field
    Then [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user see tab product and author at search result page
    And [Desktop] user see section summary of keyword "Buku" at search result page
    And [Desktop] user see section filter at search result page:
      | filter   |
      | Kategori |
      | Harga    |
      | Stok     |
    And [Desktop] user see all card product contains keyword "Buku" at search result page
    And [Desktop] user see product list sort at search result page

  @search-web14 @search-result
  Scenario: [Desktop] user able to click muat lebih banyak on bottom page search result page tab product
    When [Desktop] user search keyword "Buku" on search field
    Then [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user see 20 product card contains keyword "Buku" at search result page
    When [Desktop] user click button "Muat Lebih Banyak" at search result page
    Then [Desktop] user see 40 product card contains keyword "Buku" at search result page

  @search-web15 @search-result
  Scenario: [Desktop] user can filter by parent category at search result page
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user select filter category "Buku" at search result page
    Then [Desktop] user success to applied filter category "Buku" at search result page
    And [Desktop] user see bubble filter applied category "Buku" at search result page

  @search-web16 @search-result
  Scenario: [Desktop] user can filter by child category at search result page
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user expand filter category "Buku" at search result page
    And [Desktop] user select filter category "Fiksi" at search result page
    Then [Desktop] user success to applied filter category "Fiksi" at search result page
    And [Desktop] user see bubble filter applied category "Fiksi" at search result page

  @search-web17 @search-result
  Scenario: [Desktop] user can filter by minimum price at search result page
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user input minimum price Rp "1.000" at search result page
    Then [Desktop] user success applied miminum price filter Rp "1.000" at search result page
    And [Desktop] user see bubble filter applied minimum price Rp "1.000" at search result page

  @search-web18 @search-result
  Scenario: [Desktop] user can filter by maximum price at search result page
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user input maximum price Rp "50.000" at search result page
    Then [Desktop] user success applied maximum price filter Rp "50.000" at search result page
    And [Desktop] user see bubble filter applied maximum price Rp "50.000" at search result page

  @search-web19 @search-result
  Scenario: [Desktop] user can filter by minimum price and maximum price at search result page
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user input minimum price Rp "1.000" at search result page
    And [Desktop] user input maximum price Rp "50.000" at search result page
    Then [Desktop] user success applied miminum price filter Rp "1.000" and maximum price filter Rp "50.000" at search result page
    And [Desktop] user see bubble filter applied minimum price Rp "1.000" and maximum price filter Rp "50.000" at search result page

  @search-web20 @search-result
  Scenario: [Desktop] user filter minimum price bigger than maximum price
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user input minimum price Rp "100.000" at search result page
    And [Desktop] user input maximum price Rp "50.000" at search result page
    Then [Desktop] user see empty state filter at search result page
    And [Desktop] user see error message title "Produk Tidak Tersedia" and description "Pilih kategori lain atau hapus filter." at search result page
    And [Desktop] user see button Hapus Filter at search result page

  @search-web21 @search-result
  Scenario: [Desktop] user can filter by stok unavailable at search result page
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user click toggle only available stock at search result page
    Then [Desktop] user success to unapplied filter by stock available at search result page

  @search-web22 @search-result
  Scenario Outline: [Desktop] user can sort product list at search result page
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user click button product list sort at search result page
    And [Desktop] user select sort by "<sort>" at search result page
    Then [Desktop] user success sort product list at search result page by "<sort>"

    Examples:
      | sort            |
      | Terbaru         |
      | Terpopuler      |
      | Harga Terendah  |
      | Harga Tertinggi |

  @search-web23 @search-result
  Scenario: [Desktop] user success reset filter by click button Hapus Filter at search result page
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user input maximum price Rp "100" at search result page
    And [Desktop] user click button Hapus Filter at search result page
    Then [Desktop] user success to reset filter at search result page

  @search-web24 @search-result
  Scenario: [Desktop] user success reset filter by click icon x in bubble filter at search result page
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user input maximum price Rp "1.000" at search result page
    And [Desktop] user click bubble filter at search result page
    Then [Desktop] user success to reset filter at search result page

  @search-web25 @search-result
  Scenario: [Desktop] user can see search result page tab author
    When [Desktop] user search keyword "Will" on search field
    And [Desktop] user will be redirect to search result page of keyword "Will"
    And [Desktop] user click on tab "Author" at search result page
    Then [Desktop] user see search result page tab author of keyword "Will" at search result page
    And [Desktop] user see section summary of keyword "Will" at search result page
    And [Desktop] user see author card contains keyword "Will" at search result page
    And [Desktop] user see author image on author card at search result page
    And [Desktop] user see button Load More at search result page

  @search-web26 @search-result
  Scenario: [Desktop] user can see filter and sort was hide on search result page tab author
    When [Desktop] user search keyword "Will" on search field
    And [Desktop] user will be redirect to search result page of keyword "Will"
    And [Desktop] user click on tab "Author" at search result page
    Then [Desktop] user see search result page tab author of keyword "Will" at search result page
    And [Desktop] user see filter and sort was hide on tab author at search result page

  @search-web27 @search-result
  Scenario: [Desktop] user can see maximum 6 books owned by the authors at search result page
    When [Desktop] user search keyword "Disney" on search field
    And [Desktop] user will be redirect to search result page of keyword "Disney"
    And [Desktop] user click on tab "Author" at search result page
    Then [Desktop] user see search result page tab author of keyword "Disney" at search result page
    And [Desktop] user see maximum 6 books owned by the author at search result page

  @search-web28 @search-result
  Scenario: [Desktop] user can click arrow icon to access author detail page at search result page
    When [Desktop] user search keyword "Disney" on search field
    And [Desktop] user will be redirect to search result page of keyword "Disney"
    And [Desktop] user click on tab "Author" at search result page
    And [Desktop] user click author "Disney" at search result page
    Then [Desktop] user redirected to author detail page of author "Disney"

  @search-web29 @search-result
  Scenario: [Desktop] user able to click muat lebih banyak on bottom page search result page tab author
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user click on tab "Author" at search result page
    Then [Desktop] user see 5 author card contains keyword "Buku" at search result page
    When [Desktop] user click button "Muat Lebih Banyak" at search result page
    Then [Desktop] user see 10 author card contains keyword "Buku" at search result page

  @search-web30 @search-result
  Scenario Outline: [Desktop] user sees <TAB> count in summary result text on the search results page
    When [Desktop] user search keyword "Buku" on search field
    And [Desktop] user will be redirect to search result page of keyword "Buku"
    And [Desktop] user click on tab "<TAB>" at search result page
    Then [Desktop] user see "<TAB>" count in summary result text at search result page

    Examples:
      | TAB     |
      | Product |
      | Author  |

  @search-web31 @search-result
  Scenario Outline: [Desktop] user can open PDP from search result <TAB> page
    When [Desktop] user search keyword "Disney" on search field
    And [Desktop] user will be redirect to search result page of keyword "Disney"
    And [Desktop] user click on tab "<TAB>" at search result page
    And [Desktop] user click PDP on tab "<TAB>" at search result page
    Then [Desktop] user redirected to PDP page from search result "<TAB>"

    Examples:
      | TAB     |
      | Product |
      | Author  |
