// to capture DOM element and put the post in the home ejs:
 


// to msake a post using AJAX and not the traditional way:
{
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
                    /********************/
                    new NewPostComments(data.data.post_id);
                    new ToggleLike($(' .like-toggle-btn', newPostAdd));
                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500   
                    }).show();  
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
                <div>
                    <a class="like-toggle-btn" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post" >
                        <i class="fa-regular fa-heart"></i>
                        <span>0</span> 
                    </a>
                        
                </div>
                <div class="post-comments">
                    <form id="post-${post._id}-comment-form" action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Comment Here..." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">

                        </ul>
                    </div>

                    

                </div>
                
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
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new NewPostComments(postId);
        });
    }


    createPost();
    convertPostsToAjax();
}