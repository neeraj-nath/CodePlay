{let t=function(){let e=$("#new-post-form");e.submit(function(t){t.preventDefault(),$.ajax({url:"/posts/create",method:"POST",data:e.serialize(),success:function(t){var e=o(t.data.post);$("#post-list-container>ul").prepend(e),s($(" .delete-post-btn",e)),new NewPostComments(t.data.post_id),new ToggleLike($(" .like-toggle-btn",e)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})})},o=function(t){return $(`
            <li id="post-${t._id}">
                <p>
                    ${t.user.name} says :
                </p>
                <p>
                    ${t.content}
                    
                        <a class= "delete-post-btn" href="/posts/destroy/${t._id}">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    
                </p>
                <div>
                    <a class="like-toggle-btn" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post" >
                        <i class="fa-regular fa-heart"></i>
                        <span>0</span> 
                    </a>
                        
                </div>
                <div class="post-comments">
                    <form id="post-${t._id}-comment-form" action="/comments/create" method="POST">
                        <input type="text" name="content" placeholder="Comment Here..." required>
                        <input type="hidden" name="post" value="${t._id}">
                        <input type="submit" value="Add Comment">
                    </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${t._id}">

                        </ul>
                    </div>

                    

                </div>
                
            </li>`)},s=function(e){$(e).click(function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(t){$("#post-"+t.data.post_id).remove()},error:function(t){console.log(t.responseText)}})})},e=function(){$("#post-list-container>ul>li").each(function(){var t=$(this),e=$(" .delete-post-button",t),e=(s(e),t.prop("id").split("-")[1]);new NewPostComments(e)})};t(),e()}