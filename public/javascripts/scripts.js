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

    $('#edit').on('click', () => {
      $.ajax({
        method: 'UPDATE',
        url: '',
        data: { id: $('#edit').attr('data-id')}
      })
    })
})
