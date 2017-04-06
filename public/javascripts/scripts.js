$(document).ready(() => {
  $('.modal').modal();

  $('.delete').on('click', () => {
    $.ajax({
      method: 'DELETE',
      url: '',
      data: {
        id: $(event.target).attr('data-id'),
        del: 'post'
      },
      success: (data) => {
        if (data) {
          location.reload();
        }
      },
      error: () => {}
    })
  })

  $('.update').on('click', () => {
    let id = $(event.target).attr('data-id')
    $.ajax({
      method: 'PUT',
      url: '',
      data: {
        id: id,
        title: $(`#title${id}`).val(),
        content: $(`#content${id}`).val()
      },
      success: (data) => {
        if (data) {
          location.reload();
        }
      },
      error: () => {

      }
    })
  })

  $('.delete_comment').on('click', () => {
    let id = $(event.target).attr('data-id')
    $.ajax({
      method: 'DELETE',
      url: '',
      data: {
        id: id,
        del: 'comment'
      },
      success: (data) => {
        if (data) {
          location.reload();
        }
      },
      error: () => {}
    })
  })

})
