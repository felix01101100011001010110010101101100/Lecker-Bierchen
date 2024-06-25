function eventDabei(){
    $.ajax({
        url:"/event/dabei",
        type:"POST",
        beforeSend: setAuthentification,
        data: {personid:personid},
        success:function(){
            console.log("funktioniert");
        }

    })
}