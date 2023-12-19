
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


    }
    
    
}
export default PostsRoutes