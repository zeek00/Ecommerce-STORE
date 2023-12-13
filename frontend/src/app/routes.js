
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
    }
    
    
}
export default PostsRoutes