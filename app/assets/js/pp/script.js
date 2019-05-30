module.exports = {
  init: function(view) {
    this.view = view;
    this.openSelector();
    this.flipPhone();
    this.openModal();
    this.closeModal();
    this.openDetails();
  },
  openSelector: function() {
    $('.selection').click(function(event) {
      if($( window ).width() < 768) {
        $('.filter').toggleClass("open");
        $(this).toggleClass("open");
      }
    });
  },
  flipPhone: function() {
    $('.phone-button').click(function(event) {
      $(this).addClass("show-phone");
    });
  },
  openModal: function() {
    $('.ras-review').click(function(event) {
      $('.modal').addClass("show");
    });
  },
  closeModal: function() {
    $('.icon-cancel, .button-cancel').click(function(event) {
      $('.modal').removeClass("show");
    });
  },
  openDetails: function() {
    $('.collapse-trigger').click(function(event) {
      $(this).toggleClass("active");
    });
  }
}
