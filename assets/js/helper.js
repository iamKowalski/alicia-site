let redirect = () => window.location.href = 'false' == "false" ? `https://discordapp.com/api/oauth2/authorize?client_id=554402289259905037&redirect_uri=https://alicinha.herokuapp.com/api/login&response_type=code&scope=identify` : "/api/logout"
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