$(function() {
    var $h1 = $('h1')
    var $zip = $("input[name='zip']")

    $('form').on('submit', function(event) {
        event.preventDefault()
        var zipCode = $.trim($zip.val())
        $h1.text('Loading...')

        var request = $.ajax({
            url: '/' + zipCode,
            dataType: 'json',
        })
        request.done(function(data) {
            var temperature = data.temperature
            $h1.text('It is ' + temperature + 'º in ' + zipCode + '.')
        })
        request.fail(function() {
            $h1.text('Error!')
        })
    })
})

// $(function() {
//     const $h1 = $('h1')
//     const $zip = $('input[name="zip"]')
//
//     $('form').on('submit', event => {
//         /** @desc Prevents the form from submitting normally/blank */
//         event.preventDefault()
//
//         const zipCode = $.trim($zip.val())
//         $h1.text('Loading...')
//
//         /** @desc Sends an AJAX request */
//         const request = $.ajax({
//             url: '/' + zipCode,
//             dataType: 'json',
//         })
//
//         /** @desc
//          * When the request succeeds, update the header
//          * with the current Temp */
//         request.done(data => {
//             const temperature = data.temperature
//             $h1.html('It is ' + temperature + '&#176; in' + zipCode + '.')
//         })
//         // if there is an error, make sure that it is shown
//         request.fail(() => $h1.text('Error!!'))
//     })
// })
