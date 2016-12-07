/* Dialogs for functions */

function message_dialog(clients2) {
  console.log(clients2.client_nickname + ' und ' + clients2.clid);
  angular.injector(['ng', 'base']).invoke(function(ModalFactory) {
    var modal = new ModalFactory({
      // Add CSS classes to the modal
      // Can be a single string or an array of classes
      class: 'collapse',
      // Set if the modal has a background overlay
      overlay: true,
      // Set if the modal can be closed by clicking on the overlay
      overlayClose: false,
      'destroyOnClose': true,
      // Define a template to use for the modal
      template: '<div class="grid-block vertical"><div class="grid-content padding" style="padding-top: 1rem;"><h4 id="message_recipant">Send Message to: ' + clients2.client_nickname + '</h4><form name="messageform"><input id="message_mode" type="text" placeholder="mode" style="display: none" /><input id="message_target" type="text" style="display: none" /><input id="message_content" name="message" type="text" placeholder="Your Message" /><a ba-close="" class="button" onclick="send_message(this.form, &apos;1&apos;,' + clients2.clid + ')">Send</a><a ba-close="" class="button">Cancel</a></form></div></div>',
      // Allows you to pass in properties to the scope of the modal
      'contentScope': {
        'close': function() {
          modal.deactivate()
          $timeout(function() {
            modal.destroy()
          }, 1000)
        }
      }
    })
    modal.activate()
  })
}

function poke_dialog (clients2) {
  console.log(clients2.client_nickname + ' und ' + clients2.clid)
  angular.injector(['ng', 'base']).invoke(function (ModalFactory) {
    var modal = new ModalFactory({
      // Add CSS classes to the modal
      // Can be a single string or an array of classes
      class: 'collapse',
      // Set if the modal has a background overlay
      overlay: true,
      // Set if the modal can be closed by clicking on the overlay
      overlayClose: false,
      'destroyOnClose': true,
      // Define a template to use for the modal
      template: '<div class="grid-block vertical"><div class="grid-content padding" style="padding-top: 1rem;"><h4 id="message_recipant">Poke: ' + clients2.client_nickname + '</h4><form name="messageform"><input id="message_mode" type="text" placeholder="mode" style="display: none" /><input id="message_target" type="text" style="display: none" /><input id="message_content" name="message" type="text" placeholder="Your Message" /><a ba-close="" class="button" onclick="send_poke(this.form,' + clients2.clid + ')">Send</a><a ba-close="" class="button">Cancel</a></form></div></div>',
      // Allows you to pass in properties to the scope of the modal
      'contentScope': {
        'close': function() {
          modal.deactivate()
          $timeout(function() {
            modal.destroy()
          }, 1000)
        }
      }
    })
    modal.activate()
  })
}

function server_group_dialog() {

}

function kick_dialog() {

}

function ban_dialog() {

}
