import React from 'react';
import './App.module.css';
import Music from "./Components/Music/Music";
import {Route, Switch, withRouter} from "react-router-dom"
import Dialogs from "./Components/Dialogs/DialogsContainer";
import NavBarContainer from "./Components/NavBar/NavBarContainer";
import Users from "./Components/Users/UsersContainer";
import Profile from "./Components/Profile/ProfileContainer";
import HeaderComponent from "./Components/Header/HeaderComponent";
import LoginPage from "./Components/Login/LoginPage";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/appReducer";
import LoadingCircle from "./Components/Common/LoadingCircle/LoadingCircle";
import {getIsInitialized} from "./Redux/Selectors/appSelector";
import styles from './App.module.css'
import InProgress from "./Components/Common/InProgress/InProgress";
import WelcomePage from "./Components/Common/WelcomePage/WelcomePage";
import Credits from "./Components/Common/WelcomePage/Credits";
import UsedTechnologies from "./Components/Common/WelcomePage/UsedTechnologies";
//все расположения элементов на странице выполнены с помощью css grid.

class App extends React.Component {
//когда компонента смонтировалась выставляем тригер инициализации на true, до этого бегунок загрузки
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        //бегунок закгрузки если не готовы
        if (!this.props.isInitialized) {
            return <LoadingCircle/>
        }
        return (
            <div className={styles.appWrapper}>
                <div className={styles.header}>
                    <HeaderComponent/>
                </div>
                <div className={styles.navBar}>
                    <NavBarContainer/>
                </div>
                <div className={styles.content}>
                    {/*роутер загружает конкретный компонент в зависимости от значения URL, отличающегося от базового
                    предусмотрена страница 404 и приветственная страница*/}
                    <Switch>
                        <Route exact path='/profile/:userId?' render={() => <Profile/>}/>
                        <Route path='/following' component={() => <Users/>}/>
                        <Route path='/dialogs' render={() => <Dialogs/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/Users' component={() => <Users/>}/>
                        <Route path='/Login' render={() => <LoginPage/>}/>
                        <Route path='/Credits' render={() => <Credits/>}/>
                        <Route path='/UsedTechnologies' render={() => <UsedTechnologies/>}/>
                        <Route path='/InProgress' render={() => <InProgress/>}/>
                        <Route path={'/'} render={() => <WelcomePage/>}/>
                        <Route path='*' render={() => <div>404 Not found</div>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isInitialized: getIsInitialized(state)
})
//чем оборачиваем компонент: часть state, thunk creators, action creators, withRouter для доступа к history
export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);
