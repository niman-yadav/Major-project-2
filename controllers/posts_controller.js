const Post = require('../models/Post');
const Comment = require('../models/comment');
module.exports.create = async function (req , res) {
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'Post Published!');
        if(req.xhr){
            post = await post.populate('user', 'name');
            return res.status('200').json({
                data:{
                    post:post
                },message:"Post created!"
            });

        }
        
        return res.redirect('back');
    }
    catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
    
    
};

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id );
    
        if(post.user == req.user.id)
        {
            post.remove();
            //console.log('Hii');
            await Comment.deleteMany({post: req.params.id});
           // console.log("check");
            if(req.xhr){
                
                return res.status('200').json({
                    data:{
                        post_id:req.params.id,
                    },message:"Post deleted!"
                });

            }
            req.flash('success', 'Post deleted!');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error in finding the post with id : ${req.params.id} , ${err}`);
        return;
    }
   
}
