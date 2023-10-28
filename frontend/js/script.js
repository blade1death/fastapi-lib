$(".main__input").on("focus", function(){
    $('.select').addClass("select_active");
})


var field = $('#list').find('.option');
// собственно поиск
$('.main__input').bind('keyup', function() {
    var q = new RegExp($(this).val(), 'ig');
 
    for (var i = 0, l = field.length; i < l; i += 1) {
        var option = $(field[i]),
            parent = option.parent();

        if ($(field[i]).text().match(q)) {
            if (parent.is('span')) {
                option.show();
                parent.replaceWith(option);
            }
        } else {
            if (option.is('.option') && (!parent.is('span'))) {
                option.wrap('<span>').hide();
            }
        }
    } 
});


$('.option').on('click', function(){
    $('.main__input').val($(this).text());
    $('input').focus();
});




const box = document.querySelector(".main__input");
const select = document.querySelector(".select");
document.addEventListener('click', (e) => {
    const click1 = e.composedPath().includes(box);
    const click2 = e.composedPath().includes(select);
    if(!click1 && !click2)
        $('.select').removeClass("select_active");

})



const el = document.getElementById('btn');

el.addEventListener('click', async function(){
 
    const info = document.getElementById("prompt").value;

    const response = await fetch("/get_books", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ 
                info: info
            })
        });
    if (response.data) {
        window.sessionStorage.setItem('data', JSON.stringify(response.data));
    }
    else {
        console.log(response);
    }
    window.location.href = '/books';
});