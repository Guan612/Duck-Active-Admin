import { BrowserRouter } from "react-router";
import Router from "./router";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<BrowserRouter>
			<Toaster position="top-center" />
			<Router />
		</BrowserRouter>
	);
}

export default App;
