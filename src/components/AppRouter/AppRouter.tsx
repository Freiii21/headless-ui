import { FC, memo, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { componentList } from "./componentList";

export const AppRouter: FC = memo(() => {
	return (
		<Suspense fallback={<></>}>
			<Routes>
				{componentList.map((item) => (
					<Route key={item.path} path={item.path} element={<item.component />} />
				))}
			</Routes>
		</Suspense>
	);
});
