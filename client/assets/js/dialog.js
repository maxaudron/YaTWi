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

function server_group_dialog (clients2) {
}

function kick_dialog (clients2) {
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
      template: '<div class="grid-block vertical"><div class="grid-content padding" style="padding-top: 1rem;"><h4 id="message_recipant">Kick: ' + clients2.client_nickname + '</h4><form name="kickform"><label>Kick from:</label><input type="radio" name="kick_mode" value="server" id="pokemonRed"><label for="pokemonRed">Server</label><input type="radio" name="kick_mode" value="channel" id="pokemonBlue"><label for="pokemonBlue">Channel</label></br></br><input id="kick_reason" name="kick_reason" type="text" placeholder="Kick reason" /><a ba-close="" class="button" onclick="client_kick(this.form, ' + clients2.clid + ')">Kick</a><a ba-close="" class="button">Cancel</a></form></div></div>',
      // Allows you to pass in properties to the scope of the modal
      'contentScope': {
        'close': function () {
          modal.deactivate()
          $timeout(function () {
            modal.destroy()
          }, 1000)
        }
      }
    })
    modal.activate()
  })
}

function ban_dialog(clients2) {
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
      template: '<div class="grid-block vertical"><div class="grid-content padding" style="padding-top: 1rem;"><h4 id="message_recipant">Ban: ' + clients2.client_nickname + '</h4><form name="banform"><input name="ban_ip" style="display: none" value="' + clients2.connection_client_ip + '"></input><label>Ban by:</label><input type="radio" name="ban_mode" value="ip" id="ip"><label for="ip">IP</label><input type="radio" name="ban_mode" value="id" id="id"><label for="id">ID</label><input type="radio" name="ban_mode" value="all" id="all"><label for="all">All</label></br></br><input name="ban_time" type="number" placeholder="Time the client gets banned in seconds. 0 = Unlimited" required></input></br><input id="ban_reason" name="kick_reason" type="text" placeholder="Ban reason" /><a ba-close="" class="button" onclick="client_ban(this.form, \'' + clients2.client_unique_identifier + '\')">Ban</a><a ba-close="" class="button">Cancel</a></form></div></div>',
      // Allows you to pass in properties to the scope of the modal
      'contentScope': {
        'close': function () {
          modal.deactivate()
          $timeout(function () {
            modal.destroy()
          }, 1000)
        }
      }
    })
    modal.activate()
  })
}
