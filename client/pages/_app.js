import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
const AppComponent = ({Component,pageProps,}) =>{
    return <div>
        <Header currentUser={{email:"email"}}/>
        <Component {...pageProps}/>
    </div>
} 


// AppComponent.getInitialProps = async(appContext) =>{
//    const client = buildClient(appContext.ctx);
//    const {data} = await client.get('/api/users/currentUser');
//    let pageProps={};
//    if(appContext.Component.getInitialProps){
//     pageProps = await appContext.Component.getInitialProps(appContext.ctx);
//    }
//    return {
//     pageProps,
//     currentUser:data.currentUser
//    }
// }

export default AppComponent;