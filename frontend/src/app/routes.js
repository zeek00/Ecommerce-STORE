
const PostsRoutes =  {

    coming: ()=>"coming-soon",
    home: {
        root:() => "",
        home:() => "/",
    },
    leftnav:{
        root: ()=>"/lnav",
        men: ()=> "/lnav/men",
        women: ()=> "/lnav/women",
        electronics: ()=> "/lnav/electronics"


    },
    menu: () => "/menu",
    products:{
        male: ()=>"products/men",
        female: ()=>"products/women",
        electronics: ()=>"products/electronics",
        likedItems: ()=>"products/likes",
        cart: ()=>"products/cart",
    },
    signAction:{
        root: ()=> "/sign-action",
        signin: ()=> "/sign-action/signin",
        signup: ()=> "/sign-action/signup"
    },
     
}
export default PostsRoutes