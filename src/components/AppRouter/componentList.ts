import { FC } from "react";

import { RouteListEnum } from "enums";
import { HomePage, TablesPage } from "pages";

type ComponentType = {
	path: RouteListEnum;
	component: FC;
};

export const componentList: ComponentType[] = [
	{
		path: RouteListEnum.Home,
		component: HomePage,
	},
	{
		path: RouteListEnum.Tables,
		component: TablesPage,
	},
];
