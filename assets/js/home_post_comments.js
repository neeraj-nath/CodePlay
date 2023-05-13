class NewPostComments{
    constructor(postId){
        this.postId= postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comment-form`);

        this.createComment(postId);
        let self = this;
        // call for all the existing comments
        $(' .delete-comment-btn', this.postContainer).each(function(){
            self.deleteComments($(this));
        });
    }
    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type:'post',
                url : "/comments/create",
                data : $(self).serialize(),
                success : function(data){
                    
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    // console.log("______________________________________________________");
                    // console.log("the newly added comment is:",newComment);
                    // console.log("______________________________________________________");
                    pSelf.deleteComments($(' .delete-comment-btn', newComment));
                    new ToggleLike($(' .like-toggle-btn', newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500   
                    }).show();
                },
                error: function(error){
                    console.log(`Error while trying to delete create comment in home-post-comments.js: ${error}`)
                }

            })
        })

    }
    newCommentDom(comment){
        console.log('the comment is thissssssss--->',comment);
        return $(`<li id="comment-${comment._id}">
                    <p>
                        ${comment.user.name} commented:
                    </p>
                    <p>
                        ${comment.content}
                
                        <a class="delete-comment-btn" href="/comments/destroy/${comment._id}">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    </p>
                    <small>
                        <a class="like-toggle-btn" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                            <i class="fa-regular fa-heart"></i>
                            <span id="likes-count">0</span> 
                        </a>
                    </small>
                </li>`)
    }

    deleteComments(deleteLink){
        $(deleteLink).click(function(event){
            event.preventDefault();

            $.ajax({
                type:"get",
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                },
                error:function(error){
                    console.log(`Error faced trying deleting the comment in home-post-comments.js file : ${error}`);
                }
            })
        })
    }

}
