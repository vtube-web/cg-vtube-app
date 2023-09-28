import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "../data/RoutesData";
import SignInScreen from "../screens/signInScreen/SignInScreen";



export function AppRoutes() {
    return (
        <Routes>
            {
                publicRoutes.map((publicRoute, index) => {
                    const Screen = publicRoute.component;
                    const Layout = publicRoute.layout;

                    return <Route
                        key={index}
                        path={publicRoute.path}
                        element={
                            Layout === null
                                ? <Screen/>
                                : <Layout path={publicRoute.path}> <Screen/> </Layout>
                        }/>
                })
            }
        </Routes>
    )
}