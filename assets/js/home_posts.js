// to capture DOM element and put the post in the home ejs:
 


// to mnake a post using AJAX and not the traditional way:
let createPost = function(){
   let newPostForm = $('#new-post-form');
   newPostForm.submit(function(event){
    event.preventDefault();

    $.ajax({
        url:'/posts/create',
        method: "POST",
        data: newPostForm.serialize(),
        success:function(data){
            
            let newPostAdd = newPostDom(data.data.post);
            $('#post-list-container>ul').prepend(newPostAdd);
            // to populate the delete post button for every newPost:
            deletePost($(' .delete-post-btn', newPostAdd)); // the error that hpn was occured here 
            //because in newPostDom i didnt add class -> .delete-post-btn.
            //I was adding the class in the post.ejs so the errors
        },
        error:function(error){
            console.log(error.responseText);
        }
    })
   })

}

let newPostDom = function(post){
    return $(`
        <li id="post-${post._id}">
            <p>
                ${post.user.name} says :
            </p>
            <p>
                ${post.content }
                
                    <a class= "delete-post-btn" href="/posts/destroy/${post._id}">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                
            </p>
            
        </li>`)
}

let deletePost = function(deleteLink){
    
    $(deleteLink).click(function(event){
        event.preventDefault();
        $.ajax({
            type:"get",
            url:$(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
            },
            error:function(error){
                console.log(error.responseText)
            }
        })
    })
    
}


createPost();