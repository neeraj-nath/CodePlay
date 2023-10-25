class NewPostComments{constructor(e){this.postId=e,this.postContainer=$("#post-"+e),this.newCommentForm=$(`#post-${e}-comment-form`),this.createComment(e);let t=this;$(" .delete-comment-btn",this.postContainer).each(function(){t.deleteComments($(this))})}createComment(t){let o=this;this.newCommentForm.submit(function(e){e.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(e){e=o.newCommentDom(e.data.comment);$("#post-comments-"+t).prepend(e),o.deleteComments($(" .delete-comment-btn",e)),new ToggleLike($(" .like-toggle-btn",e)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log("Error while trying to delete create comment in home-post-comments.js: "+e)}})})}newCommentDom(e){return console.log("the comment is thissssssss---\x3e",e),$(`<li id="comment-${e._id}">
                    <p>
                        ${e.user.name} commented:
                    </p>
                    <p>
                        ${e.content}
                
                        <a class="delete-comment-btn" href="/comments/destroy/${e._id}">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    </p>
                    <small>
                        <a class="like-toggle-btn" data-likes="0" href="/likes/toggle/?id=${e._id}&type=Comment">
                            <i class="fa-regular fa-heart"></i>
                            <span id="likes-count">0</span> 
                        </a>
                    </small>
                </li>`)}deleteComments(t){$(t).click(function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(e){$("#comment-"+e.data.comment_id).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log("Error faced trying deleting the comment in home-post-comments.js file : "+e)}})})}}