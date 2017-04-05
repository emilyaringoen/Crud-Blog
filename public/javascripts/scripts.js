$(document).ready(() => {
    $('.modal').modal();

    $('#delete').on('click', () => {
      console.log('delete clicked');
      $.ajax({
        method: 'DELETE',
        url: '',
        data: { id: $('#delete').attr('data-id') },
        success: (data) => {
          if(data){
            location.reload();
          }
        },
        error: () => {

        }
      })
    })

    $('#update').on('click', () => {
      let id = $(event.target).attr('data-id')
      $.ajax({
        method: 'PUT',
        url: '',
        data: { id: id, title: $(`#title${id}`).val(), content: $(`#content${id}`).val() },
        success: (data) => {
          if(data){
            location.reload();
          }
        },
        error: () => {

        }
      })
    })
})
