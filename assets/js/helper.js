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
    if ($('#prefixo').val() === "") return
    console.log($('#id').val())
    $.ajax({
        method: "POST",
        url: "/api/guild/save",
        data: {
            id: $('#id').val(),
            prefixo: $('#prefixo').val()
        }
    }).fail(function () {
        $.notify({ icon: "tim-icons icon-bell-55", message: `Falha ao salvar as configurações do servidor!` }, { type: "danger" })
    }).done(function (req) {
        if (!req) return
        if (req === "Invalid") return redirect()
        if (req === "Done") return $.notify({ icon: "tim-icons icon-bell-55", message: `As configurações do servidor foram salvas com sucesso!` }, { type: "success" })
    })
})