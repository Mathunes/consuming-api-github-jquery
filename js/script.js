$(() => {

    $('#data-user').hide();

    const showError = () => {
        $('#error').html('Digite um valor')
    }

    const showData = response => {
        console.log(response)
        if (response) {
            console.log(response.name)
            $('#data-user #title-user').html(response.name)
            $('#data-user #photo-user').attr('src', response.avatar_url)
            $('#data-user #link-user')
                .attr('href', response.html_url)
                .html(response.login)

            $('#data-user').show();
        } else {
            
        }
        
    }

    const searchUser = username => {
        $('#error').html('')
        const response = {};
        
        $.ajax({
            url: `https://api.github.com/users/${username}`,

            beforeSend: () => {
                $('#loading').html('Carregando')
            },

            success: response => {
                $('#loading').html('')
                showData(response)
            },

            error: () => {
                $('#loading').html('')
                showData(false)
            }
        })

    }

    $('header nav form#form-search').submit((e) => {
        e.preventDefault();

        const username = $('header nav form#form-search input#username')[0].value;
        let response;
        
        username ? 
        searchUser(username) :
        showError();
    })
})