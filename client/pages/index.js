import buildClient from "../api/build-client"
const Landing = ({currentUser}) => {
   return (currentUser)?<h1>You are signed in</h1>:<h1>You are not signed in</h1>
}
export default Landing;