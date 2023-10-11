import Header from "../commons/main/Header";
import SideBar from "../commons/main/SideBar";
import style from '../../assets/scss/base/_app.module.scss'
import style2 from '../../assets/scss/layout/_sidebar.module.scss'
import {useState} from "react";
import {Container} from "react-bootstrap";

function MainLayout({children}) {
    const [sidebar, setSidebar] = useState(true);
    const handleSetSidebar = () => setSidebar(value => !value)
    return (
        <>
            <Header handleSetSidebar={handleSetSidebar}/>
            <div className={style.app__container}>
                <Container fluid >
                    <SideBar sidebar={sidebar}/>
                    <div className={style2.app__main}>
                        {children}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default MainLayout