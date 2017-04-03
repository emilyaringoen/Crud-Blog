$(document).ready(() => {
    $('#delete').on('click', () => {
      $.ajax({
        method: 'DELETE',
        url: '',
        data: { id: $('#delete').attr('data-id') },
        success: (data) => {
          location.reload();
        },
        error: () => {

        }
      })
    })
})
