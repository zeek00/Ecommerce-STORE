
const PostsRoutes =  {
    home: {
        root:() => "",
        home:() => "/",
    },
    menu: () => "/menu",
    liked: () => "products/liked",
    signAction:{
        root: ()=> "/sign-action",
        signin: ()=> "/sign-action/signin",
        signup: ()=> "/sign-action/signup"
    },
    leftnav:{
        root: ()=>"/lnav",
        men: ()=> "/lnav/men",
        women: ()=> "/lnav/women",
        electronics: ()=> "/lnav/electronics"


    },
    products:{
        male: ()=>"products/men",
        female: ()=>"products/women",
        electronics: ()=>"products/electronics",
        likedItems: ()=>"products/likes",
    },
    coming: ()=>"coming-soon"
    
    
}
export default PostsRoutes