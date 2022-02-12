import CategoryInterface from "./Component/CategoryInterface";
import SubCategoryInterface from "./Component/SubCategoryInterface";
import DisplayAllCategories from "./Component/DisplayAllCategories";
import AdminLogin from "./Component/AdminLogin";
import DisplayAllSubCategories from "./Component/DisplayAllSubCategories";
import {BrowserRouter as Router,Route} from "react-router-dom";
import AdminDashboard from "./Component/AdminDashboard";
import AccessoryInterface from "./Component/AccessoryInterface";
import DisplayAllAccessories from "./Component/DisplayAllAccessories";
import AddGames from "./Component/AddGames";
import DisplayGames from "./Component/DisplayGames";
import Header from "./Component/ClientView/Header";
import Home from "./Component/ClientView/Home";
import Footer from "./Component/ClientView/Footer";
import QtySpinner from "./Component/ClientView/QtySpinner";
import SubcategoryData from "./Component/ClientView/SubcategoryData";
import ProductView from "./Component/ClientView/ProductView";
import TermsConditions from "./Component/TermsConditions";
import GamesPicture from "./Component/GamesPicture";
import DisplayGamesPicture from "./Component/DisplayGamesPicture";
import Documents from "./Component/Documents";
import SignUp from "./Component/ClientView/SignUp";
import SignIn from "./Component/ClientView/SignIn";
import StockChange from "./Component/ClientView/StockChange";
import ConsolePictures from "./Component/ConsolePictures";
import ProductPaymentPage from "./Component/ClientView/ProductPayementPage";

function App(props) {
  return (
    <div className="App">
        <Router>
          <Route
          strict
          exact
          component={CategoryInterface}
          path="/categoryinterface"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={SubCategoryInterface}
          path="/subcategoryinterface"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={DisplayAllCategories}
          path="/displaycategories"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={DisplayAllSubCategories}
          path="/displaysubcategories"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={AccessoryInterface}
          path="/accessoryinterface"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={DisplayAllAccessories}
          path="/displayaccessories"
          history={props.history}>
          </Route>
        <Route
          strict
          exact
          component={AdminLogin}
          path="/adminlogin"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={AdminDashboard}
          path="/admindashboard"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={AddGames}
          path="/addgames"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={DisplayGames}
          path="/displaygames"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={Header}
          path="/header"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={Home}
          path="/"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={Footer}
          path="/footer"
          history={props.history}>
          </Route>
        <Route
          strict
          exact
          component={SubcategoryData}
          path="/subcategorydata"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={QtySpinner}
          path="/qtyspinner"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={ProductView}
          path="/productview"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={TermsConditions}
          path="/termsconditions"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={GamesPicture}
          path="/gamespicture"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={DisplayGamesPicture}
          path="/displaygamespicture"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={Documents}
          path="/documents"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={SignUp}
          path="/signup"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={StockChange}
          path="/stockchange"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={ConsolePictures}
          path="/consolepictures"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={SignIn}
          path="/signin"
          history={props.history}>
          </Route>
          <Route
          strict
          exact
          component={ProductPaymentPage}
          path="/showcart"
          history={props.history}>
          </Route>
        </Router>
      </div>
  );
}

export default App;
