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
    var welcome = false
    var leave = false
    var level = false
    if ($('#prefixo').val() === "") return
    if ($('#welcome_channelId').val() != "" && $('#welcome_message').val() != "" && !isNaN($('#welcome_channelId').val())) {
        welcome = true
    } else return
    if ($('#leave_channelId').val() != "" && $('#leave_message').val() != "" && !isNaN($('#leave_channelId').val())) {
        leave = true
    } else return
    if ($('#level_channelId').val() != "" && $('#level_message').val() != "" && !isNaN($('#level_channelId').val())) {
        leave = true
    } else return
    if ($('#logs').val() != "" && !isNaN($('#logs').val())) {
        logs = true
    } else return
    $.ajax({
        method: "POST",
        url: "/api/guild/save",
        data: {
            id: $('#id').val(),
            prefixo: $('#prefixo').val(),
            logs: logs,
            logsChannel: $('#logs').val(),
            welcomeOn: welcome,
            welcome: {
                channel: $('#welcome_channelId').val(),
                message: $('#welcome_message').val()
            },
            leaveOn: leave,
            leave: {
                channel: $('#leave_channelId').val(),
                message: $('#level_message').val()
            },
            levelOn: level,
            level: {
                channel: $('#level_channelId').val(),
                message: $('#level_message').val()
            },
            userId: $('#userid').val()
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