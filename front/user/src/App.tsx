import { BrowserRouter } from "react-router-dom";
import Router from "./router";

function App() {
	return (
		<BrowserRouter basename="/user">
			<Router />
		</BrowserRouter>
	);
}

export default App;
