(function () {
  window.rtbAPI = {
    createTeam: function(name, companySize, phone) {
      return new Promise(function(resolve) {
        setTimeout(resolve, 500)
      })
    },

    inviteUsersToTeam: function(users, inviteToFirstBoard) {
      return new Promise(function(resolve) {
        setTimeout(resolve, 500)
      })
    }
  }
})()