// const { toggleLike } = require("../../controllers/likes_controller");

class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            console.log('entered into toggle likes');
            e.preventDefault();
            let self = this;

            $.ajax({
                type:'post',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                $(self).html(`<i class="fa-regular fa-heart"></i> ${likesCount}`)
                
                

            })
            .fail(function(error) {
                console.log('error in completing the request-->',error.responseText);
            });

        })

    }
}