$(() => {

    $('#data-user').hide();

    const showMessage = error => {
        $('#message').show()
        $('#initial').hide();
        $('#data-user').hide();
        $('#error').html(error)
        $('#error').show()
    }

    const showDataRepositories = repositories => {
        if ($('#repositories-container').children().length > 0) {
            $('#repositories-container').empty()
        }
        repositories.map((repositorie, i) => {
            $('<div>', {
                id: `repositorie-${i}`,
                class: 'repositorie',
            }).appendTo('#repositories-container');

            $('<h3>', {
                id: `title-repositorie-${i}`,
            }).appendTo(`#repositorie-${i}`);

            $('<a>', {
                id: `link-repositorie-${i}`,
                href: repositorie.html_url,
            }).appendTo(`#repositorie-${i}`);

            $('<span>', {
                id: `description-repositorie-${i}`,
            }).appendTo(`#repositorie-${i}`);

            $(`#title-repositorie-${i}`).html(repositorie.name)
            $(`#link-repositorie-${i}`).html(repositorie.html_url)
            $(`#description-repositorie-${i}`).html(repositorie.description)
        })
    }

    const searchRepositories = username => {
        $.ajax({
            url: `https://api.github.com/users/${username}/repos`,
            success: response => {
                showDataRepositories(response)
            }
        })
    }

    const showDataUser = (response, username = "") => {

        if (response) {
            searchRepositories(username);

            $('#data-user #title-user').html(response.name)
            $('#data-user #photo-user').attr('src', response.avatar_url)
            $('#data-user #link-user')
                .attr('href', response.html_url)
                .html(response.login)

            $('#data-user').show();
        } else {
            showMessage('Usuário não encontrado')
        }
        
    }

    const searchUser = username => {
        $('#error').hide();
        $('#initial').hide();
        
        $.ajax({
            url: `https://api.github.com/users/${username}`,

            beforeSend: () => {
                $('#loading').html('Carregando')
            },

            success: response => {
                $('#loading').html('')
                $('#message').hide()
                showDataUser(response, username)
            },

            error: () => {
                $('#loading').html('')
                showDataUser(false)
            }
        })

    }

    $('header nav form#form-search').submit((e) => {
        e.preventDefault();

        const username = $('header nav form#form-search input#username')[0].value;
        $('header nav form#form-search input#username')[0]
            .value = ""
        
        username ? 
        searchUser(username) :
        showMessage('Digite um valor');
    })
})