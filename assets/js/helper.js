let redirect = () => window.location.href = 'false' == "false" ? `https://discordapp.com/api/oauth2/authorize?client_id=554402289259905037&redirect_uri=https://alicinha.glitch.me/api/login&response_type=code&scope=identify%20guilds` : "/api/logout"
$('#search').on('click', function () {
    document.getElementById('card').innerHTML = ""
    if ($('#name').val() === "") return
    $.ajax({
        method: "POST",
        url: '/api/find',
        data: {
            name: $('#name').val()
        }
    }).fail(function () {
        alert('Fail')
    }).done(function (req) {
        if (!req) return
        if (req === "Invalid") return redirect()
        req.forEach(async meb => document.getElementById('card').innerHTML += `
        <div class="col-lg-18 col-md-12">
                        <div class="card card-user">
                            <div class="card-body">
                                <p class="card-text">
                                    <div class="author">
                                       <div class="block block-one"></div>
                                        <div class="block block-two"></div>
                                        <div class="block block-three"></div>
                                        <div class="block block-four"></div>
                                        <a href="/user/${meb.id}">
                                            <img class="avatar" src="${meb.avatar}" alt="${meb.tag}">
                                            <h5 class="title">${meb.tag}</h5>
                                        </a>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
        `)
    })
})

$('#save').on('click', function () {
    var logs = false
    var logsChannel = null
    var welcome = false 
    var leave = false
    var level = false
    var count = false
    var levelSchema = null
    var welcomeSchema = null
    var leaveSchema = null
    var countSchema = null
    if ($('#prefixo').val() === "") return
    if ($('#welcome_channelId').val() != "" && $('#welcome_message').val() != "" && !isNaN($('#welcome_channelId').val())) {
        welcome = true
        welcomeSchema = {
          channel: $('#welcome_channelId').val(),
          message: $('#welcome_message').val()
        }
    } else if (isNaN($('#welcome_channelId').val()) || !$('#welcome_channelId').val() || !$('#welcome_message').val()) {
        welcome = false
        welcomeSchema = null
    }
    if ($('#leave_channelId').val() != "" && $('#leave_message').val() != "" && !isNaN($('#leave_channelId').val())) {
        leave = true
        leaveSchema = {
          channel: $('#leave_channelId').val(),
          message: $('#leave_message').val()
        }
    } else if (isNaN($('#leave_channelId').val()) || !$('#leave_channelId').val() || !$('#leave_message').val()) {
        leave = false
        leaveSchema = null
    }
    if ($('#level_channelId').val() != "" && $('#level_message').val() != "" && !isNaN($('#level_channelId').val())) {
        level= true
        levelSchema = {
          channel: $('#level_channelId').val(),
          message: $('#level_message').val()
        }
    } else if (isNaN($('#level_channelId').val()) || !$('#level_channelId').val() || !$('#level_message').val()) {
        level = false
        levelSchema = null
    }
    if ($('#logs').val() != "" && !isNaN($('#logs').val())) {
        logs = true
        logsChannel = $('#logs').val()
    } else if (isNaN($('#logs').val()) || !$('#logs').val()) {
        logs = false
        logsChannel = null
    }
    if ($('#count_channelId').val() != "" && $('#count_message').val() != "" && !isNaN($('#count_channelId').val())) {
        count = true
        countSchema = {
          channel: $('#count_channelId').val(),
          message: $('#count_message').val()
        }
    } else if (isNaN($('#count_channelId').val()) || !$('#count_channelId').val() || !$('#count_message').val()) {
        count = false
        countSchema = null
    }
    $.ajax({
        method: "POST",
        url: "/api/guild/save",
        data: {
            id: $('#id').val(),
            prefixo: $('#prefixo').val(),
            logs,
            logsChannel,
            welcomeOn: welcome,
            welcome: welcomeSchema,
            leaveOn: leave,
            leave: leaveSchema,
            levelOn: level,
            level: levelSchema,
            userId: $('#userid').val(),
            countOn: count,
            count: countSchema
        }
    }).fail(function () {
        $.notify({ icon: "tim-icons icon-bell-55", message: `Falha ao salvar as configurações do servidor!` }, { type: "danger", timer: 4000 })
    }).done(function (req) {
        if (!req) return
        if (req === "Invalid") return redirect()
        if (req === "Done") return $.notify({ icon: "tim-icons icon-bell-55", message: `As configurações do servidor foram salvas com sucesso!` }, { type: "success", timer: 4000 })
    })
})

$("#startsearch").on('click', function () {
    document.getElementById('searchresult').innerHTML = ``;
    if ($("#inlineFormInputGroup").val() === "") return
    $.ajax({
        method: 'POST',
        url: '/api/guild/find',
        data: {
            name: $("#inlineFormInputGroup").val()
        }
    }).fail(function () {

    }).done(function (req) {
        if (!req) return
        if (req === 'Invalid') return
        req.forEach(g => document.getElementById('searchresult').innerHTML = `
          <div class="font-icon-list col-lg-2 col-md-3 col-sm-4 col-xs-6 col-xs-6">
            <div class="font-icon-detail">
              <a href="/guilds/view/${g.name}">
                <img class="avatar" src="https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=1024" alt="${g.name}" style="height: 80px; width: 80px;" >
                  <p>${g.name.replace('<', '≺').replace('>', '≻')}</p>
              </a>
            </div>
          </div>
        `)
    })
})

$('#changeTheme').on('click', function() {
  let body = document.querySelector('#site_body')
  if (body.classList.contains('white-content')) {
    setTimeout(() => {$('body').removeClass('white-content')},300)
  } else {
    setTimeout(() => {$('body').addClass('white-content')},300)
  }
})

function showLogsForm() {
  let logsCheck = document.getElementById('logsCheck')
  let logsForm = document.getElementById('showLogs')
  
  if (logsCheck.checked) {
    logsForm.style.display = 'block'
  } else {
    logsForm.style.display = 'none'
  }
}

function showPrefixForm() {
  let prefixCheck = document.getElementById('prefixCheck')
  let prefixForm = document.getElementById('showPrefix')
  
  if (prefixCheck.checked) {
    prefixForm.style.display = 'block'
  } else {
    prefixForm.style.display = 'none'
  }
}

function showWelcomeForm() {
  let welcomeCheck = document.getElementById('welcomeCheck')
  let welcomeForm = document.getElementById('showWelcome')
  
  if (welcomeCheck.checked) {
    welcomeForm.style.display = 'block'
  } else {
    welcomeForm.style.display = 'none'
  }
}

function showLeaveForm() {
  let leaveCheck = document.getElementById('leaveCheck')
  let leaveForm = document.getElementById('showLeave')
  
  if (leaveCheck.checked) {
    leaveForm.style.display = 'block'
  } else {
    leaveForm.style.display = 'none'
  }
}

function showLevelForm() {
  let levelCheck = document.getElementById('levelCheck')
  let levelForm = document.getElementById('showLevel')
  
  if (levelCheck.checked) {
    levelForm.style.display = 'block'
  } else {
    levelForm.style.display = 'none'
  }
}

function showCountForm() {
  let countCheck = document.getElementById('countCheck')
  let countForm = document.getElementById('showCount')
  
  if (countCheck.checked) {
    countForm.style.display = 'block'
  } else {
    countForm.style.display = 'none'
  }
}