
const PostsRoutes =  {
    home: {
        root:() => "",
        home:() => "/home",
        featured: ()=> "/featured",
    },
    menu: () => "/menu",
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
        male: ()=>"products/male",
        female: ()=>"products/female",
        electronics: ()=>"products/electronics",
        likedItems: ()=>"products/likes",
    }
    
    
}
export default PostsRoutes